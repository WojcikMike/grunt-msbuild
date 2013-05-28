'use strict';
module.exports = function (grunt) {
    var exec = require('child_process').exec;
    var _ = grunt.util._;

    grunt.registerMultiTask('msbuild', 'Run MSBuild tasks', function () {
        var cb = this.async();
        var options = this.options({
            stdout: false,
            stderr: false,
            failOnError: false
        });
        var cmd = grunt.template.process(this.data.command);
        var cp = exec(cmd, options.execOptions, function (err, stdout, stderr) {
            if (_.isFunction(options.callback)) {
                options.callback.call(this, err, stdout, stderr, cb);
            } else {
                if (err && options.failOnError) {
                    grunt.warn(err);
                }
                cb();
            }
        });

        if (options.stdout || grunt.option('verbose')) {
            cp.stdout.pipe(process.stdout);
        }

        if (options.stderr || grunt.option('verbose')) {
            cp.stderr.pipe(process.stderr);
        }
    });
};