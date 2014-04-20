'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var FisLogo = require('./logo').FisLogo;
var chalk = require('chalk');


var FisGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    //this.log(this.yeoman);
    //welcome messagef
    this.log(FisLogo(this));

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic Fis generator.'));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('bower_components');
    this.mkdir('src');
    this.mkdir('src/pages');
    this.mkdir('src/mods');
    this.mkdir('src/ui');
    this.mkdir('dist');
    this.mkdir('tests');
    this.mkdir('docs');

    this.directory('demo', 'demo');

    console.log('Directories initialization done!');
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});



module.exports = FisGenerator;