'use strict';

module.exports = function (grunt) {

	/*************************************
	****         REQUIREMENTS         ****
	*************************************/

    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

	/*************************************
	****         SINGLE TASKS         ****
	*************************************/

	grunt.initConfig({
        mockPath: 'mock/',
        modulesPath: 'modules/',
        testPath: 'test/',
        docPath: 'docs/',
        connect:{
            server: {
                options:{
                    hostname: 'localhost',
                    port: 9000,
                    livereload: true
                }
			},
            coverage: {
                options:{
                    hostname: 'localhost',
                    port: 9010,
                    livereload: true
                }
            },
            doc: {
                options:{
                    hostname: 'localhost',
                    port: 9020,
                    livereload: true
                }
            }
        },
        open:{
            server:{
                path: 'http://localhost:9000/<%= mockPath %>'
            },
            coverage:{
                path: 'http://localhost:9010/<%= testPath %>coverage/'
            },
            doc:{
                path: 'http://localhost:9020/<%= docPath %>'
            }
        },
        watch:{
            server:{
                files:[
                    '<%= mockPath %>**/*.js',
                    '<%= mockPath %>**/*.html',
                    '<%= modulesPath %>**/*.js',
                    '<%= modulesPath %>**/*.html'
                ],
                options:{
                    livereload: true
                }
            },
            coverage:{
                files:[
                    '<%= testPath %>coverage/**/*.*'
                ],
                options:{
                    livereload: true
                }
            },
            doc:{
                files:[
                    '<%= modulesPath %>/**/*.js'
                ],
                tasks: ['ngdocs'],
                options:{
                    livereload: true
                }
            }
        },
        eslint: {
            target: [
                // 'modules/**/*.js'
                'modules/analytics/*.js',
                'modules/config/*.js'
            ]
        },
        karma: {
            unit: {
                configFile: '<%= testPath %>/karma.conf.js',
                singleRun: true
            }
        },
        ngdocs: {
            all: ['modules/**/*.js']
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

    grunt.registerTask('lint',[
        'eslint'
    ]);

    grunt.registerTask('test',[
        'karma'
    ]);

    grunt.registerTask('coverage',[
        'connect:coverage',
        'open:coverage',
        'watch:coverage'
    ]);

    grunt.registerTask('doc',[
        'ngdocs',
        'connect:doc',
        'open:doc',
        'watch:doc'
    ]);
}
