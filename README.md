# How to clone Barney project

## Create a SSH Key
1. Go to [http://review.buongiorno.com/](http://review.buongiorno.com/)
2. Click *Sign in* (top-right link)
3. Click on your name 
4. Click *Settings*
5. Click *SSH Public Keys*
6. Follow instructions to generate a new SSH key

## Clone Barney
- Clone Barney project, **replacing name.surname**:
```
git clone ssh://name.surname@review.buongiorno.com:29418/frontdev/barney barney
```
- Install Node in your local machine, if not already installed [https://nodejs.org](https://nodejs.org)

- Install npm modules
```
npm install
```
- Install Bower in your local machine, if not already installed [http://bower.io/](http://bower.io/)


- Install bower components
```
bower install
```
- You can develop on Barney Project now! ;)

# How to create a new feature
- Checkout and pull develop branch
```
git checkout develop
git pull origin develop
```
- Create a new feature branch, **replacing newfeature**:
```
git checkout -b feature/newfeature
```
- Code!
- Add new files and commit modified files on git
```
git add newfile.js
git commit -a -m "New feature"
```
- Push commits on feature branch
```
git push origin feature/newfeature
```
- When feature is ready, merge to develop branch
```
git checkout develop
git merge feature/newfeature
```
- Delete local and remote feature branch
```
git branch -d feature/newfeature
git push origin :feature/newfeature
```

# How to create a new version
- Checkout master branch
```
git checkout master
git pull origin master
```
- Merge develop branch to master branch
```
git merge develop
```
- Commit and push changes
```
git commit -a -m "Merge from develop"
git push origin master
```
- Create a new version with this command:
```
grunt version
```
- If js-lint and test are successful, choose if you want a major version, a minor version or a patch (read before [http://semver.org/](http://semver.org/))
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
- Commit and push CHANGELOG and bower.json
```
git commit -a -m "New feature"
git push origin master
```
- Create a new git tag with new version name
```
git tag 2.0.0
```
- Push your tag
```
git push --tags origin
```

# How to install Barney to your project
1. Go to your project folder, where there's bower.json file (i.e. /dadanet2/wl2/webstore_clipjoy/js/webstore_clipjoy)
2. Add to bower.json the URL of Barney with last version
```
"barney": "git+http://review.buongiorno.com/frontdev/barney#0.15.1",
```
3. Execute bower install
```
bower install
```
4. Execute grunt wiredep to add barney files to index.html or add them manually
```
grunt wiredep
```
5. Add barney modules you want use to app.js file
```
angular.module('clipjoy', [ ..., 'barney.logger'])
```

# How to update Barney in your project
1. Go to your project folder, where there's bower.json file (i.e. /dadanet2/wl2/webstore_clipjoy/js/webstore_clipjoy)
2. Update barney version in your bower.json file
```
"barney": "git+http://review.buongiorno.com/frontdev/barney#0.16.0",
```
3. Execute bower install
```
bower install
```
4. Execute grunt wiredep to add new barney files to index.html or add them manually
```
grunt wiredep
```
5. Add new barney modules to app.js file, if necessary
```
angular.module('clipjoy', [ ..., 'barney.logger'])
```
