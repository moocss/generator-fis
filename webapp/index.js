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
                '\nAfter running ' + chalk.yellow.bold('npm install & bower install');

            if (this.options['skip-install']) {
                console.log(howToInstall);
                return;
            }

            this.installDependencies({
                skipMessage: this.options['skip-install-message'],
                skipInstall: this.options['skip-install'],
                callback: function() {

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

        //this.log(path.resolve(process.cwd(), 'abc.json'));

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
            message: chalk.green('(1/7)', chalk.white('Name of Project?')),
            default: folderName,
            warning: ''
        }, {
            name: 'author',
            message: chalk.green('(2/7)', chalk.white('Author Name')),
            default: abcJSON.author.name,
            validate: function(val) {
                return val.length > 0 ? true : '你必须输入一个昵称！'
            },
            warning: ''
        }, {
            name: 'email',
            message: chalk.green('(3/7)', chalk.white('Author Email')),
            default: abcJSON.author.email,
            validate: function(val) {
                return validator.isEmail(val) ? true : '你必须输入一个邮箱地址！';
            },
            warning: ''
        }, {
            name: 'groupName',
            message: chalk.green('(4/7)', chalk.white('Group Name')),
            default: 'fued',
            warning: ''
        }, {
            name: 'useBuild',
            message: chalk.green('(5/7)', chalk.white('Would you like to use Gulp(Y) or Grunt(n)?')),
            default: 'Y/n',
            warning: ''
        }, {
            type: 'list',
            name: 'cssCompile',
            message: chalk.green('(6/7)', chalk.white('请你选择CSS预编译语言?')),
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
        },  {
            name: 'version',
            message: chalk.green('(7/7)', chalk.white('Version')),
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
            this.version = props.version;
            this.useBuild = ((/^y/i).test(props.useBuild)) ? 'gulp' : 'grunt';

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

            this.today = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');

            done();

        }.bind(this));
    },

    app: function() {
        this.log(chalk.green(' ✓', chalk.white('------------>>> 开始 App >>>--------------')));
        this.mkdir('app');
        this.mkdir('app/js');
    if (this.includeSass) {
        this.directory('app/sass', 'app/sass');
    } else if (this.includeStylus) {
        this.directory('app/stylus', 'app/stylus');
    } else if (this.includeLess) {
        this.directory('app/less', 'app/less');
    }else {
        this.directory('app/css', 'app/css');
    }
        this.mkdir('app/img');
        //this.mkdir('dist');
        //this.mkdir('test');
        this.template('app/index.html');
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
            this.template('gulp/_package.json', 'package.json');
            this.template('gulp/_readme.md', 'README.md');
        } else {
            this.log(chalk.green('\n ✓', chalk.white('------------>>> 开始 Grunt >>>--------------')));
            this.directory('grunt/src', 'grunt');
            this.template('grunt/_Gruntfile.js', 'Gruntfile.js');
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
