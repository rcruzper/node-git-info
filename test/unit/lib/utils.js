'use strict'
var spawn = require('child_process').spawn;

/* test utility methods */

exports.deleteFilesRecursivelyByName = function(appRootDir, fileName) {
    var shellSyntaxCommand = 'find ' + appRootDir + ' -name ' + fileName + ' -type f|xargs rm -f';
    spawn('sh', ['-c', shellSyntaxCommand], {stdio: 'inherit'});
}

/* end test utility methods */