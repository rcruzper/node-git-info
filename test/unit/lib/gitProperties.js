'use strict'

var fs = require('fs');
var properties = require('../../../lib/gitProperties');
var expect = require('chai').expect;
var read = require( 'utils-fs-read-properties' );

describe('gitProperties', function() {

    it ('should creates a git.properties file', function() {
        properties();

        expect(fs.existsSync('git.properties')).to.be.true;

        read('git.properties', function(error, data) {
            expect(data['git.commit.id.abbrev']).to.not.be.undefined;
            expect(data['git.commit.user.email']).to.not.be.undefined;
            expect(data['git.commit.message.full']).to.not.be.undefined;
            expect(data['git.commit.id']).to.not.be.undefined;
            expect(data['git.commit.message.short']).to.not.be.undefined;
            expect(data['git.commit.user.name']).to.not.be.undefined;
            expect(data['git.branch']).to.not.be.undefined;
            expect(data['git.commit.time']).to.not.be.undefined;
        });
    });

});
