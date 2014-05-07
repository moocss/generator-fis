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

Finally, initiate the generator:

```
$ yo fis
```

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
			common
				/global.js
				/util.js
			header
				/index.js
				/index.css
				/index.html
			footer
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
```

## License

MIT
