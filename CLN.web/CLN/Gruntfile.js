module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        webfont: {
            iconos: {
                src: 'iconos/men/*.svg',
                dest: 'build/fonts',
                options: {
                    fontFilename: 'evs-{hash}'
                }
            }
        }
    });
    
    // Load the plugin that provides the “uglify” task.
    grunt.loadNpmTasks('grunt-webfont');
   
   // Default task(s).
   grunt.registerTask('default', ['webfont']);
};


