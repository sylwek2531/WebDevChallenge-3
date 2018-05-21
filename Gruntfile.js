module.exports = function (grunt)
{

    var serveStatic = require('serve-static');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');


    grunt.initConfig({
        watch: {
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'app/**/*.html',
                    'app/**/*.js',
                    'app/**/*.css',
                    'app/**/*.scss'
                ]
            },
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            }
        },
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect)
                    {
                        return [connect().use('/bower_components', serveStatic('./bower_components')), serveStatic('app')];
                    }
                }
            }
        },
        sass: {
            dist: {// Task
                // Target
                options: {                       // Target options
                    style: 'expanded',
                    noCache: true
                },
                files: {                         // Dictionary of files
                    'app/style.css': 'app/style.scss'     // 'destination': 'source'
                }
            }
        }
    });

    grunt.registerTask('serve', function ()
    {
        grunt.task.run(['connect:livereload', 'watch']);
    });

    grunt.registerTask('default', ['serve']);
};
