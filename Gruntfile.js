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
      css: {
          expand: true,
          src: ['css/**/*.css'],
          dest: '_site/'
      },
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
          src: ['_sass/**','css/**','js/**']
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
          /* jshint -W101 */
          'for stylesheet in $(find css -name "*.scss" -print); do ' +
          'perl -ne \'$i > 1 ? print : /^---/ && $i++\' $stylesheet | ' +  // strip YAML front matter
          'bundle exec sass --scss --sourcemap=none -s -t expanded -I _sass _site/${stylesheet%.*}.css;' +
          'done;'
      }
    },
    watch: {
      options: {
        livereload: true
      },
      css: {
        files: ['css/**/*.css'],
        tasks: ['copy:css']
      },
      html: {
        files: [
          '**/*.html','**/*.md','**/*.yml',
          '!README.md','!_site/**','!bower_components/**','!node_modules/**'
        ],
        tasks: ['shell:jekyll','shell:sass']
      },
      img: {
        files: ['img/**/*'],
        tasks: ['copy:img']
      },
      js: {
        files: ['js/**/*'],
        tasks: ['copy:js']
      },
      sass: {
        files: ['_sass/**/*','css/**/*.scss'],
        tasks: ['shell:sass']
      }
    }
  });

  // Load tasks provided by npm modules
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-shell');

  // Custom tasks
  grunt.registerTask('build',     ['shell:jekyll']);
  grunt.registerTask('build:dev', ['build','shell:sass']);
  grunt.registerTask('serve',     ['build:dev','connect','watch']);
  grunt.registerTask('test',      ['build','shell:htmlproofer']);

  // Default task
  grunt.registerTask('default',   ['test']);

};

