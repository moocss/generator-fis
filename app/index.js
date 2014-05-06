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

        var abcJSON = {};
        try {
            abcJSON = require(path.resolve(process.cwd(), 'abc.json'));
        } catch (e) {}

        if (!abcJSON.author) {
            abcJSON.author = {
                name : '',
                email: ''
            }
        }
        if (!abcJSON.name) {
            abcJSON.name = 'tmp';
        }

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
                message: '(1/9) Name of Project?',
                default: folderName,
                warning:''
            },
            {
                name: 'srcDir',
                message: '(2/9) Create "src" directory?',
                default: 'Y/n',
                warning: ''
            },
            {
                name   : 'author',
                message: '(3/9) Author Name:',
                default: abcJSON.author.name,
                validate: function (val) {
                    return val.length > 0 ? true : '您必须输入一个昵称！'
                },
                warning: ''
            },
            {
                name   : 'email',
                message: '(4/9) Author Email:',
                default: abcJSON.author.email,
                validate: function (val) {
                    return val.length > 0 ? true : '您必须输入一个邮箱！'
                },
                warning: ''
            },
            {
                name   : 'groupName',
                message: '(5/9) Group Name:',
                default: 'fued',
                warning: ''
            },
            {
                name   : 'useBuild',
                message: '(6/9) Would you like to use Gulp(Y) or Grunt(n)?',
                default: 'Y/n',
                warning: ''
            },
            {
                type: 'list',
                name: 'cssCompile',
                message: '(7/9) 请您选择的一个CSS预编译语言?',
                choices: [
                    {
                        name: 'Sass',
                        value: 'includeSass'
                    },
                    {
                        name: 'Stylus',
                        value: 'includeStylus'
                    },
                    {
                        name: 'Less',
                        value: 'includeLess'
                    }
                ],
                default: 1
            },
            /*{
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
            },*/
            {
                name: 'jquery',
                message: '(8/9) Do you like to use jQuery',
                default: 'Y/n',
                warning: ''
            },
            {
                name   : 'version',
                message: '(9/9) Version:',
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
            this.useBuild = ((/^y/i).test(props.useBuild))? 'gulp':'grunt';
            this.jquery = (/^y/i).test(props.jquery);

            var cssCompile = this.cssCompile = props.cssCompile;
            function hasFeature(feat) {
                return cssCompile.indexOf(feat) !== -1;
            }
            this.includeSass = hasFeature('includeSass');
            this.includeStylus = hasFeature('includeStylus');
            this.includeLess = hasFeature('includeLess');
            switch(cssCompile) {
                case "includeSass":
                    this.cssCompile ="sass";
                    break;
                case "includeStylus":
                    this.cssCompile ="stylus";
                    break;
                case "includeLess":
                    this.cssCompile ="less";
                    break;
            }

            var today = new Date();
            this.today = today.getFullYear() + '-' + ('0' + (today.getMonth()+1)).slice(-2) + '-' + ('0' + (today.getDate())).slice(-2);

            done();

        }.bind(this));
    },

    app: function() {
        this.log(chalk.green(' ✓', chalk.white('------------>>> 开始App >>>--------------')));
        var that = this;
        if (this.srcDir) {
            this.mkdir('src');
            //this.mkdir('bower_components');
            this.mkdir('src');
            this.mkdir('src/pages');
            this.mkdir('src/mods');
            this.mkdir('src/components');
            this.mkdir('src/pages/css');
            /*this.log("includeSass:"+this.includeSass);
            this.log("includeStylus:"+this.includeStylus);
            this.log("includeLass:"+this.includeLess);*/
            if (this.includeSass) {
                this.mkdir('src/pages/css/sass');
            } else if (this.includeStylus) {
                this.mkdir('src/pages/css/stylus');
            } else {
                this.mkdir('src/pages/css/less');
            }
        }

        this.mkdir('dist');
        this.mkdir('tests');
        this.mkdir('docs');
        this.directory('demo', 'demo');
        this.template('abc.json');
        this.log('Directories initialization done!');

    },


    git: function() {
        this.log(chalk.green('\n ✓', chalk.white('------------>>> 开始GIT >>>--------------')));
        this.copy('git.attributes', '.gitattributes');
        this.copy('git.ignore', '.gitignore');
    },

    useBuild: function(){
        if ( this.useBuild === 'gulp' ) {
            this.log(chalk.green('\n ✓', chalk.white('------------>>> 开始Gulp >>>--------------')));
            this.template('gulp/_Gulpfile.js', 'Gulpfile.js');
            this.template('gulp/_bower.json', 'bower.json');
            this.copy('gulp/bowerrc', '.bowerrc');
            this.template('gulp/_package.json', 'package.json');
            this.template('gulp/_readme.md', 'README.md');
        } else {
            this.log(chalk.green('\n ✓', chalk.white('------------>>> 开始Grunt >>>--------------')));
            this.template('grunt/_Gruntfile.js', 'Gruntfile.js');
            this.template('grunt/_bower.json', 'bower.json');
            this.copy('grunt/bowerrc', '.bowerrc');
            this.template('grunt/_package.json', 'package.json');
            this.template('grunt/_readme.md', 'README.md');
        }
    },
    /*
    sass: function() {
        this.log(chalk.green('\n ✓', chalk.white('------------>>> 开始Sass >>>--------------')));

    },

    stylus: function() {
        this.log(chalk.green('\n ✓', chalk.white('------------>>> 开始Stylus >>>------------')));
    },*/

    jshint : function () {
        this.log(chalk.green('\n ✓', chalk.white('------------>>> 开始jshint >>>------------')));
        this.copy('jshintrc', '.jshintrc');
    },

    csslint : function () {
        this.log(chalk.green('\n ✓', chalk.white('------------>>> 开始csslint >>>-----------')));
        this.copy('csslintrc', '.csslintrc');
    },

    projectfiles: function() {
        this.log(chalk.green('\n ✓', chalk.white('------------>>> 开始Project files >>>-----')));
        this.copy('editorconfig', '.editorconfig');
    }
});

module.exports = FisGenerator;

