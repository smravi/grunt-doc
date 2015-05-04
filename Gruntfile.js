module.exports = function(grunt) {

  grunt.initConfig({
    clean: { tests: ["docs"] },

    jshint: {
      grunt: ['Gruntfile.js'],
      tasks: ['tasks/docco.js'],
      tests: ['test/*.js'],
      options: {
        node: true
      }
    },

    docco: {
      app: {
        // Specify `src` and `dest` directly on the task object
        src: [
          '.docs/document/**/*'
        ],
      options: {
          output: '.docs/docco',
          layout: 'classic',
          template: 'docs/docco-template.jst',
          css: 'docs/docco-template.css',
          extension: null,
          languages: {},
          cleanDocs : {
              src: ['.docs']
          },
          copyDocs : {
              options: {
                  cwd: 'docs',
                  expand: true,
                  src: [
                      'src/**/*.js'
                  ],
                  dest: '.docs/'
              }
          },
          copyCodeToDocs : {
              options: {
                  expand: true,
                  src: [
                      'src/**/*.js'
                  ],
                  dest: '.docs/document/',
                  rename: function (dest, src) {
                      return dest + src. replace( /[\\\/]+/g, '!');
                  }
              }
          }
        }
      }
    },


    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('test', ['clean:tests', 'docco', 'nodeunit:tests']);
  grunt.registerTask('lint', ['jshint:grunt', 'jshint:tasks', 'jshint:tests']);
  grunt.registerTask('default', ['lint', 'docco']);
};
