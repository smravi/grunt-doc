// grunt-docco
// https://github.com/DavidSouther/grunt-docco
//
// Copyright (c) 2012 David Souther
// Licensed under the MIT license.

"use strict";
var docco = require('docco');
var rimraf = require('rimraf');
var util = require('util');

module.exports = function (grunt) {
    function clean(cleanConfig) {
        var options = {
            force: grunt.option('force') === true,
            'no-write': grunt.option('no-write') === true,
        };
        cleanConfig.src.forEach(function (filepath) {
            if (!grunt.file.exists(filepath)) {
                return;
            }
            grunt.log.write((options['no-write'] ? 'Not actually cleaning ' : 'Cleaning ') + filepath + '...');
            if (!options.force) {
                if (grunt.file.isPathCwd(filepath)) {
                    grunt.verbose.error();
                    grunt.fail.warn('Cannot delete the current working directory.');
                    return;
                } else if (!grunt.file.isPathInCwd(filepath)) {
                    grunt.verbose.error();
                    grunt.fail.warn('Cannot delete files outside the current working directory.');
                    return;
                }
            }

            try {
                if (!options['no-write']) {
                    rimraf.sync(filepath);
                }
                grunt.log.ok();
            } catch (e) {
                grunt.log.error();
                grunt.fail.warn('Unable to delete "' + filepath + '" file (' + e.message + ').', e);
            }
        });

    }

    function copy(copyConfig) {
        var options = {
            encoding: grunt.file.defaultEncoding,
            // processContent/processContentExclude deprecated renamed to process/noProcess
            processContent: false,
            processContentExclude: [],
            timestamp: false,
            mode: false
        };
        var copyOptions = {
            encoding: copyConfig.options.encoding || options.encoding,
            process: copyConfig.options.process || options.process || options.processContent,
            noProcess: copyConfig.options.noProcess ||options.noProcess || options.processContentExclude,
        };
        grunt.file.expandMapping(copyConfig.options.src, copyConfig.options.dest, copyConfig.options).forEach(function(f) {
            var src = f.src[0];
            var dest = f.dest;
            if (grunt.file.isDir(src)) {
                grunt.file.mkdir(dest);
            } else {
                grunt.file.copy(src, dest, copyOptions);
            }
        });
    }

    grunt.registerMultiTask('doccomultifold', 'Docco multi folder processor.', function () {
        var options = this.options({
            layout: 'parallel'
        });
        // Merge task-specific and/or target-specific options with these defaults.
        grunt.verbose.writeflags(options, 'Options');
        // clean any existing old docs
        var cleanConfig = {
            src: [options.tempDir, options.output]
        };
        clean(cleanConfig);
        // copy the files to document
        var copyDocs = {
            options: {
                cwd: 'docs',
                expand: true,
                src: this.filesSrc,
                dest: options.tempDir
            }
        };
        copy(copyDocs);
        // construct files paths for multi folder
        var copyCodeToDocs = {
            options: {
                expand: true,
                src: this.filesSrc,
                dest: options.tempDir,
                rename: function (dest, src) {
                return dest + src. replace( /[\\\/]+/g, '!');
                }
            }
        };
        copy(copyCodeToDocs);

        // docco to generate document
        var srcArr = grunt.file.expand(options.tempDir+'/**');
        // Either set the destination in the files block, or (prefferred) in { options: output }
        this.options.output = this.options.output || (this.file && this.file.dest);
        docco.document(this.options({args: srcArr , template: 'template/docco-template.jst', css:'template/docco-template.css'}), this.async());
    });
};
