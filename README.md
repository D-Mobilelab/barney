# Barney

[![Build Status](https://travis-ci.org/D-Mobilelab/barney.svg?branch=master)](https://travis-ci.org/D-Mobilelab/barney)
[![Coverage Status](https://coveralls.io/repos/github/D-Mobilelab/barney/badge.svg?branch=master)](https://coveralls.io/github/D-Mobilelab/barney?branch=master)
[![npm version](https://badge.fury.io/js/barneyjs.svg)](https://badge.fury.io/js/barneyjs)
[![Bower version](https://badge.fury.io/bo/barney.svg)](https://badge.fury.io/bo/barney)
[![GitHub version](https://badge.fury.io/gh/D-Mobilelab%2Fbarney.svg)](https://badge.fury.io/gh/D-Mobilelab%2Fbarney)

Barney is a collection of Angular micro-libraries, useful for various purposes.

Every micro-library is indipendent, tested and documented.

This is the list of Barney libreries with related description: 

<table>
  <tr>
    <th>Library</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Browser</td>
    <td>It allows to manage paths, states and query string of your browser.</td>
  </tr>
  <tr>
    <td>Config</td>
    <td>It allows to manage configuration parameters of your application.</td>
  </tr>
  <tr>
    <td>Dictionary</td>
    <td>It allows to manage dictionary keys of your application.</td>
  </tr>
  <tr>
    <td>Infinite</td>
    <td>It allows to use the <i>infinite-scoll</i> feature: it runs a method (i.e. call an API) when the user scrolls the page and reaches the end of a component (i.e. a list of items).</td>
  </tr>
  <tr>
    <td>Live HTML</td>
    <td>It allows to load trusted HTML code in your application, without pre-checks and sanitization.</td>
  </tr>
  <tr>
    <td>Meta</td>
    <td>It allows to set different metatags for each page, in an Angular application.</td>
  </tr>
</table>

## How to install Barney
### Bower

- Install Barney with Bower
```
bower install --save barney
```
- Add barney files you want use to index.html file, according to Barney documentation.<br/>For example, for infinite module add:
```
<script src="bower_components/barney/dist/infinite.min.js"></script>
```
- Add barney main module to your app.js file
```
angular.module('myproject', [ ..., 'barney'])
```

### NPM

- Install Barney with NPM
```
npm install --save barneyjs
```
- Add barney files you want use to index.html file, according to Barney documentation.<br/>For example, for infinite module add:
```
<script src="node_modules/barneyjs/dist/infinite.min.js"></script>
```
- Add barney main module to your app.js file
```
angular.module('myproject', [ ..., 'barney'])
```

## Full documentation
To read documentation, open 

http://d-mobilelab.github.io/barney/temp  **replacing temp with version number**. 

For example, for version 4.0.0, open

http://d-mobilelab.github.io/barney/4.0.0 

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

### Grunt command list
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
    <td>grunt test</td>
    <td>Run unit test. Single run task.</td>
  </tr>
  <tr>
    <td>grunt coverage</td>
    <td>Run unit test, calculate coverage, run a local server to display the coverage report and wait. When a file is changed (in "example", "src" or "test" folder), the test re-run and the server is reloaded. <br/><i>P.S. to read coverage, open "lcov-report" folder in browser.</i></td>
  </tr>
  <tr>
    <td>grunt doc</td>
    <td>Create temporary documentation, run a local server to display it and wait. When a file is changed (in "modules" folder), the documentation is re-created and the server is reloaded.</td>
  </tr>
  <tr>
    <td>grunt serve</td>
    <td>Run a local server on "example" folder. When a file is changed (in "example" or "src" folder), the server is reloaded.</td>
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

### Create a new version
Barney uses [Git flow](http://nvie.com/posts/a-successful-git-branching-model/) to create a new feature or make an hotfix and [Semantic Versioning](http://semver.org/) to create a new version.

- When you push on <i>master</i> branch, Travis checks if all test are successful, es-lint is successful, the documentation is created without problems and the coverage is sent to coveralls successful. If everything goes well, then Travis approves the merge and a new version can be created
- On <i>master</i> branch use this command
```
grunt version
```
- You can choose between a major version, a minor version or a patch
```
? Current: 1.1.0 - Choose a new version for Barney: (Use arrow keys)
❯ No new version 
  Major Version (2.0.0) 
  Minor Version (1.2.0) 
  Patch (1.1.1)
```
- Describe the features of this new version, seperating them with semicolons
```
? Features for version 1.2.0 (use ";" to separate features): ()
```
- Commit, Push, Tag, Docs and NPM version will be automatically updated during the grunt version process!

- The new Barney version is ready!
