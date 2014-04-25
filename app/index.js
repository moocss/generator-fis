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

        //welcome messagef
        this.log(FisLogo(this));

        // have Yeoman greet the user
        // this.log(this.yeoman);
        var folderName = path.basename(process.cwd());

        // your-mojo-name => YourMojoName
        function parseMojoName(name){
            return name.replace(/\b(\w)|(-\w)/g, function (m) {
                return m.toUpperCase().replace('-', '');
            });
        }

        // replace it with a short and sweet description of your generator
        this.log(chalk.magenta('You\'re using the fantastic Fis generator - Greate Webapp.'));

        var prompts = [
            {
                name: 'projectName',
                message: 'Name of Project?',
                default: folderName,
                warning:''
            },
            {
                name: 'srcDir',
                message: 'Create "src" directory?',
                default: 'Y/n',
                warning: ''
            },
            {
                name   : 'author',
                message: 'Author Name:',
                default: '',
                warning: ''
            },
            {
                name   : 'email',
                message: 'Author Email:',
                default: '',
                warning: ''
            },
            {
                name   : 'groupName',
                message: 'Group Name:',
                default: 'moocss',
                warning: ''
            },
            {
                type: 'checkbox',
                name: 'cssCompile',
                message: '您选择的CSS预编译语言是?',
                choices:[
                    {
                        name: 'Sass',
                        value: 'includeSass',
                        checked: false
                    },
                    {
                        name: 'Stylus',
                        value: 'includeStylus',
                        checked: true
                    },
                    {
                        name: 'Less',
                        value: 'includeLess',
                        checked: false
                    }
                ]
            },
            {
                name   : 'version',
                message: 'Version:',
                default: '0.1.0',
                warning: ''
            }
        ];

        this.prompt(prompts, function (props) {

            this.packageName = props.projectName;// project-name
            this.projectName = parseMojoName(this.packageName); //ProjectName
            this.author = props.author;
            this.email = props.email;
            this.groupName = props.groupName;
            this.version = props.version;
            this.srcDir = (/^y/i).test(props.srcDir);


            var cssCompile = props.cssCompile;

            function hasFeature(feat) {
                return cssCompile.indexOf(feat) !== -1;
            }

            this.includeSass = hasFeature('includeSass');
            this.includeStylus = hasFeature('includeStylus');
            this.includeLess = hasFeature('includeLess');

            done();

        }.bind(this));
    },

    app: function() {
        var that = this;
        if (this.srcDir) {
            this.mkdir('src');
            //this.mkdir('bower_components');
            this.mkdir('src');
            this.mkdir('src/pages');
            this.mkdir('src/mods');
            this.mkdir('src/components');
            this.mkdir('src/pages/css');
            //console.log("includeSass:"+this.includeSass);
            //console.log("includeSass:"+this.includeStylus);
            //console.log("includeSass:"+this.includeLess);
            if (this.includeSass) {
                this.mkdir('src/pages/css/sass');
            }
            if (this.includeStylus) {
                this.mkdir('src/pages/css/stylus');
            }
            if (this.includeLess) {
                this.mkdir('src/pages/css/less');
            }
        }

        this.template('README.md');
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

