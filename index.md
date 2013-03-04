---
layout: default
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

go and create your GitHub repo now or set up one using hub

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

### \_config.yml

`_config.yml` contains site-wide configuration. It may also be used to define some defaults which Jekyll uses during generation. I recommend setting the following at least to conform with GitHubsettings. There are also [various other configuration options](https://github.com/mojombo/jekyll/wiki/configuration) you might want to study.

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

One interesting property of `_config` is the fact that you may refer to its items within templates. You can refer to these items using `{{ "{{ site.property " }}}}` kind of syntax. I will get back to this in the next section.

### \_layouts

As you might guess from the name `_layouts` contains the layout files of the project. These layouts form the literal backbone of your project. You will usually define at least some sort of a default template and perhaps a couple of auxiliary ones depending on your purposes.

If you are feeling particularly lazy and unimaginative, just pick [HTML5 Boilerplate](http://html5boilerplate.com/) and build your default layout based on that. You will need to remember to do one very important thing, however. Include a `{{ "{{ content " }}}}` tag where you want actual page content to be injected.

As mentioned in the previous section you may use `{{ "{{ site.property " }}}}` kind of syntax to refer to global properties defined at `_config.yml`. The same syntax may also be used to refer to page specific properties defined at YAML Front Matter (TODO: anchor). In this case you will simply use the following syntax: `{{ "{{ page.property " }}}}`

In case you are curious about what more can you do, explore the documentation of [Liquid](http://liquidmarkup.org/), the templating engine used here. Jekyll also provides [various extensions](https://github.com/mojombo/jekyll/wiki/Liquid-Extensions) which allow you to perform various operations. In fact we will cover one of these next.

### \_includes

The `_includes` directory will contain data which you may include to the pages of your project using specific syntax:

    {{ "{% include about.md " }}%}

As you might have noticed I decided to use `md` extension in my include. This signifies the fact that I am using [Markdown syntax](http://daringfireball.net/projects/markdown/syntax) in this particular file.

Besides HTML and Markdown also [Textile](http://redcloth.org/textile) is supported. I tend to favor Markdown due to the fact that it is used commonly on GitHub and Stack Overflow. And the syntax is quite nice once you get used to it.

### index.html

As I mentioned earlier Jekyll infers the format used based on extension. So rather than having an `index.html` it is entirely possible to write the index in say Markdown.

Regardless of your choice there is one thing you absolutely must do. You have to define something known as [YAML Front Matter](https://github.com/mojombo/jekyll/wiki/YAML-Front-Matter). This matters a lot you know!

In case of this particular page it looks like this:

{% highlight yaml %}
---
layout: default
title: About
css: index
js: index
---
{% endhighlight %}

As discussed earlier it is possible to refer to these properties at layout defined here. In this case I inject there information about page title and custom CSS and JavaScript files used. This is more of my own convention. In case either `css` or `js` is not provided I simply will not render the script reference in my layout.

It is very easy to achieve this using an `if` tag like this:

    {{ "{% if page.css " }}%}<link rel="stylesheet" href="/css/{{ "{{ page.css " }}}}.css" type="text/css" />{{ "{% endif " }}%}

Sometimes you may want to create a hierarchical site (ie. /foobar). Traditionally links such as this are created with proper directory structure and index.html files. Fortunately Jekyll provides as a handy shortcut we may use. In this case we should just create foobar.html at the project root and make its `permalink` property point at `foobar/` (permalink: foobar/).

### \_posts

Jekyll provides some utilities that make it easier to maintain a blog with it. `_posts`, as you might guess, will contain your blog posts should you want to write some. It uses a specific kind of naming scheme. Rather than making these files by hand I recommend using [jekyll-bootstrap Rakefile](https://github.com/plusjade/jekyll-bootstrap/blob/master/Rakefile) instead. Just copy that to the root of your project and investigate it.

In order to generate a blog post using it, first create `_posts` directory and after that simply run `rake post title="First Post"`. You may additionally pass date and tags parameters.

Examine the generated file and fill in the details. By default it seems to point at `post` layout and contain an extra include. You may fix both of these issues by tweaking the Rakefile a little bit.

Now that we have our post how do we refer to it? In case you did not set a category for the post, you may use the default URL scheme. Navigate to /year/month/day/first-post.html to see your mighty post. You are an official blogger now!

Okay, it is not particularly pretty yet but it still counts I guess. In case you are not happy with the URL schema, you can change it using [permalink configuration](https://github.com/mojombo/jekyll/wiki/Permalinks). It defaults to `date` but alternatively you may use either `pretty` (hides .html) or `none` if you feel like not showing the date at all.

Just having access to posts this way is not that useful. It would be very handy to be able to display existing posts somehow. As it happens there are a few ways. We can tap into Liquid Templating like this for instance:

    {{ "{% for post in site.posts offset: 0 limit: 10 " }}%}
        <h2><a href="{{ "{{ site.prefix " }}}}{{ "{{ post.url " }}}}">{{ "{{ post.title " }}}}</a></h2>
        {{ "{{ post.date | date_to_string " }}}}
        {{ "{{ post.content " }}}}
        <hr />
    {{ "{% endfor " }}%}

As this might not be enough always, we can also tap into [pagination](https://github.com/mojombo/jekyll/wiki/Pagination).

If we want to show a blog archive, we can do something along this:

    <ul>
    {{ "{% for post in site.posts " }}%}
        <li><div class="date">{{ "{{ post.date | date_to_string " }}}}</div><a href="{{ "{{ site.prefix  " }}}}{{ "{{ post.url " }}}}">{{ "{{ post.title " }}}}</a></li>
    {{ "{% endfor " }}%}
    </ul>

Sometimes we might have been an active blogger already and could have some content we would like to migrate to Jekyll for a reason or another. There are [various migration scripts](https://github.com/mojombo/jekyll/wiki/Blog-Migrations) available that help in this particular task.

To make it easier for your readers to consume your blog you might want to provide a syndication feed. I have set up [an example of Atom](https://github.com/bebraw/geekcollision-site/blob/master/atom.xml).

And if you just want to blog and rather not care about the technical details, look into [Octopress](http://octopress.org/), a blogging framework built on top of Jekyll. It takes care of the boilerplate needed. After that you just have to come up with the content (the easy part).

### \_site

This directory contains Jekyll output. Usually you will want to exclude this directory from your revision control. In case of Git just include it at your [.gitignore](https://www.kernel.org/pub/software/scm/git/docs/gitignore.html).

In case you want to understand better how Jekyll works investigate the output with care.

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
