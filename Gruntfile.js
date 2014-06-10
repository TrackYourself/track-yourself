/* globals module */

module.exports = function(grunt) {

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),

		// https://github.com/sindresorhus/grunt-sass
		sass : {
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

		// https://github.com/gruntjs/grunt-contrib-clean
		clean: ['./dist/']
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('default', ['clean', 'sass', 'imagemin']);

};