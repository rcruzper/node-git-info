# Node Git Info

[![npm version](https://img.shields.io/npm/v/node-git-info.svg?style=flat)](https://badge.fury.io/js/node-git-info)
[![Build Status](https://travis-ci.org/rcruzper/node-git-info.svg?branch=master)](https://travis-ci.org/rcruzper/node-git-info)
[![Coverage Status](https://coveralls.io/repos/github/rcruzper/node-git-info/badge.svg?branch=master)](https://coveralls.io/github/rcruzper/node-git-info?branch=master)
[![Dependencies Status](https://david-dm.org/rcruzper/node-git-info.svg)](https://david-dm.org/rcruzper/node-git-info)

Node module that creates a git.properties file with information about the current commit. It is based on [maven git commit id plugin](https://github.com/ktoso/maven-git-commit-id-plugin) for Java.

## Usage

```sh
$ npm install -g node-git-info
$ node-git-info [options]

-d, --directory     Directory to save git.properties file to (directory must already exist).
```
It will save a file named ```git.properties```. If the directory option isn't passed, then default location for saving the git.properties file will be the current working directory of the Node.js process.

Example output:
```ini
git.commit.id.abbrev=42954d1
git.commit.user.email=user@email.com
git.commit.message.full=first commit
git.commit.id=42954d1fe6285fea65ba81ea39d71d5b75f9ade0
git.commit.message.short=first commit
git.commit.user.name=User Name
git.branch=master
git.commit.time=2016-11-20T11:48:42.000Z
```