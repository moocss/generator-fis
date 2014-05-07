'use strict';
var fs = require('fs');
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var FisLogo = require('./logo').FisLogo;
var validator = require('validator');
var chalk = require('chalk');
var wiredep = require('wiredep');

var FisGenerator = yeoman.generators.Base.extend({
    init: function() {

        this.pkg = require('../package.json');

        if (!this.options['skip-install-message']) {
            //welcome message
            this.log(FisLogo(this));
        }

        this.on('end', function() {
            var howToInstall =
                '\nAfter running '+chalk.yellow.bold('npm install & bower install')+' , inject your front end dependencies into' +
                '\nyour HTML by running:' +
                '\n' +
                chalk.yellow.bold('\n  gulp wiredep');

            if (this.options['skip-install']) {
                console.log(howToInstall);
                return;
            }

            this.installDependencies({
                skipMessage: this.options['skip-install-message'],
                skipInstall: this.options['skip-install'],
                callback: function() {
                    //console.log('Everything is ready!');
                    var bowerJson = JSON.parse(fs.readFileSync('./bower.json'));
                    if (this.jquery) {
                        // wire Bower packages to jQuery
                        wiredep({
                            bowerJson: bowerJson,
                            directory: 'src/components',
                            src: 'demo/**/*.html'
                        });
                    }
                    /*if (this.includeSass) {
                        // wire Bower packages to .scss
                        wiredep({
                            bowerJson: bowerJson,
                            directory: 'src/components',
                            src: ''
                        });
                    }*/

                    console.log(chalk.green('\nnpm was installed successful. \n'));

                }.bind(this)
            });
        });
    },

    askFor: function() {
        var done = this.async();

        var abcJSON = {};
        try {
            abcJSON = require(path.resolve(process.cwd(), 'abc.json'));
        } catch (e) {}

        if (!abcJSON.author) {
            abcJSON.author = {
                name: '',
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
        function parseMojoName(name) {
            return name.replace(/\b(\w)|(-\w)/g, function(m) {
                return m.toUpperCase().replace('-', '');
            });
        }

        // replace it with a short and sweet description of your generator
        this.log(chalk.magenta('You\'re using the fantastic Fis generator - Greate Webapp.'));

        var prompts = [{
                name: 'projectName',
                message: chalk.green('(1/10)', chalk.white('Name of Project?')),
                default: folderName,
                warning: ''
            }, {
                name: 'srcDir',
                message: chalk.green('(2/10)', chalk.white('Create', chalk.red.bold('"src"'), 'directory?')),
                default: 'Y/n',
                warning: ''
            }, {
                name: 'author',
                message: chalk.green('(3/10)', chalk.white('Author Name')),
                default: abcJSON.author.name,
                validate: function(val) {
                    return val.length > 0 ? true : '你必须输入一个昵称！'
                },
                warning: ''
            }, {
                name: 'email',
                message: chalk.green('(4/10)', chalk.white('Author Email')),
                default: abcJSON.author.email,
                validate: function(val) {
                    return validator.isEmail(val) ? true : '你必须输入一个邮箱地址！';
                },
                warning: ''
            }, {
                name: 'groupName',
                message: chalk.green('(5/10)', chalk.white('Group Name')),
                default: 'fued',
                warning: ''
            }, {
                name: 'useBuild',
                message: chalk.green('(6/10)', chalk.white('Would you like to use Gulp(Y) or Grunt(n)?')),
                default: 'Y/n',
                warning: ''
            }, {
                type: 'list',
                name: 'cssCompile',
                message: chalk.green('(7/10)', chalk.white('请你选择CSS预编译语言?')),
                choices: [{
                    name: 'CSS',
                    value: 'includeCSS'
                }, {
                    name: 'Sass',
                    value: 'includeSass'
                }, {
                    name: 'Stylus',
                    value: 'includeStylus'
                }, {
                    name: 'Less',
                    value: 'includeLess'
                }],
                default: 2
            },
            {
                name: 'jquery',
                message: chalk.green('(8/10)', chalk.white('你要使用jQuery吗?')),
                default: 'Y/n',
                warning: ''
            }, {
                name: 'version',
                message: chalk.green('(9/10)', chalk.white('Version')),
                default: '0.1.0',
                warning: ''
            }
        ];

        this.prompt(prompts, function(props) {

            this.packageName = props.projectName; // project-name
            this.projectName = parseMojoName(this.packageName); //ProjectName
            this.author = props.author;
            this.email = props.email;
            this.groupName = props.groupName;
            this.version = props.version;
            this.srcDir = (/^y/i).test(props.srcDir);
            this.useBuild = ((/^y/i).test(props.useBuild)) ? 'gulp' : 'grunt';
            this.jquery = (/^y/i).test(props.jquery);

            var cssCompile = this.cssCompile = props.cssCompile;

            function hasFeature(feat) {
                return cssCompile.indexOf(feat) !== -1;
            }
            this.includeSass = hasFeature('includeSass');
            this.includeStylus = hasFeature('includeStylus');
            this.includeLess = hasFeature('includeLess');
            switch (cssCompile) {
                case "includeSass":
                    this.cssCompile = "sass";
                    break;
                case "includeStylus":
                    this.cssCompile = "stylus";
                    break;
                case "includeLess":
                    this.cssCompile = "less";
                    break;
            }

            var today = new Date();
            this.today = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + (today.getDate())).slice(-2);

            if (this.srcDir) {
                this.prompt([{
                    name: 'pagesModulesWidgets',
                    message: chalk.green('(10/10)', chalk.white('Create', chalk.red.bold('"src/page[module|widget]"'), 'directory?')),
                    default: 'Y/n',
                    warning: ''
                }], function(props) {

                    this.pagesModulesWidgets = (/^y/i).test(props.pagesModulesWidgets);

                    done();

                }.bind(this));
            } else {
                done();
            }

        }.bind(this));
    },

    app: function() {
        this.log(chalk.green(' ✓', chalk.white('------------>>> 开始 App >>>--------------')));
        var that = this;
        if (this.srcDir) {
            this.mkdir('src');
            if (this.pagesModulesWidgets) {
                this.mkdir('src/components');
                this.mkdir('src/page');
                this.mkdir('src/module');
                this.mkdir('src/widget');
                /*if (this.includeSass) {
                    this.mkdir('src/page/sass');
                } else if (this.includeStylus) {
                    this.mkdir('src/page/stylus');
                } else {
                    this.mkdir('src/page/less');
                }*/
            }
        }

        //手工测试demo
        //this.directory('demo', 'demo');

        this.mkdir('dist');
        this.mkdir('test');
        this.mkdir('doc');
        this.template('abc.json');
        this.log('Directories initialization done!');

    },


    git: function() {
        this.log(chalk.green('\n ✓', chalk.white('------------>>> 开始 GIT >>>--------------')));
        this.copy('git.attributes', '.gitattributes');
        this.copy('git.ignore', '.gitignore');
    },

    useBuild: function() {
        if (this.useBuild === 'gulp') {
            this.log(chalk.green('\n ✓', chalk.white('------------>>> 开始 Gulp >>>--------------')));
            this.template('gulp/_Gulpfile.js', 'Gulpfile.js');
            this.template('gulp/_bower.json', 'bower.json');
            this.copy('gulp/bowerrc', '.bowerrc');
            this.template('gulp/_package.json', 'package.json');
            this.template('gulp/_readme.md', 'README.md');
        } else {
            this.log(chalk.green('\n ✓', chalk.white('------------>>> 开始 Grunt >>>--------------')));
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

    jshint: function() {
        this.log(chalk.green('\n ✓', chalk.white('------------>>> 开始 jshint >>>------------')));
        this.copy('jshintrc', '.jshintrc');
    },

    csslint: function() {
        this.log(chalk.green('\n ✓', chalk.white('------------>>> 开始 csslint >>>-----------')));
        this.copy('csslintrc', '.csslintrc');
    },

    projectfiles: function() {
        this.log(chalk.green('\n ✓', chalk.white('------------>>> 开始Project files >>>-----')));
        this.copy('editorconfig', '.editorconfig');
    }
});

module.exports = FisGenerator;
