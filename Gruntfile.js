module.exports = function(grunt) {
  grunt.initConfig({
    // Make package info available to tasks
    pkg: grunt.file.readJSON('package.json'),

    // Browserify front-end modules
    browserify: {
      options: { 
        browserifyOptions: {
          debug: true
        }
      },
      js: {
        src: ['src/browser/js/app.js'],
        dest: 'public/app.js'
      }
    },
      
      
    uglify: {
        my_target: {
          files: {
            'public/app.js': 'public/app.js'
          }
        }
    },

    // Compile Sass stylesheets
    sass: {
      dev: {
        options: {
          sourceMap: true
        },
        files: {
          'public/app.css': 'src/browser/scss/app.scss'
        }
      },
      dist: {
        options: {
          sourceMap: false,
          outputStyle: 'compressed'
        },
        files: {
          'public/app.min.css': 'src/browser/scss/app.scss'
        }
      }
    },

    watch: {
      javascript: {
        files: ['src/browser/js/**/*.js'],
        tasks: ['browserify']
      },
      sass: {
        files: 'src/browser/scss/**/*.scss',
        tasks: ['sass:dev']
      }
    },

    // restart server node process during development
    nodemon: {
      dev: {
        script: 'bin/server.js',
        options: {
          ignore: ['node_modules/**', 'public', 'src/browser']
        }
      }
    },

    // Shell commands to run via Grunt
    shell: {
      // Execute mocha tests
      test: {
        command: 'npm test'
      }
    },

    // Run dev watch tasks (and others potentially) concurrently 
    concurrent: {
      dev: {
        tasks: ['watch', 'nodemon'],
        options: {
          logConcurrentOutput: true
        }
      }
    }

  });

  // Load third party tasks
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-uglify');


  // Default is running the local development server
  grunt.registerTask('default', ['sass:dev', 'browserify', 'concurrent:dev']);

  // Build production assets
  grunt.registerTask('collect_static', 
    ['init_static', 'sass:dist', 'browserify', 'uglify']);

  // Custom tasks
  grunt.loadTasks('bin/tasks');
};
