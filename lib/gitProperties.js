'use strict';

var fs = require('fs');
var Promise = require('bluebird');
var gitCommand = require('./gitCommands');

var gitProperties = function() {
    var gitPromises = {
        branch: gitCommand.getBranch(),
        commitId: gitCommand.getCommitId(),
        commitUserName: gitCommand.getCommitUserName(),
        commitUserEmail: gitCommand.getCommitUserEmail(),
        commitMessageFull: gitCommand.getCommitMessageFull(),
        commitMessageShort: gitCommand.getCommitMessageShort(),
        commitTime: gitCommand.getCommitTime()
    };

    Promise.props(gitPromises).then(function(git) {
        var gitProperties = {
            'git.commit.id.abbrev': git.commitId.substring(0,7),
            'git.commit.user.email': git.commitUserEmail,
            'git.commit.message.full': git.commitMessageFull,
            'git.commit.id': git.commitId,
            'git.commit.message.short': git.commitMessageShort,
            'git.commit.user.name': git.commitUserName,
            'git.branch': git.branch,
            'git.commit.time': git.commitTime
        };

        var returnInfo = Object.keys(gitProperties).map(function(key){
          return key + '=' + gitProperties[key] + '\n';
        })

        // Generate git.properties file
        fs.writeFile('git.properties', returnInfo.join(''), function(err) {
            if(err) {
                console.log('[node-git-properties][ERROR]: can\'t create git.properties file.');
            }
            else{
                console.log('[node-git-properties] git.properties has successfully created.');
            }
        });
    });
}

gitProperties();

module.exports = gitProperties;