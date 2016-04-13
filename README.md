# Barney

## How to install Barney on your project

- Go to your project folder

- Install Barney with Bower
```
bower install --save barney
```
- Add barney files you want use to index.html file, according to Barney documentation. For example, for history module add:
```
<script src="bower_components/Barney/history/history.mod.js"></script>
<script src="bower_components/Barney/history/history.ser.js"></script>
```
- Add barney modules you want use to app.js file, according to Barney documentation. For example, for history module add:
```
angular.module('clipjoy', [ ..., 'barney.history'])
```
