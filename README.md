# generator-fis [![Build Status](https://secure.travis-ci.org/moocss/generator-fis.png?branch=master)](https://travis-ci.org/moocss/generator-fis)

A FIS generator for [Yeoman](http://yeoman.io)


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-fis from npm, run:

```
$ npm install -g generator-fis
```
Make a new directory and `cd` into it:
```
mkdir my-new-project && cd $_
```
Finally, initiate the generator:

```
$ yo fis
```

Available generators:

- fis              初始化一个 Project
- fis:h            显示帮助
- fis:h5           生成一个HTML5页面模板
- fis:h4           生成一个HTML4页面模板
- fis:webapp       生成一个完整的网站模板
- fis:module       初始化一个模块单元
- fis:page         生成一个Page
- fis:widget       创建标准的组件
        Example:   fis:widget 1.0.0

### Typical workflow

```
yo fis #初始化一个 Project
yo fis:page     生成一个Page
gulp            构建项目
gulp styles		css的检测、压缩和合并
gulp scripts    js的检测、压缩和合并
gulp html
gulp images		图片压缩和图片精灵
gulp clean		清除 tmp 和 dist 目录内容
gulp wiredep	Inject bower components
gulp build		处理html、css、js等
gulp watch		自动监听文件的改变和F5刷新
gulp publish    发布项目

```

### Options

* `--appPath`

  Generate scaffold into a custom directory.

* `--requirejs`

  Generate scaffolds using RequireJS (AMD) Loader. By default check if project uses RequireJS.

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after
  scaffolding has finished.

* `--skip-install-message`

   welcome message

* `--test-framework=[framework]`

  Defaults to `mocha`. Can be switched for
  another supported testing framework like `jasmine`.


### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).

## 项目目录规范
```
site
	src
	    components  //来自网络的bower_components
		page //模板文件目录
		module //页面模块,增进页面结构(模板组件,CSS组件)
		    base
		    	/rest.css
		    	/common.css
		    	/grid.css
				/global.js
				/base.css
				/util.js
			header
				/index.js
				/index.css
				/index.html
			footer
			content
			sidebar
			main-content
			nav
			menu
			...

		widget // JS组件
			dialog
				1.0.0
					src
						/*.js
						/*css
					demo
						/index.html
					test
					plugin (待定)
				1.0.1
				1.0.2
				...
	doc
	dist
	    components
		proj-name
			1.0.0
				images
					icon
					_res
					/sp.png
				js
					libs
					/global.js
				css
					/base.css
					/page.css
					/page-proj.css
				index.html
				page.html
			1.0.1
			1.0.2
			...
		...
	static
		*.jpg
		*.png
	test

webapp
	app
	    js
	    scss | stylus | less | css
	    img
	    index.html
    dist
        js
        css
        img
        index.html
```

## License

MIT
