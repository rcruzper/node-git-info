'use strict'
var fs = require('fs');
var spawn = require('child_process').spawn;

/* test utility methods */

exports.deleteFilesRecursivelyByName = function(appRootDir, fileName) {
    var shellSyntaxCommand = 'find ' + appRootDir + ' -name ' + fileName + ' -type f|xargs rm -f';
    spawn('sh', ['-c', shellSyntaxCommand], {stdio: 'inherit'});
}

exports.deleteDirectoryRecursively = function(directory) {
    if (fs.existsSync(directory)) {
        fs.readdirSync(directory).forEach(function (file) {
            var curPath = directory + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                this.deleteDirectoryRecursively(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(directory);
    }
}
/* end test utility methods */