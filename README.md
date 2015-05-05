# grunt-doc

Grunt Docco plugin with multi folder support.

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-docco --save-dev`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-docco');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Documentation

Add the task config to the grunt initConfig block.

```
docco: {
  app : {
    src: ['src/**/*.js'],
    options: {
      output: 'docs/docco',
      layout: 'classic',
      css: 'docs/docco-template.css',
      extension: null,
      languages: {},
      tempDir:'.docs/' // temp directory to store the intermediate files for documentation
    }
  }
}

```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
* 0.3.3: Update to use latest official docco version
* 0.3.2: Update to use newer commit of development docco
* 0.3.1: Update to use #development docco - fixes several issues with multiple runs.
* 0.3.0: Removed dependency on python's pygments. Use latest libraries.
* 0.2.0: Early release, depended on python's pygments.

## License
Licensed under the MIT license.
