'use strict';

module.exports = function (grunt) {

    /*************************************
    ****         REQUIREMENTS         ****
    *************************************/

    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

    /*************************************
    ****         SINGLE TASKS         ****
    *************************************/

    var versionString = grunt.file.readJSON('bower.json').version;
    var version = versionString.split(".");
    var major = parseInt(version[0]), minor = parseInt(version[1]), patch = parseInt(version[2]);
    var versionMajor = (major+1) + ".0.0";
    var versionMinor = (major) + "." + (minor+1) + ".0";
    var versionPatch = (major) + "." + (minor) + "." + (patch+1);

    grunt.initConfig({
        // VARIABLES
        examplePath: 'examples/',
        srcPath: 'src/',
        testPath: 'test/',
        coveragePath: 'test/coverage',
        docPath: 'docs/',
        distPath: 'dist/',
        newVersion: versionString,
        changeLog: '',
        libraryName: '',

        // CLEAN
        clean: {
            docTemp: ["<%= docPath %>temp"],
            docVersion: ["<%= docPath %><%= newVersion %>"],
            coverage: ["<%= coveragePath %>"],
            dist: ["<%= distPath %>"]
        },

        // CONNECT
        connect:{
            main: {
                options:{
                    hostname: 'localhost',
                    port: 9000,
                    livereload: true
                }
            }
        },

        // OPEN
        open:{
            coverage:{
                path: 'http://localhost:9000/<%= coveragePath %>'
            },
            docTemp:{
                path: 'http://localhost:9000/<%= docPath %>temp'
            },
            server:{
                path: 'http://localhost:9000/<%= examplePath %>'
            }
        },

        // WATCH
        watch:{
            coverage:{
                files:[
                    '<%= srcPath %>**/*.*',
                    '<%= testPath %>**/*.*',
                    '!<%= testPath %>coverage/**/*.*',
                    'karma.conf.js'
                ],
                tasks: ['clean:coverage', 'clean:dist', 'prepareModules', 'concat', 'comments', 'karma'],
                options:{
                    livereload: 35729
                }
            },
            docTemp:{
                files:[
                    '<%= docPath %>welcome.js',
                    '<%= srcPath %>**/*.*'
                ],
                tasks: ['clean:docTemp', 'ngdocs:api'],
                options:{
                    livereload: 35729
                }
            },
            server:{
                files:[
                    '<%= examplePath %>**/*.*',
                    '<%= srcPath %>**/*.*'
                ],
                tasks: ['clean:dist', 'prepareModules', 'concat', 'comments'],
                options:{
                    livereload: 35729
                }
            }
        },

        // LINT
        eslint: {
            main: [
                '<%= srcPath %>**/*.js'
            ]
        },

        // KARMA
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        // NG-DOCS
        ngdocs: {
            options: {
                html5Mode: false,
                title: 'Documentation',
            },
            api: {
                options: {
                    dest: '<%= docPath %>temp',
                    startPage: '/api/welcome'
                },
                src: ['<%= docPath %>/welcome.js', '<%= srcPath %>/**/*.js'],
                title: 'API Reference',
                api: true
            },
            version: {
                options: {
                    dest: '<%= docPath %><%= newVersion %>',
                    startPage: '/version/welcome'
                },
                src: ['<%= docPath %>/welcome.js', '<%= srcPath %>/**/*.js'],
                title: 'API Reference',
                api: true
            }
        },

        // PROMPT
        prompt: {
            version: {
                options: {
                    questions: [{
                        config: 'newVersion',
                        type: 'list',
                        message: 'Current: ' + versionString + ' - Choose a new version for this library:',
                        default: versionString,
                        choices: [
                            { name: 'No new version (press CTRL+C two times)', value: versionString },
                            { name: 'Major Version (' + versionMajor + ')', value: versionMajor },
                            { name: 'Minor Version (' + versionMinor + ')', value: versionMinor },
                            { name: 'Patch (' + versionPatch + ')', value: versionPatch }                            
                        ]
                    }, {
                        config: 'changeLog',
                        type: 'input',
                        message: 'Features for new version (use ";" to separate features):',
                        default: '',
                        when: function(answers) {
                            return answers['newVersion'] !== versionString;
                        },
                        filter: function(value){
                            // add new version string to changelog
                            value = "** <%= newVersion %> **; " + value; 
                            // remove last char if it's a semicolon
                            if(value.substr(value.length-1) === ';'){ value = value.substr(0, value.length-1)}
                            // replace all semicolons to "\n-"
                            value = value.replace(/;/g, "\n-");
                            // add double newlines and return changelog
                            return value + "\n\n";
                        }
                    }]
                }
            }
        },

        // STRING-REPLACE
        'string-replace': {
            bowerpackage: {
                files: {
                    'bower.json': 'bower.json',
                    'package.json': 'package.json'
                },
                options: {
                    replacements: [{
                        pattern: '"version": "' + versionString + '",',
                        replacement: '"version": "<%= newVersion %>",'
                    }]
                }
            }
        },

        // FILE-APPEND
        'file_append': {
            changelog: {
                files: [
                    {
                        prepend: "<%= changeLog %>",
                        input: 'CHANGELOG',
                        output: 'CHANGELOG'
                    }
                ]
            }
        },

        // COVERALLS
        coveralls: {
            options: {
                force: false
            },
            docs: {
              src: '<%= coveragePath %>/**/lcov.info'
            },
        },

        // STRIP COMMENTS
        comments: {
            your_target: {
                options: {
                    singleline: false,
                    multiline: true
                },
                src: '<%= distPath %>*.js'
            },
        },
    });

    grunt.registerTask("prepareModules", "Finds and prepares modules for concatenation.", function() {
        // get the current concat object from initConfig
        var concat = grunt.config.get('concat') || {};

        // get all module directories
        grunt.file.expand("src/*").forEach(function (dir) {

            // get the module name from the directory name
            var dirName = dir.substr(dir.lastIndexOf('/')+1);

            concat[dirName] = {
                src: [
                    dir + '/*.js'
                ],
                dest: '<%= distPath %>' + dirName + '.min.js',
                options: {
                    banner: "if(!barneyAngular) { var barneyAngular = angular.module('barney', []); }\n"
                }
            };

            // add module subtasks to the concat task in initConfig
            grunt.config.set('concat', concat);
        });
    });

    /*************************************
    ****         GRUNT TASKS          ****
    *************************************/

    grunt.registerTask('lint',[
        // LINT
        'eslint'
    ]);

    /**********************************/

    grunt.registerTask('test',[
        // CLEAN COVERAGE
        'clean:coverage',
        // CREATE BUILD
        'clean:dist',
        'prepareModules',
        'concat',
        'comments',
        // TEST
        'karma'
    ]);

    /**********************************/

    grunt.registerTask('coverage',[
        // CLEAN COVERAGE
        'clean:coverage',
        // CREATE BUILD
        'clean:dist',
        'prepareModules',
        'concat',
        'comments',
        // TEST
        'karma',
        // CONNECT
        'connect:main',
        'open:coverage',
        // WATCH
        'watch:coverage'
    ]);

    /**********************************/

    grunt.registerTask('doc',[
        // DOC (TEMP)
        'clean:docTemp',
        'ngdocs:api',
        // CONNECT
        'connect:main',
        'open:docTemp',
        // WATCH
        'watch:docTemp'
    ]);

    /**********************************/

    grunt.registerTask('build',[
        // CREATE BUILD
        'clean:dist',
        'prepareModules',
        'concat',
        'comments'
    ]);

    /**********************************/

    grunt.registerTask('serve',[
        // CLEAN DIST
        'clean:dist',
        // CREATE BUILD
        'prepareModules',
        'concat',
        'comments',
        // CONNECT
        'connect:main',
        'open:server',
        'watch:server'
    ]);

    /**********************************/    

    grunt.registerTask('travis',[
        // CLEAN COVERAGE
        'clean:coverage',
        // CREATE BUILD
        'clean:dist',
        'prepareModules',
        'concat',
        'comments',
        // TEST
        'karma',
        // COVERALLS
        'coveralls',
        // LINT
        'eslint',
        // DOC (TEMP)
        'clean:docTemp',
        'ngdocs:api'
    ]);

    grunt.registerTask('version',[
        // CLEAN COVERAGE
        'clean:coverage',
        // CREATE BUILD
        'clean:dist',
        'prepareModules',
        'concat',
        'comments',
        // TEST
        'karma',
        // LINT
        'eslint',
        // PROMPT
        'prompt:version',
        'string-replace:bowerpackage',
        'file_append:changelog',
        // DOC (OFFICIAL)
        'clean:docVersion',
        'ngdocs:version'
    ]);
   
}
