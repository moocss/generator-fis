'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var AppGenerator = yeoman.generators.Base.extend({
    init: function() {

        this.pkg = require('../package.json');

        this.on('end', function() {
            if (!this.options['skip-install']) {
                this.installDependencies();
            }
        });
    },

    askFor: function() {
        var done = this.async();
    }
});

module.exports = AppGenerator;