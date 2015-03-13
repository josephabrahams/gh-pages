/* jshint node: true */

'use strict';

module.exports = function(grunt) {

  var port = grunt.option('port') || 8000;

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      site: {
        src: ['_site/']
      }
    },
    connect: {
      server: {
        options: {
          base: '_site/',
          hostname: 'localhost',
          port: port,
          livereload: true,
          open: true
        }
      }
    },
    copy: {
      img: {
          expand: true,
          src: ['img/**/*'],
          dest: '_site/'
      },
      js: {
          expand: true,
          src: ['js/**/*'],
          dest: '_site/'
      }
    },
    modernizr: {
      dist: {
        devFile: 'js/lib/modernizr.min.js',
        outputFile: 'js/lib/modernizr.min.js',
        extra: {
          shiv: true,
          printshiv: false,
          load: true,
          mq: false,
          cssclasses: true
        },
        // Based on default settings on http://modernizr.com/download/
        extensibility: {
          addtest: false,
          prefixed: false,
          teststyles: false,
          testprops: false,
          testallprops: false,
          hasevents: false,
          prefixes: false,
          domprefixes: false,
          cssclassprefix: ''
        },
        files : {
          src: ['_sass/**','css/**','js/**',]
        },
      }
    },
    shell: {
      options: {
        stdout: false
      },
      htmlproofer: {
        command: 'bundle exec htmlproof _site'
      },
      jekyll: {
        command: 'bundle exec jekyll build'
      },
      sass: {
        command:
          'perl -ne \'$i > 1 ? print : /^---/ && $i++\' css/styles.scss | ' +
          'bundle exec sass --scss --sourcemap=none -s -t expanded -I _sass _site/css/styles.css'
      }
    },
    watch: {
      options: {
        livereload: true
      },
      html: {
        files: [
          '**/*.html','**/*.md','**/*.yml',
          '!README.md','!_site/**','!bower_components/**','!node_modules/**'
        ],
        tasks: ['shell:jekyll','shell:sass'],
        options: {
          debounceDelay: 250
        }
      },
      img: {
        files: ['img/**/*'],
        tasks: ['copy:img'],
        options: {
          debounceDelay: 250
        }
      },
      js: {
        files: ['js/**/*'],
        tasks: ['copy:js'],
        options: {
          debounceDelay: 250
        }
      },
      sass: {
        files: ['_sass/**','css/**'],
        tasks: ['shell:sass'],
        options: {
          debounceDelay: 250
        }
      }
    }
  });

  // Load tasks provided by npm modules
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');

  // Custom tasks
  grunt.registerTask('build',     ['shell:jekyll']);
  grunt.registerTask('build:dev', ['build','shell:sass']);
  grunt.registerTask('serve',     ['build:dev','connect','watch']);
  grunt.registerTask('test',      ['build','shell:htmlproofer']);

  // Default task
  grunt.registerTask('default',   ['test']);

};

