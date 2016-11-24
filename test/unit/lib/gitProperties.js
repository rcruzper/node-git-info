'use strict'
var fs = require('fs');
var properties = require('../../../lib/gitProperties');
var expect = require('chai').expect;
var read = require('utils-fs-read-properties');
var appRootDir = require('app-root-dir').get();
var tmp = require('tmp');
var utils = require('./utils');

function checkGitPropertiesFileHasExpectedData(filePath, done) {

    expect(fs.existsSync(filePath)).to.be.true;

    read(filePath, function (error, data) {
        expect(data['git.commit.id.abbrev']).to.not.be.undefined;
        expect(data['git.commit.user.email']).to.not.be.undefined;
        expect(data['git.commit.message.full']).to.not.be.undefined;
        expect(data['git.commit.id']).to.not.be.undefined;
        expect(data['git.commit.message.short']).to.not.be.undefined;
        expect(data['git.commit.user.name']).to.not.be.undefined;
        expect(data['git.branch']).to.not.be.undefined;
        expect(data['git.commit.time']).to.not.be.undefined;

        done();
    });
}


describe('executing write method', function () {

    const testSuiteLevelTimeout = 30 * 1000;
    const gitPropertiesFileName = 'git.properties';
    // set higher than default test suite-level timeout in case of large files being writen/read.
    this.timeout(testSuiteLevelTimeout);

    var tmpTestOutputFolder; // tempory folder for writing git.properties file to.

    before(function (done) {
        // runs before any tests are executed in this block
        tmp.dir({dir: appRootDir}, function _tempDirCreated(err, path) {
            if (err) throw err;
            tmpTestOutputFolder = path;
            done()
        });
    })

    beforeEach(function () {
        // runs after each test in this block
        utils.deleteFilesRecursivelyByName(gitPropertiesFileName); // delete test generated files
    });

    after(function () {
        // runs after all tests have executed in this block
        utils.deleteFilesRecursivelyByName(appRootDir, gitPropertiesFileName); // delete test generated files
        utils.deleteDirectoryRecursively(tmpTestOutputFolder);
    });

    it('should create a git.properties file', function (done) {

        var callback = function () {
            var gitPropertiesDestination = appRootDir + gitPropertiesFileName;
            checkGitPropertiesFileHasExpectedData(gitPropertiesDestination, done);
        }

        properties.write(undefined, callback);
    });

    it('should create a git.properties file in the destination directory given ', function (done) {

        var destinationPath = tmpTestOutputFolder;
        properties.write(destinationPath);

        var callback = function () {
            var gitPropertiesDestination = destinationPath + '/' + gitPropertiesFileName;
            checkGitPropertiesFileHasExpectedData(gitPropertiesDestination, done);
        };

        properties.write(destinationPath, callback);
    });

    it('should return an error status if destination directory given does not exist', function (done) {

        var destinationPath = tmpTestOutputFolder + '/i_am_a_directory_that_does_not_exist';

        var callback = function (writeSuccess) {
            expect(writeSuccess).to.be.false;
            var gitPropertiesDestination = destinationPath + '/' + gitPropertiesFileName;
            expect(fs.existsSync(gitPropertiesDestination)).to.be.false;
            done();
        };

        properties.write(destinationPath, callback);
    });
});