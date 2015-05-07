module.exports = function(grunt) {

  grunt.initConfig({
    clean: { tests: ["docs"] },

    jshint: {
      grunt: ['Gruntfile.js'],
      tasks: ['tasks/doccomultifold.js'],
      tests: ['test/*.js'],
      options: {
        node: true
      }
    },

    doccomultifold: {
      app: {
        // Specify `src` and `dest` directly on the task object
        src: [
          'src/**/*.js'
        ],
      options: {
          output: 'docs/docco',
          layout: 'classic',
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

  grunt.registerTask('test', ['clean:tests', 'doccomultifold', 'nodeunit:tests']);
  grunt.registerTask('lint', ['jshint:grunt', 'jshint:tasks', 'jshint:tests']);
  grunt.registerTask('default', ['lint', 'doccomultifold']);
};
