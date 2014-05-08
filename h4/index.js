'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var FisLogo = require('../app/logo').FisLogo;
var chalk = require('chalk');

var AppGenerator = yeoman.generators.Base.extend({
    init: function() {

        this.pkg = require('../package.json');

        if (!this.options['skip-install-message']) {
            //welcome message
            this.log(FisLogo(this));
        }

        this.on('end', function() {
            this.log(chalk.green('\nDone!'));
        }.bind(this));

    },

    askFor: function() {
        var done = this.async();

        var pagesModulesWidgets = false;
        var abcJSON = {};
        try {
            abcJSON = require(path.resolve(process.cwd(), 'abc.json'));
        } catch (e) {
            console.log('abc.json Not found!\n');
            try {
                abcJSON = require(path.resolve(process.cwd(), '..', 'abc.json'));
            } catch (e) {
                try {
                    abcJSON = require(path.resolve(process.cwd(), '../../', 'abc.json'));
                    pagesModulesWidgets = path.basename(process.cwd());
                } catch (e) {
                    console.log('Do nothing!');
                    process.exit();
                }
            }
        }

        if (!abcJSON.author) {
            abcJSON.author = {
                name: '',
                email: ''
            }
        }

        if (!abcJSON.name) {
            abcJSON.name = 'tmp';
        }

        if (!abcJSON.group) {
            abcJSON.group = 'groupName';
        }

        if (!abcJSON.useBuild) {
            abcJSON.useBuild = 'gulp';
        }

        if (!abcJSON.cssCompile) {
            abcJSON.cssCompile = 'stylus';
        }

        this.pagesModulesWidgets = pagesModulesWidgets;

        var prompts = [{
                name: 'mojoName',
                message: 'Name of Page?',
                default: 'your-page-name',
                waring:''
            }
        ];

        // your-mojo-name => YourMojoName
        function parseMojoName(name) {
            return name.replace(/\b(\w)|(-\w)/g, function(m) {
                return m.toUpperCase().replace('-', '');
            });
        }

        this.prompt(prompts, function(props) {

            var _tname = props.mojoName;

            this.mojoName = this.pagesModulesWidgets ? this.pagesModulesWidgets + '/' + props.mojoName : props.mojoName;// your-mod-name

            this.modName = parseMojoName(_tname).replace(/^(~|-)/,'');//YourModName

            this.packageName = abcJSON.name; // project-name
            this.projectName = parseMojoName(this.packageName); //ProjectName
            this.cssCompile = abcJSON.cssCompile;
            this.useBuild = abcJSON.useBuild;
            this.author = abcJSON.author.name;
            this.email = abcJSON.author.email;
            this.groupName = abcJSON.groupName;
            this.version = abcJSON.version;

            done();

        }.bind(this));

    },
    files: function() {

        // 如果有page/module/widget/，就把前缀替换回来
        var mojoName = this.pagesModulesWidgets ? this.mojoName.replace(/^([^\/]+)\//i,'') : this.mojoName;
        this.mkdir(mojoName);
        this.mkdir(mojoName+'/images');
        this.template('index.html',mojoName + '/index.html');
        this.template('index.js',mojoName+'/index.js');
        this.template('index.stylus',mojoName+'/index.'+this.cssCompile);

    }
});

module.exports = AppGenerator;
