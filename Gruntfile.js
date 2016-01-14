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
            }
        },
        open:{
            server:{
                path: 'http://localhost:9000/<%= mockPath %>'
            },
            coverage:{
                path: 'http://localhost:9010/<%= testPath %>coverage/'
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
            }
        },
        eslint: {
            target: [
                // 'modules/**/*.js'
                'modules/analytics/*.js',
                'modules/config/*.js',
                'modules/callbacky/*.js',
                'modules/dict/*.js',
                'modules/history/*.js',
                'modules/logger/*.js',
                'modules/meta/*.js',
                'modules/newton/*.js',
                'modules/stargate/*.js',
                'modules/storage/*.js',
                'modules/utility/*.js'

            ]
        },
        karma: {
            unit: {
                configFile: '<%= testPath %>/karma.conf.js',
                singleRun: true
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
}
