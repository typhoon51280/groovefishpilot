// Generated on 2014-04-21 using generator-angular 0.8.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist',
      livereload: true,
    },

    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: '.tmp/server.js',
          node_env: 'development'
        }
      },
      dist: {
        options: {
          script: '<%= yeoman.dist %>/server.js',
          node_env: 'production',
          background: false
        }
      }
    },

    nodewebkit: {
      options: {
          build_dir: './webkitbuilds', // Where the build version of my node-webkit app is saved
          version: '0.8.6',
          mac: false, // We want to build it for mac
          win: false, // We want to build it for win
          linux32: false, // We don't need linux32
          linux64: true // We don't need linux64
      },
      src: ['<%= yeoman.dist %>/**/*'] // Your node-webkit app
    },

    modernizr: {

      build: {
          // [REQUIRED] Path to the build you're using for development.
          devFile: 'remote',

          // [REQUIRED] Path to save out the built file.
          outputFile : '.tmp/scripts/modernizr-custom.js',

          // Based on default settings on http://modernizr.com/download/
          extra: {
              load: true,
          },

          // Based on default settings on http://modernizr.com/download/
          /*
          "extensibility" : {
              "addtest" : false,
              "prefixed" : false,
              "teststyles" : false,
              "testprops" : false,
              "testallprops" : false,
              "hasevents" : false,
              "prefixes" : false,
              "domprefixes" : false
          },
          */

          // By default, source is uglified before saving
          uglify: false,

          // Define any tests you want to implicitly include.
          tests : ['network_eventsource'],

          // By default, this task will crawl your project for references to Modernizr tests.
          // Set to false to disable.
          parseFiles: false,

          // When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
          // You can override this by defining a "files" array below.
          // "files" : {
              // "src": []
          // },

          // When parseFiles = true, matchCommunityTests = true will attempt to
          // match user-contributed tests.
          matchCommunityTests: true,

          // Have custom Modernizr tests? Add paths to their location here.
          customTests : []
      }

    },


    injector: {
      options: {
        addRootSlash: false,
        /*
        transform: function(filepath) {
          return '<script>' + grunt.file.read('dist/'+filepath) + '</script>';
        }
        */
      },
      livereload: {
        options: {
          // ignorePath: '<% yeoman.app %>/',
          transform: function(filepath) {
            var filecontent = grunt.file.read(filepath);
            //var filecontent = '<script src="http://localhost:35729/livereload.js?snipver=1"></script>';
            var livereload = grunt.config('yeoman.livereload');
            if(livereload !== null && livereload !== true) {
              filecontent = filecontent.replace('35729',livereload);
            }
            filecontent = '<script>'+ filecontent + '</script>';
            grunt.log.ok(filecontent);
            return filecontent;
          }
        },
        files: {
          '.tmp/index.html': ['<%= yeoman.app %>/utils/livereload.js'],
        }
      }
    },

    env : {
      options : {
       //Shared Options Hash
      },
      dev: {
        NODE_ENV : 'development',
      },
      prod: {
        NODE_ENV : 'production',
      }
    },

    shell: {
      launchappdev: {
        command: 'nodewebkit .tmp',
        options: {
          async: true
        }
      },
      launchappdist: {
        command: 'nodewebkit dist',
        options: {
          async: false,
        }
      },
      options: {
          stdout: true,
          stderr: true,
          failOnError: true
      }
    },

    'install-dependencies': {
      options: {
        cwd: 'dist'
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['bowerInstall']
      },
      coffee: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.{coffee,litcoffee,coffee.md}'],
        tasks: ['newer:coffee:dist']
      },
      coffeeServer: {
        files: ['backend/server/{,*/}*.{coffee,litcoffee,coffee.md}'],
        tasks: ['newer:coffee:server']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.{coffee,litcoffee,coffee.md}'],
        tasks: ['newer:coffee:test', 'karma']
      },
      jade: {
        files: ['<%= yeoman.app %>/{,*/}*.jade'],
        tasks: ['newer:jade']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      express: {
        files:  [ '.tmp/server/*.js' ],
        tasks:  [ 'express:dev' ],
        options: {
          spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
        }
      },
      livereload: {
        options: {
          livereload: '<%= yeoman.livereload %>'
        },
        files: [
          // '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '.tmp/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
      },
      livereload: {
        options: {
          // open: true,
          livereload: '<%= yeoman.livereload %>',
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js'
      ]
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    bowerInstall: {
      app: {
        src: ['<%= yeoman.app %>/index.jade'],
        ignorePath: '<%= yeoman.app %>/',
        exclude: ['es5-shim','json3','EventSource']
      }
    },

    // Compiles CoffeeScript to JavaScript
    coffee: {
      options: {
        sourceMap: true,
        sourceRoot: ''
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/scripts',
          src: '{,*/}*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: 'backend',
          src: '{,*/}*.coffee',
          dest: '.tmp',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },

    // Compiles Jade to HTML
    jade: {
      compile: {
        options: {
          pretty: true,
          data: {
            debug: false
          }
        },
        files: [{
          expand: true, // Enable dynamic expansion.
          cwd: '<%= yeoman.app %>', // Src matches are relative to this path.
          src: '{,*/}*.jade', // Actual pattern(s) to match.
          dest: '.tmp/', // Destination path prefix.
          ext: '.html' // Dest filepaths will have this extension.
        }]
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '.tmp/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        root: '<%= yeoman.app %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    cssmin: {
      options: {
        // root: '<%= yeoman.app %>'
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: false,
          collapseBooleanAttributes: false,
          removeCommentsFromCDATA: false,
          removeOptionalTags: false
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ngmin tries to make the code safe for minification automatically by
    // using the Angular long form for dependency injection. It doesn't work on
    // things like resolve or inject so those have to be done manually.
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp',
          dest: '<%= yeoman.dist %>',
          src: ['{,*/}*.html',
                'package.json',
                'server{,*/}*.js']
        }, /*{
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }*/]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      nodewebkit: {
        expand: true,
        cwd: '<%= yeoman.app %>',
        dest: '.tmp',
        src: ['package.json']
      },
      frontend: {
        expand: true,
        cwd: '<%= yeoman.app %>',
        dest: '.tmp',
        src: ['bower_components/**',
              '{,*/}*.html',
              'fonts/**',
              'images/**']
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'coffee:dist',
        'coffee:server',
        'copy:styles',
        'copy:nodewebkit'
      ],
      test: [
        'coffee',
        'copy:styles'
      ],
      dist: [
        'coffee',
        'copy:styles',
        'copy:nodewebkit',
        'imagemin',
        'svgmin'
      ]
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= yeoman.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'bowerInstall',
      'jade',
      'modernizr',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    // grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    // grunt.task.run(['serve:' + target]);
    if (target === 'dist') {
      return grunt.task.run(['build', 'express:dist']);
    }
    grunt.task.run([
      'clean:server',
      'bowerInstall',
      'jade',
      'modernizr',
      'concurrent:server',
      'autoprefixer',
      'express:dev',
      'watch'
    ]);
  });

  grunt.registerTask('pkgapp', [
    'build',
    'install-dependencies',
    'nodewebkit'
  ]);

  grunt.registerTask('runapp', function (target) {
    if (target === 'dist') {
      return grunt.task.run([
        'build', 
        'env:prod',
        //'localappjson:dist',
        'shell:launchappdist'
      ]);
    }
    grunt.task.run([
      'clean:server',
      'bowerInstall',
      'jade',
      'modernizr',
      'concurrent:server',
      'autoprefixer',
      'env:dev',
      'copy:frontend',
      'injector:livereload',
      //'localappjson',
      'shell:launchappdev',
      'watch'
     ]);
  });

  grunt.registerTask('localappjson', function (directory) {
    if (directory === 'dev' || directory===undefined) {
      directory = '.tmp';
    }
    var filepath = directory + '/package.json';
    var applicationJson = grunt.file.readJSON(filepath);
    applicationJson.main = 'index.html';
    applicationJson['node-main'] = 'server.js';
    grunt.file.write(filepath, JSON.stringify(applicationJson, null, 2));
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'bowerInstall',
    'jade',
    'modernizr',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
