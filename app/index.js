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
                '\nAfter running ' + chalk.yellow.bold('npm install & bower install') + ' , inject your front end dependencies into' +
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

	                /*var bowerJson = JSON.parse(fs.readFileSync('./bower.json'));
	                if (this.jquery) {
	                    // wire Bower packages to jQuery
	                    wiredep({
	                        bowerJson: bowerJson,
	                        directory: this.srcDir ? 'src/components' : 'bower_components',
	                        src: ''
	                    });
	                }*/
	                /*if (this.includeSass) {
	                    // wire Bower packages to .scss
	                    wiredep({
	                        bowerJson: bowerJson,
	                        directory: 'src/components',
	                        src: ''
	                    });
	                }*/


                    console.log(chalk.green('\nnpm was installed successful. \n'));

                    if (this.useBuild === 'gulp') {
                        this.log("请稍等...正在 [gulp watch] ...");
                        this.spawnCommand('gulp', ['watch']);
                    } else {
                        this.log("请稍等...正在 [grunt watch] ...");
                        this.spawnCommand('grunt', ['watch']);
                    }

                }.bind(this)
            });
        });
    },

    hasFeature: function (list, feat) {
        return (list || []).indexOf(feat) !== -1;
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
            message: chalk.green('(1/11)', chalk.white('Name of Project?')),
            default: folderName,
            warning: ''
        }, {
            name: 'srcDir',
            message: chalk.green('(2/11)', chalk.white('Create', chalk.red.bold('"src"'), 'directory?')),
            default: 'Y/n',
            warning: ''
        }, {
            name: 'author',
            message: chalk.green('(3/11)', chalk.white('Author Name')),
            default: abcJSON.author.name,
            validate: function(val) {
                return val.length > 0 ? true : '你必须输入一个昵称！'
            },
            warning: ''
        }, {
            name: 'email',
            message: chalk.green('(4/11)', chalk.white('Author Email')),
            default: abcJSON.author.email,
            validate: function(val) {
                return validator.isEmail(val) ? true : '你必须输入一个邮箱地址！';
            },
            warning: ''
        }, {
            name: 'groupName',
            message: chalk.green('(5/11)', chalk.white('Group Name')),
            default: 'fued',
            warning: ''
        }, {
            name: 'port',
            message:  chalk.green('(6/11)', chalk.white('HTTP Server Port')),
            default: '9000',
            warning: ''
        }, {
            name: 'useBuild',
            message: chalk.green('(7/11)', chalk.white('Would you like to use Gulp(Y) or Grunt(n)?')),
            default: 'Y/n',
            warning: ''
        }, {
            type: 'checkbox',
            name: 'components',
            message: chalk.green('(8/11)', chalk.white('请你选择想要的Components?')),
            choices: [{
              name: 'jquery',
              value: 'includejQuery',
              checked: true
            }, {
              name: 'html5shiv',
              value: 'includeHtml5shiv',
              checked: true
            }, {
              name: 'requirejs',
              value: 'includeRequirejs',
              checked: true
            }, {
              name: 'seajs',
              value: 'includeSeajs',
              checked: false
            }]
        }, {
            type: 'list',
            name: 'cssCompile',
            message: chalk.green('(9/11)', chalk.white('请你选择想要的CSS预编译语言?')),
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
        }, {
            name: 'version',
            message: chalk.green('(10/11)', chalk.white('Version')),
            default: '1.0.0',
            warning: ''
        }];

        /**
         * 日期格式化
         * @param  {Date} date new Date();
         * @param  {String} fmt  日期格式：yyyy-MM-dd hh:mm:ss
         * @return {String}      yyyy-MM-dd hh:mm:ss
         */
        function formatDate(date, fmt) { //author: meizz
            var o = {
                "M+": date.getMonth() + 1, //月份
                "d+": date.getDate(), //日
                "h+": date.getHours(), //小时
                "m+": date.getMinutes(), //分
                "s+": date.getSeconds(), //秒
                "q+": Math.floor((date.getMonth() + 3) / 3)
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        }

        this.prompt(prompts, function(props) {

            this.packageName = props.projectName; // project-name
            this.projectName = parseMojoName(this.packageName); //ProjectName
            this.author = props.author;
            this.email = props.email;
            this.groupName = props.groupName;
            this.port = props.port;
            this.version = props.version;
            this.srcDir = (/^y/i).test(props.srcDir);
            this.root = path.resolve('./');
            this.useBuild = ((/^y/i).test(props.useBuild)) ? 'gulp' : 'grunt';
            this.jquery = (/^y/i).test(props.jquery);

            // Components
            var component = this.component = props.components;
            this.includejQuery = this.hasFeature(component, 'includejQuery');
            this.includeHtml5shiv = this.hasFeature(component, 'includeHtml5shiv');
            this.includeRequirejs = this.hasFeature(component, 'includeRequirejs');
            this.includeSeajs = this.hasFeature(component, 'includeSeajs');

            // CSS Compile
            var cssCompile = this.cssCompile = props.cssCompile;
            this.cssSuffix = '.styl';
            this.includeSass = this.hasFeature(cssCompile, 'includeSass');
            this.includeStylus = this.hasFeature(cssCompile, 'includeStylus');
            this.includeLess = this.hasFeature(cssCompile, 'includeLess');
            switch (cssCompile) {
                case "includeSass":
                    this.cssCompile = "sass";
                    this.cssSuffix = ".scss";
                    break;
                case "includeStylus":
                    this.cssCompile = "stylus";
                    this.cssSuffix = ".styl";
                    break;
                case "includeLess":
                    this.cssCompile = "less";
                    this.cssSuffix = ".less";
                    break;
                default:
                    this.cssCompile = "css";
                    this.cssSuffix = ".css";
            }

            this.today = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');

            if (this.srcDir) {
                this.prompt([{
                    name: 'pagesModulesWidgets',
                    message: chalk.green('(11/11)', chalk.white('Create', chalk.red.bold('"src/page[module|widget]"'), 'directory?')),
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

        //创建MCSS
        function createCssBase(css, suffix) {
            that.template('app/'+ css +'/base' + suffix, 'src/module/base/base' + suffix);
            that.template('app/'+ css +'/layout' + suffix, 'src/module/base/layout' + suffix);
            that.template('app/'+ css +'/modules' + suffix, 'src/module/base/modules' + suffix);
        }

        if (this.srcDir) {
            this.mkdir('src');
            if (this.pagesModulesWidgets) {
                this.mkdir('src/components');
                    //this.directory('app/libs', 'src/components');
                this.mkdir('src/page');
                    this.template('app/index.html', 'src/page/index.html');
                    this.template('app/'+ this.cssCompile +'/index' + this.cssSuffix, 'src/page/index' + this.cssSuffix);
                    this.template('app/index.js', 'src/page/index.js');
                this.mkdir('src/module');
                    this.mkdir('src/module/base');
                    createCssBase(this.cssCompile, this.cssSuffix);
                    /*this.mkdir('src/module/header');
                    this.mkdir('src/module/footer');
                    this.mkdir('src/module/mod');
                    this.mkdir('src/module/box');
                    this.mkdir('src/module/list');
                    this.mkdir('src/module/tabs');*/
                this.mkdir('src/widget');
            }
        }

        this.mkdir('dist');
        this.mkdir('static');
        this.mkdir('test');
        this.mkdir('doc');
        this.template('abc.json');
        //this.log('Directories initialization done!');

    },

    git: function() {
        this.log(chalk.green('\n ✓', chalk.white('------------>>> 开始 GIT >>>--------------')));
        this.copy('git.attributes', '.gitattributes');
        this.copy('git.ignore', '.gitignore');
    },

    useBuild: function() {
        if (this.useBuild === 'gulp') {
            this.log(chalk.green('\n ✓', chalk.white('------------>>> 开始 Gulp >>>--------------')));
            this.directory('gulp/src', 'gulp');
            this.template('gulp/_Gulpfile.js', 'Gulpfile.js');
            this.template('gulp/_bower.json', 'bower.json');
            this.template('gulp/bowerrc', '.bowerrc');
            this.template('gulp/_package.json', 'package.json');
            this.template('gulp/_readme.md', 'README.md');
        } else {
            this.log(chalk.green('\n ✓', chalk.white('------------>>> 开始 Grunt >>>--------------')));
            this.directory('grunt/src', 'grunt');
            this.template('grunt/_Gruntfile.js', 'Gruntfile.js');
            this.template('grunt/_bower.json', 'bower.json');
            this.template('grunt/bowerrc', '.bowerrc');
            this.template('grunt/_package.json', 'package.json');
            this.template('grunt/_readme.md', 'README.md');
        }
    },

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
