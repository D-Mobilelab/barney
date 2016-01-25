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
                    livereload: 35729
                }
            },
            coverage:{
                files:[
                    '<%= mockPath %>**/*',
                    '<%= modulesPath %>**/*',
                    '<%= testPath %>modules/**/*'
                ],
                tasks: ['clean:coverage', 'karma'],
                options:{
                    livereload: 35730
                }
            },
            doc:{
                files:[
                    '<%= modulesPath %>/**/*.js',
                    'docindex.js'
                ],
                tasks: ['clean:doc', 'ngdocs'],
                options:{
                    livereload: 35731
                }
            }
        },
        eslint: {
            target: [
                'modules/**/*.js',
                '!modules/newtontrack_deprecated/*.js',
                '!modules/masonry/*.js'
            ]
        },
        karma: {
            unit: {
                configFile: '<%= testPath %>/karma.conf.js',
                singleRun: true
            }
        },
        ngdocs: {
            options: {
                dest: '<%= docPath %>',
                html5Mode: false,
                title: 'Barney',
                startPage: '/api/welcome'
            },
            api: {
                src: ['docindex.js', '<%= modulesPath %>/**/*.js'],
                title: 'API Reference'
            }
        },
        clean: {
            doc: ["<%= docPath %>"],
            coverage: ["<%= testPath %>coverage"]
        },
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
        'clean:coverage',
        'karma',
        'connect:coverage',
        'open:coverage',
        'watch:coverage'
    ]);

    grunt.registerTask('doc',[
        'clean:doc',
        'ngdocs',
        'connect:doc',
        'open:doc',
        'watch:doc'
    ]);

    grunt.registerTask('version',[
        // coverage
        'clean:coverage',
        'karma',
        // doc
        'clean:doc',
        'ngdocs',
        // lint
        'eslint'
    ]);
}
