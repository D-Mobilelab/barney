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

- Install Bower in your local machine, if not already installed [http://bower.io/](http://bower.io/)

- Install dependencies (npm modules and bower components)
```
npm install
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
- Add new files and commit modified files on Git
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
- Resolve possible conflicts, commit and push changes
```
git commit -a -m "Merge from feature/newfeature"
git push origin develop
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
- Resolve possible conflicts

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
- Commit and push *CHANGELOG* and *bower.json*
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
- Go to your project folder

- Install Barney with Bower
```
bower install --save git+http://review.buongiorno.com/frontdev/barney
```
- Add barney files you want use to index.html file, according to Barney documentation
```
<script src="bower_components/Barney/history/history.mod.js"></script>
<script src="bower_components/Barney/history/history.ser.js"></script>
```
- Add barney modules you want use to app.js file, according to Barney documentation
```
angular.module('clipjoy', [ ..., 'barney.history'])
```

# How to update Barney in your project
- Go to your project folder

- Update barney version in your bower.json file
```
"barney": "git+http://review.buongiorno.com/frontdev/barney#0.16.0",
```
- Execute bower install
```
bower install
```
- Add new barney files to index.html file, if necessary
```
<script src="bower_components/Barney/history/history.ser.js"></script>
```
- Add new barney modules to app.js file, if necessary
```
angular.module('clipjoy', [ ..., 'barney.logger'])
```
