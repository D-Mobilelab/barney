'use strict';

module.exports = function (grunt) {

	/*************************************
	****         REQUIREMENTS         ****
	*************************************/

    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

	/*************************************
	****         CONFIGURATION        ****
	*************************************/

	/*************************************
	****         SINGLE TASKS         ****
	*************************************/

	grunt.initConfig({
        mockPath: 'mock/',
        connect:{
            server: {
                options:{
                    hostname: 'localhost',
                    port: 9000,
                    livereload: true
                }
			}
        },
        open:{
            server:{
                path: 'http://localhost:9000/<%= mockPath %>'
            }
        },
        watch:{
            server:{
                files:[
                    '<%= mockPath %>pages/*.js',
                    '<%= mockPath %>*.js',
                    '<%= mockPath %>*.html'
                ],
                options:{
                    livereload: true
                }
            }
        }
    });

	/*************************************
	****         GRUNT TASKS          ****
	*************************************/

    grunt.registerTask('serve',[
        'connect:server',
        'open:server',
        'watch:server'
    ]);
}
