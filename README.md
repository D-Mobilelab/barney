# Barney

[![Build Status](https://travis-ci.org/D-Mobilelab/barney.svg?branch=develop)](https://travis-ci.org/D-Mobilelab/barney)
[![Coverage Status](https://coveralls.io/repos/github/D-Mobilelab/barney/badge.svg?branch=develop)](https://coveralls.io/github/D-Mobilelab/barney?branch=develop)

## How to install Barney

- Install Barney with Bower
```
bower install --save barney
```
- Add barney main file to your index.html file
```
<script src="bower_components/barney/dist/main.min.js"></script>
```
- Add barney files you want use to index.html file, according to Barney documentation. For example, for history module add:
```
<script src="bower_components/barney/dist/history.min.js"></script>
```
- Add barney main module to your app.js file
```
angular.module('myproject', [ ..., 'barney'])
```
- Add barney modules you want use to app.js file, according to Barney documentation. For example, for history module add:
```
angular.module('myproject', [ ..., 'barney.history'])
```

## How to update Barney

- Update barney version in your bower.json file
```
"barney": "2.3.0",
```
- Execute bower install
```
bower install
```
- Add new barney files to index.html file, if a new module has been implemented with new version. For example:
```
<script src="bower_components/barney/dist/history.min.js"></script>
```
- Add new barney modules to app.js file, if necessary
```
angular.module('clipjoy', [ ..., 'barney.history'])
```

## Full documentation
To read documentation, open 

http://d-mobilelab.github.io/barney/temp  **replacing temp with version number**. 

For example, for version 2.3.0, open

http://d-mobilelab.github.io/barney/2.3.0 


## Contribute

- [Clone Barney project](https://github.com/D-Mobilelab/barney/wiki/How-to-clone-Barney-project/)
- [Create new feature](https://github.com/D-Mobilelab/barney/wiki/How-to-create-a-new-feature)
- [Try new feature](https://github.com/D-Mobilelab/barney/wiki/How-to-try-modules,-with-mock)
- [Run test](https://github.com/D-Mobilelab/barney/wiki/How-to-run-test)
- [Generate and read documentation](https://github.com/D-Mobilelab/barney/wiki/How-to-generate-and-read-documentation)
- [Create and publish new version](https://github.com/D-Mobilelab/barney/wiki/How-to-create-a-new-version)
