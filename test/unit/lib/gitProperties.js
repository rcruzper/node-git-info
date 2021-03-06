'use strict'
var fs = require('fs');
var properties = require('../../../lib/gitProperties');
var expect = require('chai').expect;
var read = require('utils-fs-read-properties');
var appRootDir = require('app-root-dir').get();
var tmp = require('tmp');
var utils = require('./utils');
var mock = require('mock-fs');

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
    var gitPropertiesExpectedDefaultFileName = appRootDir + '/' + gitPropertiesFileName;

    before(function (done) {

        // runs before any tests are executed in this block

        tmp.setGracefulCleanup(); // cleanup the temporary files even when an uncaught exception occurs.

        tmp.dir({dir: appRootDir, unsafeCleanup : true}, function _tempDirCreated(err, path) {
            if (err) throw err;
            tmpTestOutputFolder = path;

            // now mock fs library
            const mockedGitProperties = "git.branch=master\ngit.commit.id.abbrev=1324324\ngit.commit.time=2016-11-18T13:16:39.000Z";
            const mockedGitPropertiesPath = tmpTestOutputFolder +  '/' + gitPropertiesFileName;
            var mockFileSystem = {};
            mockFileSystem[gitPropertiesExpectedDefaultFileName] = mockedGitProperties;
            mockFileSystem[mockedGitPropertiesPath] = mockedGitProperties;
            mock(mockFileSystem);
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
    });

    afterEach(function () {
        //  restore the fs module (so that it is backed by the real file system)
        mock.restore();
    });

    it('should create a git.properties file', function (done) {

        var callback = function () {

            checkGitPropertiesFileHasExpectedData(gitPropertiesExpectedDefaultFileName, done);
        }

        properties.write(undefined, callback);
    });

    it('should create a git.properties file in the destination directory given ', function (done) {

        properties.write(tmpTestOutputFolder);

        var callback = function () {
            var gitPropertiesDestination = tmpTestOutputFolder + '/' + gitPropertiesFileName;
            checkGitPropertiesFileHasExpectedData(gitPropertiesDestination, done);
        };

        properties.write(tmpTestOutputFolder, callback);
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