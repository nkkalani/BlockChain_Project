module.exports = function(grunt) {
  grunt.initConfig({
    ngtemplates:  {
      app:        {
        src:     '**/*.html',
      }
    }
  });

  grunt.loadNpmTasks('grunt-angular-templates');
};
