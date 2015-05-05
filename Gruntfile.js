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
          'src/**/*.js'
        ],
      options: {
          output: 'docs/docco',
          layout: 'classic',
          css: 'docs/docco-template.css',
          extension: null,
          languages: {},
          tempDir:'.docs/'
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
