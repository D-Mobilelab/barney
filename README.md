# Barney

[![Build Status](https://travis-ci.org/D-Mobilelab/barney.svg?branch=master)](https://travis-ci.org/D-Mobilelab/barney)
[![Coverage Status](https://coveralls.io/repos/github/D-Mobilelab/barney/badge.svg?branch=master)](https://coveralls.io/github/D-Mobilelab/barney?branch=master)

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


## Grunt command list

<table>
  <tr>
    <th>Command</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>grunt lint</td>
    <td>Run es-lint to check that code respects the style guide. Single run task.</td>
  </tr>
  <tr>
    <td>grunt lintx</td>
    <td>Run es-lint to check that code respects the style guide and wait. When a file is changed (in "modules" folder), re-run es-lint.</td>
  </tr>
  <tr>
    <td>grunt test</td>
    <td>Run unit test. Single run task.</td>
  </tr>
  <tr>
    <td>grunt testx</td>
    <td>Run unit test and wait. When a file is changed (in "module" and "test" folders), re-run unit test.</td>
  </tr>
  <tr>
    <td>grunt coverage</td>
    <td>Run unit test and calculate coverage. Single run task.</td>
  </tr>
  <tr>
    <td>grunt coveragex</td>
    <td>Run unit test, calculate coverage, run a local server to display the coverage report and wait. When a file is changed (in "example", "modules" and "test" folders), the test re-run and the server is reloaded. PS to read coverage, open "lcov-report" folder in browser.</td>
  </tr>
  <tr>
    <td>grunt doc</td>
    <td>Create temporary documentation and run a local server to display it. Single run task.</td>
  </tr>
  <tr>
    <td>grunt docx</td>
    <td>Create temporary documentation, run a local server to display it and wait. When a file is changed (in "modules" folder), the documentation is re-created.</td>
  </tr>
  <tr>
    <td>grunt serve</td>
    <td>Run a local server on "example" folder. When a file is changed (in "example" or "modules" folders), the server is reloaded.</td>
  </tr>
  <tr>
    <td>grunt travis</td>
    <td>Create a new build, run unit test, calculate coverage, send coverage to coveralls, run es-lint and create a temporary documentation. (This command can be executed only on Travis; it's useful to check if build is successful).</td>
  </tr>
  <tr>
    <td>grunt version</td>
    <td>Create a new build, run unit test, calculate coverage, run es-lint, create a new version (major, minor or patch), create a new official documentation.</td>
  </tr>
</table>


## Contribute

### Clone and install dependecies

- Clone Barney git
```
git clone https://github.com/D-Mobilelab/barney.git barney
```
- Install [Node.js](https://nodejs.org), [Bower](http://bower.io/) and [Grunt](http://gruntjs.com/), if not already installed
```
npm install -g bower grunt
```
- Install NPM and Bower dependecies
```
npm install
bower install
```

### Create a new feature

Barney uses [Git flow](http://nvie.com/posts/a-successful-git-branching-model/) to create a new feature or make an hotfix.

- [Clone Barney project](https://github.com/D-Mobilelab/barney/wiki/How-to-clone-Barney-project/)
- [Create new feature](https://github.com/D-Mobilelab/barney/wiki/How-to-create-a-new-feature)
- [Try new feature](https://github.com/D-Mobilelab/barney/wiki/How-to-try-modules,-with-mock)
- [Run test](https://github.com/D-Mobilelab/barney/wiki/How-to-run-test)
- [Generate and read documentation](https://github.com/D-Mobilelab/barney/wiki/How-to-generate-and-read-documentation)
- [Create and publish new version](https://github.com/D-Mobilelab/barney/wiki/How-to-create-a-new-version)
