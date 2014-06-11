/* globals module */

module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

    // grunt-env: set node_env for tasks
    env: {
      dev: {
        NODE_ENV: 'development'
      },
      test: {
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
			all: {                         // Another target
				files: [
					{
						expand: true,                  // Enable dynamic expansion
						cwd   : 'app/images/',                   // Src matches are relative to this path
						src   : ['**/*.{png,jpg,gif}'],   // Actual patterns to match
						dest  : 'dist/images/'                  // Destination path prefix
					}
				]
			}
		},


    simplemocha: {
      options: {
        ui: 'bdd',
        reporter: 'spec'
      },
      all: {
        src: ['backend/tests/*.test.js']
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
        },
        {
          expand: true,
          cwd: 'app/',
          src: 'bower_components/**/*',
          dest: 'dist/'
          }
        ]
      }
    },

		// https://github.com/jmreidy/grunt-browserify
		browserify: {
			all: {
				options: {

				},
				files: {
					'dist/client.js': 'app/application.js'
				}
			}
		},

		// https://github.com/gruntjs/grunt-contrib-jshint
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: ['Gruntfile.js', 'server.js', 'app/**/*.js']
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
				files: ['Gruntfile.js', 'server.js', 'app/**/*.js'],
				tasks: ['browserify']
			}
		}
	});

	// Done
  grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-simple-mocha');

	// To-do
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');

	// https://github.com/gruntjs/grunt-contrib-connect
	grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('test', ['env:test', 'simplemocha:all']);

	grunt.registerTask('default', ['clean', 'sass', 'imagemin']);
	grunt.registerTask('build', ['clean:dev', 'sass', 'imagemin', 'copy:all', 'browserify']);
	grunt.registerTask('ship', ['clean:dist', 'sass', 'imagemin', 'copy:all', 'jshint', 'browserify']);

};
