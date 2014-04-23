'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var FisLogo = require('./logo').FisLogo;
var chalk = require('chalk');


var FisGenerator = yeoman.generators.Base.extend({
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

        // have Yeoman greet the user
        //this.log(this.yeoman);
        //welcome messagef
        this.log(FisLogo(this));

        // replace it with a short and sweet description of your generator
        this.log(chalk.magenta('You\'re using the fantastic Fis generator - Greate Webapp.'));

        var prompts = [{
            name: 'projectName',
            message: 'Name of Project?'
        }, {
            type: 'checkbox',
            name: 'features',
            message: 'What would you like to include?',
            choices: [{
                name: 'Sass',
                value: 'includeSass',
                checked: true
            }, {
                name: 'Stylus',
                value: 'includeStylus',
                checked: true
            }, {
                name: 'jQuery',
                value: 'includejQuery',
                checked: true
            }]
        }];

        this.prompt(prompts, function(props) {

            this.projectName = props.projectName;

            var features = props.features;

            function hasFeature(feat) {
                return features.indexOf(feat) !== -1;
            }

            this.includeSass = hasFeature('includeSass');
            this.includeStylus = hasFeature('includeStylus');
            this.includejQuery = hasFeature('includejQuery');

            done();

        }.bind(this));
    },

    app: function() {
        //this.mkdir('bower_components');
        this.mkdir('src');
        this.mkdir('src/pages');
        this.mkdir('src/mods');
        this.mkdir('src/components');
        this.mkdir('src/pages/css');
        if (this.includeSass) {
            this.mkdir('src/pages/css/sass');
        }
        if (this.includeStylus) {
            this.mkdir('src/pages/css/stylus');
        }
        this.mkdir('dist');
        this.mkdir('tests');
        this.mkdir('docs');

        this.directory('demo', 'demo');

        console.log('Directories initialization done!');

    },

    git: function() {
        this.copy('gitignore', '.gitignore');
    },

    bower: function() {
        this.template('_bower.json', 'bower.json');
        this.copy('bowerrc', '.bowerrc');
    },

   /* grunt: function() {
        this.template('Gruntfile.js', 'Gruntfile.js');
    },*/

    gulp: function() {
        this.template('Gulpfile.js', 'Gulpfile.js');
    },

    sass: function() {

    },

    stylus: function() {

    },

    projectfiles: function() {
        this.template('_package.json', 'package.json');
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');
    }
});

module.exports = FisGenerator;