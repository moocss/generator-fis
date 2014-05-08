'use strict';
var fs = require('fs');
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var FisLogo = require('../app/logo').FisLogo;
var chalk = require('chalk');
var validator = require('validator');

var AppGenerator = yeoman.generators.Base.extend({
    init: function() {

        this.pkg = require('../package.json');

        //库地址
        this.reposName = path.basename(process.cwd());

        if (!(this.reposName === 'widget')) {
            this.log('请切换到此 '+ chalk.red('widget') +' 目录下进行创建活动...');
            
        }

        if (!this.options['skip-install-message']) {
            //welcome message
            this.log(FisLogo(this));
        }

        this.on('end', function() {
            if (!this.options['skip-install']) {
                this.installDependencies();
                console.log("组件目录和文件初始化完成！");
                console.log("\n打包组件运行：gulp\n");
            }
        });
    },

    askFor: function() {
        var done = this.async();

        if (fs.existsSync('abc.json')) {
            this.abcJSON = JSON.parse(this.readFileAsString('abc.json'));
        } else {
            this.abcJSON = {}
        }

        var author = {
            name: '',
            email: ''
        };

        if (this.abcJSON && this.abcJSON.author) {
            var abcAuthor = this.abcJSON.author;
            author.name = abcAuthor.name || '';
            author.email = abcAuthor.email || '';
        }

        var prompts = [{
            name: 'comName',
            message: chalk.white('Name of Component?'),
            default: this.abcJSON.name,
            validate: function(val) {
                return val.length > 0 ? true : '你必须给组件取个名称！'
            },
            warning: ''
        }, {
            name: 'author',
            message: 'author of component',
            default: author.name,
            validate: function(val) {
                return val.length > 0 ? true : '你必须输入一个昵称！'
            },
            warning: ''
        }, {
            name: 'email',
            message: 'email of author',
            default: author.email,
            validate: function(val) {
                return validator.isEmail(val) ? true : '你必须输入一个邮箱地址！';
            },
            warning: ''
        }, {
            name: 'tag',
            message: 'tag of component',
            warning: ''
        }, {
            name: 'githubName',
            message: 'user name of github',
            warning: ''
        }, {
            name: 'version',
            message: 'version?',
            default: '1.0.0',
            warning: ''
        }];

        this.prompt(prompts, function(props) {
            //组件名称
            this.comName = props.comName;
            this.author = props.author;
            this.email = props.email;
            this.tag = props.tag;
            this.githubName = props.githubName;
            this.version = props.version;

            done();

        }.bind(this));
    },
    app: function() {
        this.log(chalk.green(' ✓', chalk.white('------------>>> 开始 生成组件模板 >>>--------------')));
        if (this.reposName === 'widget') {
            this.mkdir(this.comName);
            var rootDir = this.comName + '/' + this.version;
            this.mkdir(rootDir);
            var fold = ['src', 'dist', 'demo', 'plugin', 'test', 'assets'];
            for (var i = 0; i < fold.length; i++) {
                this.mkdir(path.join(rootDir, fold[i]));
            }
        }

    },
    files: function() {
        if (this.reposName === 'widget') {
            this.template('_Gulpfile.js', this.comName + '/Gulpfile.js');
            this.template('_package.json', this.comName + '/package.json');
            this.template('_readme.md', this.comName + '/README.md');
            this.template('abc.json', this.comName + '/abc.json');
        }
    }
});

module.exports = AppGenerator;
