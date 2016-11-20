'use strict';

var exec = require('child-process-promise').exec;
var moment = require('moment');

exports.getBranch = function() {
    return exec('git symbolic-ref HEAD | sed -e "s/refs\\/heads\\//"/').then(function(result) {
        return result.stdout.trim();
    });
}

exports.getCommitId = function() {
    return exec('git rev-parse HEAD').then(function(result) {
        return result.stdout.trim();
    });
}

exports.getCommitUserName = function() {
    return exec('git log -1 --pretty=format:%an').then(function(result) {
        return result.stdout.trim();
    });
}

exports.getCommitUserEmail = function() {
    return exec('git log -1 --pretty=format:%ae').then(function(result) {
        return result.stdout.trim();
    });
}

exports.getCommitMessageFull = function() {
    return exec('git log -1 --pretty=format:%B').then(function(result) {
        return result.stdout.trim();
    });
}

exports.getCommitMessageShort = function() {
    return exec('git log -1 --pretty=format:%s').then(function(result) {
        return result.stdout.trim();
    });
}

exports.getCommitTime = function() {
    return exec('git log -1 --pretty=format:%ct').then(function(result) {
        return moment(result.stdout.trim()*1000).toISOString();
    });
}
