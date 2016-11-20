# Node Git Info

[![Build Status](https://travis-ci.org/rcruzper/node-git-info.svg?branch=master)](https://travis-ci.org/rcruzper/node-git-info)
[![Dependencies Status](https://david-dm.org/rcruzper/node-git-info.svg)](https://david-dm.org/rcruzper/node-git-info)

Creates a git.properties file with information about the current commit.

## Usage

```sh
$ npm install -g node-git-info
$ node-git-info
```
it will returns:
```ini
git.commit.id.abbrev: 42954d1
git.commit.user.email: user@email.com
git.commit.message.full: first commit
git.commit.id: 42954d1fe6285fea65ba81ea39d71d5b75f9ade0
git.commit.message.short: first commit
git.commit.user.name: User Name
git.branch: master
git.commit.time: 2016-11-20T11:48:42.000Z
```
