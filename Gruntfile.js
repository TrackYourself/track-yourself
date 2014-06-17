/*jslint node: true */
'use strict';
module.exports = function(grunt) {

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// grunt-env: set node_env for tasks
		env:    {
			dev:    {
				NODE_ENV: 'development'
			},
			test:   {
				NODE_ENV: 'test'
			}
		},

		// https://github.com/sindresorhus/grunt-sass
		sass: {
			all: {
				options : {
					'outputStyle' : 'compressed',
					'imagePath' : 'images'
				},
				files : {
					'dist/main.css' : 'app/sass/main.sass'
				}
			}
		},

		// https://github.com/gruntjs/grunt-contrib-imagemin
		imagemin: {
			all: {    // Another target
				files: [
				{
					expand: true, // Enable dynamic expansion
					cwd   : 'app/images/', // Src matches are relative to this path
					src   : ['**/*.{png,jpg,gif}'], // Actual patterns to match
					dest  : 'dist/images/' // Destination path prefix
				}
				]
			}
		},


		simplemocha: {
			options: {
				ui: 'bdd',
				reporter: 'spec'
			},
			integration: {
				src: ['backend/tests/integration/*.test.js']
			},
			unit: {
				src: ['backend/tests/unit/*.test.js']
			}
		},

		clean: {
			dev: ['dist/'],
			dist: ['dist/', 'tmp/']
		},

		copy: {
			all: {
				files: [{
					expand: true,
					cwd: 'app/',
					src: '*.html',
					dest: 'dist/'
				},
				{
					expand: true,
					cwd: 'app/modules/',
					src: '**/*.html',
					dest: 'dist/templates',
					flatten: true
				}]
			}
		},

		// https://github.com/jmreidy/grunt-browserify
		browserify: {
			karma: {
				bundleOptions: {
          debug: true
        },
				files: {
					'dist/client.karma.js': ['app/application.js','app/tests/unit/**/*.js']
				}
			},
			app: {
				files: {
					'dist/client.js': ['app/application.js']
				}
			}
		},

		concat: { // run *after* browserify
			all: {
				src: [
				'app/bower_components/angular/angular.min.js',
				'app/bower_components/angular-route/angular-route.min.js',
				'app/bower_components/angular-resource/angular-resource.min.js',
        'dist/client.js'
				],
				dest: 'dist/client.js'
			},
			test: {
				src: [
				'app/bower_components/angular/angular.min.js',
				'app/bower_components/angular-route/angular-route.min.js',
				'app/bower_components/angular-resource/angular-resource.min.js',
				'app/bower_components/angular-mocks/angular-mocks.js',
        'dist/client.karma.js'
				],
				dest: 'dist/client.karma.js'
			}
		},

		// https://github.com/gruntjs/grunt-contrib-jshint
		jshint: {
			options: {
				jshintrc: true,
			},
			all: ['Gruntfile.js', 'server.js', 'app/*.js', 'app/modules/**/*.js']
		},

		// https://github.com/gruntjs/grunt-contrib-watch
		watch: {
			gruntfile : {
				files: ['Gruntfile.js']
			},
			sass      : {
				files: ['app/sass/**/*.sass'],
				tasks: ['sass']
			},
			browserify: {
				files: ['app/**/*.js'],
				tasks: ['browserify']
			}
		},
		express: {
			all: {
				options: {
					script: 'server.js',
					background: false
				}
			}
		},
		karma: {
			unit: {
				configFile: 'config/karma.conf.js',
				browsers: ['PhantomJS','Chrome', 'Firefox', 'Safari']
			}
		}

	});

	// TODO:
	//grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('default', ['clean', 'sass', 'imagemin']);
	grunt.registerTask('build', ['clean:dev', 'sass', 'imagemin', 'copy:all', 'browserify:app', 'concat:all']);
	grunt.registerTask('build-test', ['clean:dev', 'sass', 'imagemin', 'copy:all', 'browserify:karma', 'concat:test']);
	grunt.registerTask('ship', ['clean:dist', 'sass', 'imagemin', 'copy:all', 'jshint', 'browserify']);
	grunt.registerTask('serve', ['build', 'express:all']);

	//========================================================================
	//Tests
	//========================================================================
  grunt.registerTask('test', ['test-back', 'test-front']);

	grunt.registerTask('test-front', ['build-test','karma:unit']);


	grunt.registerTask('test-back', ['test-back-unit', 'test-back-integration']);
	grunt.registerTask('test-back-unit', ['env:test', 'simplemocha:unit']);
	grunt.registerTask('test-back-integration', ['env:test', 'simplemocha:integration']);






};
