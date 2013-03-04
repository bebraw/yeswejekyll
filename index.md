---
layout: base
title: About
css: index
js: index
---

# About

{% include about.md %}

## License

{% include license.md %}

## Getting Started

It is actually very easy to get started with Jekyll once you have managed to install it initially. Pretty much all you need to do is to invoke command `jekyll` and it will generate a `_site` directory for you.

> I will assume that you understand the basics of [Git](http://gitscm.org/) and terminal. In case you do not, I recommend learning very basics at least. Or you can just learn the tools as you go. It is up to you.

### Starting a Project

Unfortunately Jekyll does not come with an easy way to initialize project. Fortunately it is very easy to set one up. You could for instance clone [jekyll-bootstrap](http://jekyllbootstrap.com/) repository or even [the one that this site uses](https://github.com/bebraw/yeswejekyll). The basic workflow for initializing a project goes like this:

{% highlight bash %}
$ git clone https://github.com/plusjade/jekyll-bootstrap.git <target>
$ cd <target>
<go and create your GitHub repo now or set up one using hub>
$ git remote add origin <repo address>
$ git push origin master
{% endhighlight %}

Alternatively you could just do `git init` in some directory and start from nothing. You can build a project quite easily even this way given you know how Jekyll expects projects to be structured.

## Project Structure

According to the [official documentation](https://github.com/mojombo/jekyll/wiki/Usage) a Jekyll project usually looks like this:

    .
    |-- _config.yml
    |-- _includes
    |-- _layouts
    |   |-- default.html
    |   `-- post.html
    |-- _posts
    |   |-- 2007-10-29-why-every-programmer-should-play-nethack.textile
    |   `-- 2009-04-26-barcamp-boston-4-roundup.textile
    |-- _site
    `-- index.html

In addition it is a good idea to define a `.gitignore` that contains that `_site` directory. Usually it is something you do not want to version.

### _config.yml

`_config.yml` contains site-wide configuration. It may also be used to define some defaults which Jekyll uses during generation. I recommend setting the following at least to conform with GitHubsettings:

{% highlight yaml %}
port: 4000
auto: true
safe: true
server: true
pygments: true
{% endhighlight %}

This setup makes the default `jekyll` command run a development server that generates the website as you alter files. In practice this is very useful. You might want to tweak the server `port` and `pygments` flag based on your needs.

> I highly recommend setting up [LiveReload](http://livereload.com/) or a similar tool in order to eliminate the need to refresh the browser manual during development. I will get back to this when discussing advanced tricks. TODO: anchor

[Pygments](http://pygments.org/) is a very popular highlighting generator. You simply just need to use the `highlight` tag within your source. I will get into this back later when I discuss syntax. TODO: anchor

One interesting property of `_config` is the fact that you may refer to its items within templates. I will get back implications of this later at... TODO: anchor

### _includes

TBD

### _layouts

TBD

### _posts

TBD

### _site

TBD

### index.html

TBD

## Understanding YAML Front Matter

TBD

## Understanding Templating

TODO: site-wide configuration

Markdown, [pygments tag](http://stackoverflow.com/questions/13464590/github-flavored-markdown-and-pygments-highlighting-in-jekyll)

## Advanced Tricks

TBD

## Styling

TBD. Go through basics of Foundation.

### Setting Up Grunt

TBD

### Setting Up Twitter Feeds

TBD

### Setting Up Commenting

TBD

### Setting Up RSS

## Conclusion
