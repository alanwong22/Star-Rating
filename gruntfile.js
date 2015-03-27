module.exports = function(grunt) {
//http-server /Users/Station22/Desktop/workspace/JestStudios_Portfolio_2015
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      libs: {
        src: [
          'node_modules/angular/angular.min.js',
          'node_modules/angular-route/angular-route.min.js',
          'node_modules/jquery/dist/jquery.min.js'
        ],
        dest: 'js/lib.js',
      },
      core: {
        src: [
          'js/app/app.js',
          'js/app/**/*.js'
        ],
        dest: 'js/core.js',
      }
    },
    uglify: {
      build: {
        src: 'js/core.js',
        dest: 'js/core.min.js'
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'css/styles.css' : 'scss/styles.scss'
        }
      }
    },
    watch: {
     scripts: {
       files: [
         'js/app/app.js',
         'js/app/**/*.js'
       ],
       tasks: ['concat:core']
       // options: {
       //     spawn: false,
       // },
     },
     css: {
       files: [
        'scss/*.scss',
        'scss/**/*.scss'
       ],
       tasks: ['sass']
     }
   } 
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['concat', 'uglify', 'sass']);
  grunt.registerTask('update', ['concat','sass']);
  grunt.registerTask('dev', ['concat:core','sass','watch']);

};