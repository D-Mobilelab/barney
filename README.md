# Barney
 
[![Build Status](https://travis-ci.org/D-Mobilelab/barney.svg?branch=master)](https://travis-ci.org/D-Mobilelab/barney)
[![Coverage Status](https://coveralls.io/repos/github/D-Mobilelab/barney/badge.svg?branch=master)](https://coveralls.io/github/D-Mobilelab/barney?branch=master)

Barney is a collection of Angular micro-libraries, useful for various purposes.

This is the list of Barney modules with related purpose:

<table>
  <tr>
    <th>Module</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Analytics</td>
    <td>Module for Google Analytics: it allows to track pageview, events and manage custom dimensions easily.</td>
  </tr>
  <tr>
    <td>Callbacky</td>
    <td>It allows two or more Angular components (services, factories, directives and controllers) to communicate between them. For example, an event on a component can run a method on an other component, without $rootScope use.</td>
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
    <td>History</td>
    <td>It can be used to manage previous and current path and state of your application.</td>
  </tr>
  <tr>
    <td>Infinite</td>
    <td>With this module, you can manage infinite scroll easily. It allows you to run a method (for example an API call) when the user scrolls the page and sees the end of a component (for example a list of items).</td>
  </tr>
  <tr>
    <td>Logger</td>
    <td>Advaced module to log console messages, useful for debug.</td>
  </tr>
  <tr>
    <td>Meta</td>
    <td>It allows to set metatags in an Angular application. You can set one or more different metatags keys for each page.</td>
  </tr>
  <tr>
    <td>Newton</td>
    <td>Newton is a D-Mobile lab library, it allows you to interface with this library.</td>
  </tr>
  <tr>
    <td>Storage</td>
    <td>With this module, you can manage cookie, localstorage and volatile keys easily.</td>
  </tr>
  <tr>
    <td>Utility</td>
    <td>A collection of useful little methods.</td>
  </tr>
</table>

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

- Create a new feature branch from "develop" branch
```
git checkout develop
git checkout -b feature/newfeature
```
- Code!
- Commit and push on feature branch
- When the feature is ready, merge feature branch on "develop", resolving possible conflicts
- Delete local and remote feature branch, after merge
```
git branch -d feature/newfeature
git push origin :feature/newfeature
```
- When a new version of Barney can be created, read the section below

### Create a new version
- When the "develop" branch contains new features ready for production, create a new pull request from develop to master branch
- Check the code with other developers and when you are ready, merge!
- Travis starts automatically for every pull request and push on "master" branch. If all test are successful, es-lint is successful, the documentation is created without problems and the coverage is sent to coveralls successful, then Travis approves the merge and a new version can be created
- On "master" branch use this grunt command
```
grunt version
```
- Barney uses [Semantic Versioning](http://semver.org/) to create a new version
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
? Features for version 1.1.0 (use ";" to separate features): ()
```
- Commit and push *CHANGELOG* and *bower.json*
```
git commit -a -m "New feature"
git push origin master
```
- If travis build is successful, create a new git tag with the name of new version and push this
```
git tag 2.0.0
git push --tags origin
```
- Push new documentation
```
git subtree push --prefix docs origin gh-pages
```
- The new Barney version is ready and you can update this with bower (see "How to update Barney" section above)
