---
layout: default
js: index
---

## About

<div class="right picture">
    <img src="images/jekyll.jpg" alt="Mr. Jekyll"/>
    <p class="caption">Mr. Jekyll by <a href="http://www.flickr.com/photos/95492938@N00/3568446372/">Kaptain Kobold</a><br/> (CC BY-NC-SA)</p>
</div>

{% include about.md %}

## License

{% include license.md %}

## Getting Started

<div class="right picture">
    <img src="images/hyde.jpg" alt="Mr. Hyde"/>
    <p class="caption">Mr. Hyde by <a href="http://www.flickr.com/photos/46952347@N00/919710334/">Luis Carlos Araujo</a><br/> (CC BY-NC-ND)</p>
</div>

It is actually very easy to get started with Jekyll once you have managed to install it initially. Pretty much all you need to do is to invoke command `jekyll` and it will generate a `_site` directory for you.

> I will assume that you understand the basics of [Git](http://gitscm.org/) and terminal. In case you do not, I recommend learning very basics at least. Or you can just learn the tools as you go. It is up to you.

### Starting a Project

Unfortunately Jekyll does not come with an easy way to initialize project. As it happens it is very easy to set one up. You could for instance clone [jekyll-bootstrap](http://jekyllbootstrap.com/) repository or even [the one that this site uses](https://github.com/bebraw/yeswejekyll). The basic workflow for initializing a project based on some other goes like this:

{% highlight bash %}
$ git clone git://github.com/bebraw/yeswejekyll.git <target>
$ cd <target>
$ rm -rf .git
$ git init
$ git add .
$ git commit

go and create setup a project at GitHub

$ git remote add origin <repo address>
$ git push origin master
{% endhighlight %}

> If you are a lazy bum like me, consider using [hub](http://defunkt.io/hub/). It integrates well to Git and provides some GitHub related shortcuts. You can clone a repo by simply using `git clone username/project` syntax or create a new one with `git create -d "description"`.

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

Of these options I would like to mention `exclude` in particular. As you might guess that allows you to exclude files and directories from the Jekyll build. Examine that generated `_site` directory as it will give you a better idea of what is included there and what is not.

{% highlight yaml %}
port: 4000
auto: true
safe: true
server: true
pygments: true
{% endhighlight %}

This setup makes the default `jekyll` command run a development server that generates the website as you alter files. In practice this is very useful. You might want to tweak the server `port` and `pygments` flag based on your needs.

> I highly recommend setting up [LiveReload](http://livereload.com/) or a similar tool in order to eliminate the need to refresh the browser manual during development.

One interesting property of `_config` is the fact that you may refer to its items within templates. You can refer to these items using `{{ "{{ site.property " }}}}` kind of syntax. I will get back to this in the next section.

### \_layouts

As you might guess from the name `_layouts` contains the layout files of the project. These layouts form the literal backbone of your project. You will usually define at least some sort of a default template and perhaps a couple of auxiliary ones depending on your purposes.

If you are feeling particularly lazy and unimaginative, just pick [HTML5 Boilerplate](http://html5boilerplate.com/) and build your default layout based on that. You will need to remember to do one very important thing, however. Include a `{{ "{{ content " }}}}` tag where you want actual page content to be injected.

As mentioned in the previous section you may use `{{ "{{ site.property " }}}}` kind of syntax to refer to global properties defined at `_config.yml`. The same syntax may also be used to refer to page specific properties defined at YAML Front Matter. In this case you will simply use the following syntax: `{{ "{{ page.property " }}}}`

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

{% highlight html %}
{{ "{% for post in site.posts offset: 0 limit: 10 " }}%}
    <h2>
        <a href="{{ "{{ site.prefix " }}}}{{ "{{ post.url " }}}}">{{ "{{ post.title " }}}}</a>
    </h2>
    {{ "{{ post.date | date_to_string " }}}}
    {{ "{{ post.content " }}}}
    <hr />
{{ "{% endfor " }}%}
{% endhighlight %}

As this might not be enough always, we can also tap into [pagination](https://github.com/mojombo/jekyll/wiki/Pagination).

If we want to show a blog archive, we can do something along this:


{% highlight html %}
<ul>
{{ "{% for post in site.posts " }}%}
    <li>
        <div class="date">{{ "{{ post.date | date_to_string " }}}}</div>
        <a href="{{ "{{ site.prefix  " }}}}{{ "{{ post.url " }}}}">{{ "{{ post.title " }}}}</a>
    </li>
{{ "{% endfor " }}%}
</ul>
{% endhighlight %}

Sometimes we might have been an active blogger already and could have some content we would like to migrate to Jekyll for a reason or another. There are [various migration scripts](https://github.com/mojombo/jekyll/wiki/Blog-Migrations) available that help in this particular task.

To make it easier for your readers to consume your blog you might want to provide a syndication feed. I have set up [an example of Atom](https://github.com/bebraw/geekcollision-site/blob/master/atom.xml).

And if you just want to blog and rather not care about the technical details, look into [Octopress](http://octopress.org/), a blogging framework built on top of Jekyll. It takes care of the boilerplate needed. After that you just have to come up with the content (the easy part).

### \_site

This directory contains Jekyll output. Usually you will want to exclude this directory from your revision control. In case of Git just include it at your [.gitignore](https://www.kernel.org/pub/software/scm/git/docs/gitignore.html).

In case you want to understand better how Jekyll works investigate the output with care.

## Hosting

Hosting Jekyll sites is surprisingly easy. Pretty much all you need to do is to get that `_site` directory data and make it available on some server of yours. As hinted earlier in the introduction [GitHub Pages](https://pages.github.com) provides native support for it so that is definitely an option too, especially if you do not happen to have a server of your own available.

There are some limitations as you cannot use Jekyll plugins [without some hackery](http://charliepark.org/jekyll-with-plugins/) by default. In this case you just host the generated files on GitHub rather than let it compile the output for you.

In case you are happy with the default workflow, I recommend setting up a little script to help you with that. GitHub expects that your site exists within `gh-pages` branch. If you have dealt with branches in Git before you know it is very easy to set up. I like to replicate my `master` branch to `gh-pages`. The basic command for this is `git push origin master:gh-pages`. If the branch does not exist yet, it will create it for you.

I usually maintain a little utility script like this within my repositories to deal with pushing the data:

{% highlight bash %}
#!/bin/bash
cd "$(dirname "$0")"
git push
git push origin master:gh-pages
git push --tags
{% endhighlight %}

That `cd` bit there just makes sure I am executing the commands at the right directory and you might not need it depending on your needs.

Besides GitHub it may be interesting to host your site on [Heroku](http://www.garron.me/blog/deploy-host-jekyll-static-site-free-heroku.html) or [Amazon S3](http://vvv.tobiassjosten.net/development/jekyll-blog-on-amazon-s3-and-cloudfront/). Or you could set up a local proxy server that points to GitHub or any of these services. Oh, the possibilities. You may turn a simple matter of hosting into a complex problem if you really want to just like a good engineer should.

## Case Study - Koodilehto Site

<img class="right" src="images/koodilehto.png" alt="Koodilehto site"/>

[Koodilehto](http://koodilehto.fi/) is an IT co-operative located in Jyväskylä. It is a site I built primarily myself although others contributed some bits and pieces and of course valuable feedback. Further feedback was gained through [criticue](http://criticue.com/) and [Feedback Roulette](http://feedbackroulette.com/). This helped to refine the visual look of the site further.

Besides Jekyll the site uses [Bootstrap](http://twitter.github.com/bootstrap/) for styling and some bits of JavaScript for certain more interactive portions of the site. These include RSS and Twitter widgets and the display logic at the "professionals" page.

[RequireJS](http://requirejs.org/) is used for managing the JavaScript. At the moment no optimized build is used although that would likely be a nice optimization. The site seems quite fast enough even without this.

Even though the site is not that large it still highlights some problems of Jekyll you should be aware of. For instance building the navigation tree was not entirely trivial and took some nasty conditional logic. I believe it is possible to work around this issue by using some suitable plugin, though. In that case you cannot use GitHub hosting "as is".

In case you want to see how the site has evolved, study [the article on its history](http://koodilehto.fi/projects/koodilehto/) and the [source tree](https://github.com/koodilehto/koodilehto-site).

## Strengths and Weaknesses of Jekyll

For certain kind of projects a combination of Jekyll and GitHub Pages for hosting is just great. If you need interactivity you can likely add that using some JavaScript. Blogs, as discussed earlier, are a good fit for Jekyll. Same goes for simple sites such as Koodilehto we just briefly went through.

### Jekyll vs. WordPress

Compared to a full-fledged blogging platform such as [WordPress](http://wordpress.com/) there are certain nice advantages. This combination has a developer friendly Git driven workflow. In addition it is more secure by default as the possible attack surface is smaller. You certainly do not have to worry about updating your server. In this case we outsource this to the GitHub guys anyhow. It is also very easy to host a static site. You can literally put it anywhere with a minimal configuration.

In certain respects WordPress may be the superior choice. It is definitely more friendly for a less technical user. And there is a huge community around it. You are bound to find many cool plugins to improve your WordPress experience. But, as I said, with great power comes great responsibility. That of security in this case.

### Weaknesses

The design of Jekyll starts to break apart in certain scenarios. As I mentioned earlier building complex information architecture can become quite hard. The markup schemes it supports are not adequate always.

It is certainly nice that you may use Markdown for content and HTML for layouts for instance. The thing is sometimes you might want to attach some classifiers to your content. This type of work is common when you want to set up some hooks for your JavaScript code. The current architecture of Jekyll literally forces you to use HTML in this case.

Plugins can alleviate this problem a little bit by allowing you to include Markdown in a HTML document. For some reason that is not possible by default. It is possible to to use HTML in Markdown documents but alas it is not allowed to use Markdown inside HTML again. This can be a real problem.

I know these must be just some corner cases I have been running into. That said if you want to do something more complex than a simple site or blog, do consider alternatives or Jekyll bolstered with a collection of plugins.

## From Meek to Neat

If you have followed this document so far you have likely gotten something together. It is likely pretty ugly but functional. Now it is time to turn your site into a masterpiece or at least less of a mess.

### Developing Foundation

[Zurb Foundation](http://foundation.zurb.com/) is an alternative to the hugely popular [Twitter Bootstrap](http://twitter.github.com/bootstrap/). Since I always like to bet on the underdog I am going to show you how to integrate Foundation to your project and make sure it has been built on a strong foundation (ehehe).

Download the vanilla version of Foundation from their site and unzip it somewhere. You should find two folders, css and js, inside it. Copy those to your project.

> If you are feeling frisky, try and open that `index.html` included in the Foundation package. You should be able to see some very basic demos there and get an idea of what sort of markup it uses.

As it is easier to copy and paste than come up with some original, pick some [premade layout](http://foundation.zurb.com/templates.php). I kind of like the look of the Blog one so I will pick that. You go and pick whatever you like.

Once you have finished the arduous operation tap yourself on back for me. There you go! Before moving on remember to include that {{ "{{ content " }}}} tag to the page somewhere. One more thing. Remember to add the following at your `head` (not the real one preferably):

{% highlight html %}
<link rel="stylesheet" href="css/normalize.css">
<link rel="stylesheet" href="css/foundation.css">
{% endhighlight %}

That `normalize` bit is there to eliminate certain browser differences. By default they tend to have the weirdest settings in place so it is better to get rid of those once and for all. Let us all be normal, right? The latter line should be obvious by now. There is also a minified version available. It has been named aptly as `foundation.min.css`. How come the name is longer then? I guess I will never know.

It is quite possible your site still needs a little bit of tweaking. After all you do not want to end up suffering from the Bootstrap syndrome although that should be technically impossible given we are using Foundation here. Your next obvious step lies within [Foundation Documentation](http://foundation.zurb.com/docs/).

### Picking a Color Scheme

Color design is one of those tricky parts. Given I am a boring person I decided to to grayscale scheme and then build some textures on top of that. You might want to use a tool such as [Color Scheme Designer](http://colorschemedesigner.com/) to figure out what kind of a scheme you want to use. You will likely find [HTML_CodeSniffer](http://squizlabs.github.com/HTML_CodeSniffer/) useful for checking contrast ratios.

There are various [other tools](http://webdesignledger.com/tools/10-super-useful-tools-for-choosing-the-right-color-palette) available as well. I personally do not use these tools a lot but rather just fiddle around with Chrome Inspector till it looks acceptable enough. I try to avoid too bright colors and think in terms of visual hierarchy. Colors can help you to define what is important and what is not. This way they guide the way the users perceive the site and ultimately use it.

If you cannot find anything that works particularly well, just stick to tried and true white (perhaps toned down a bit) and some darker color(s) to complement it. Generally it is a good idea to avoid absolutes and break them down a bit. So rather than having #000 (black) try #111 or #222 to see what kind of difference it makes visually. It is not much but it is still something and one of those things that sets your design apart. Once you have enough of these little things right it starts to count.

As large areas of pure color may look a bit distracting, although this is more of a matter of taste, I tend to use some subtle textures to get rid of this problem. It is very helpful to decide upon a color scheme before moving onto texturing, though. The colors work as a basis for your design and the textures give it some oomph it needs.

### Designing Visual Hierarchy

I think this is one of those bits of design that often gets neglected. It is very important to have a good idea of what is important on a page and what is not. This allows you to make some clear decisions. For instance in this guide I decided that the TOC should not command too much attention. As a result I decided to add a little opacity trick to it on desktop. Hover your cursor on it to see what I mean.

Headlines, selection of fonts, textures, subtle details and even positioning are important parts of a visual hierarchy. These tools allow you to guide the attention of your reader. Sometimes you might even want to be a bit *bold* at your decisions. Whatever is your goal.

### Picking Subtle Textures

I guess this is one of those things that kind of divide people. Some like to use more grungy textures. Generally I try to stick with something very subtle. I am certain you can achieve a good design in many ways. In this case I will show you how to complement your design with [Subtle Patterns](http://subtlepatterns.com/).

`Subtle Patterns` is a collection of, well, subtle patterns. In effect these are very light yet still noticeable textures that are tileable. This makes them excellent for background usage.

Given I am a Chrome guy I like to use [Subtle Patterns Chrome Extension](https://github.com/overra/Subtle-Patterns-Chrome-Extension) for trying out the textures. This provides a nice and fun way to browse through their selection. After that you just need to extract the URL using Inspector, download the image and attach it to your project.

> In case you want to see what difference it makes, <a href="#" class="togglePatterns">you can toggle patterns on this page</a>.

### Picking Photos and Imagery

Another thing that can make a difference is the usage of stock footage. If you are just fooling around, you might want to try something like [lorempixel](http://lorempixel.com/) or [placekitten](http://placekitten.com/). Those give you a nice little syntax you may use to generate images on your site. This is particularly useful in the prototyping phase.

Once things start to get more serious you will likely want to move onto something else and pick imagery based on context. I like to [compfight](http://compfight.com/) for this purpose. It uses Flickr as its backend but provides a lot saner interface than what they have over there.

All you need to do is to make sure it is set to `Creative Commons` and attribute properly. Sometimes the licensing might constrain commercial usage so keep that in mind when looking for photos. There are times when you will come by a cool photos that have been licensed this way. It may very well be able to negotiate some kind of a licensing deal with the author. Sometimes they will just give you the permission for extra visibility.

Of course in ideal case you have some imagery of your own available or you happen to know some photographer. There is a lot of footage out there if you just know where to look for it.

### Adding Subtle Details

If there is one more thing you can do, it is to work on that subtle layer I have been rambling about. You could for instance add a hint of [rounded corners](http://www.css3.info/preview/rounded-border/) in certain places. Or you could try to add a bit of [box shadow](http://css3gen.com/box-shadow/) in some suitable place.

You could also experiment with various border styles. Sometimes all it takes is one border at a right place to make a design more interesting.

### Picking Fonts

As I am not much of a font expert and can just about separate 'serif' from 'sans-serif' and I know those two have nothing to do with sheriffs I usually stick to just two fonts on my design. The other will be used for headers while the other is used for the rest of the site. In this case [pairing the fonts](http://webdesign.tutsplus.com/articles/typography-articles/a-beginners-guide-to-pairing-fonts/) is essential. To get a better idea check out these [existing combos](http://designshack.net/articles/css/10-great-google-font-combinations-you-can-copy/).

If you know what you are doing using more than two is probably alright. If you still do not know the difference between a `font` and a `typeface` I would not bother. And if you do not know what `kerning` is, well, there is [a game for that](http://type.method.ac/).

> To make finding the right fonts easier there is a nice [Chrome extension](https://chrome.google.com/webstore/detail/google-font-previewer-for/engndlnldodigdjamndkplafgmkkencc?hl=en) for that. Consider using it.

In case you want to know more about [Google Web Fonts](http://www.google.com/webfonts) I suggest checking out their [tutorial](https://developers.google.com/webfonts/docs/getting_started) on the subject. If there is one thing I really must make clear it is the fact that you absolutely must set `font-weight` property to make the output look the same across browsers. Miss that and you might end up with something weird in some other browser rather than the one you are currently using.

### Testing Your Design

How do you know you ended up with a good design? The chances are that you did not. Even experienced designers become blind to the faults at their designs at some point. As we saw in the case of Koodilehto site it can take quite a few iterations to end up with something that does not look entirely like crud. And even if the site looked just fine it can still be useless if the content is not up to it.

As hinted at the case study there are services such as [criticue](http://criticue.com/) and [Feedback Roulette](http://feedbackroulette.com/) that may be beneficial. Of course ideally you will be able to test your design with your target group instead of random people. In fact knowing who you are designing for can open up a few knots and help with the content part. It is much easier to design when you know who is it for.

In case your site has enough traffic volume you could consider AB testing. Effectively AB testing comes down to a simple question: this or that? There are services such as [Optimizely](https://www.optimizely.com/) that provide an easy to use interface for designing these sort of tests and deriving useful metrics out of them. If you are more code oriented person, you might find something like [ABalytics](https://github.com/danmaz74/ABalytics) useful. It integrates well with [Google Analytics](http://www.google.com/analytics/) so you can see the results of your test variants there.

I highly recommend looking into testing your design. Just having something that looks subjectively speaking good is not often enough. You will need some data to back that hunch up. That is where concepts such as AB testing or web analytics in general come in handy.

#### Setting Up Analytics

Getting [Google Analytics](http://www.google.com/analytics/) to work on your project is fairly simple. You just need to include their snippet on your default template and off you go. I have instrumented it that way in this project that you just have to set their identifier at `_config.yml` to get it to work.

So in case you are using this project as your template, do that and you have got analytics on your site.

### Syntax Highlighting with Pygments

One of the coolest features of Jekyll for me is the fact that it supports [Pygments](http://pygments.org/). It is a Python based code highlighter. I have used it in this little guide even. You will need to complement its output using some [pygments-css](https://github.com/richleland/pygments-css). In this case I have stuck with `github.css` as it seems to fit the overall theme and it is hard to go wrong with that.

The basic syntax of it is very simple. You simply use {{ "{% highlight language " }}%} and {{ "{% endhighlight " }}%} tags and stash the content to be highlighted between those two. You may even enable line numbers like this: {{ "{% highlight language linenum " }}%}.

### Additional Resources

Internet is full of nice design related resources. I have tried to list a few of these below:

* [Learn CSS Layout](http://learnlayout.com/) - Suitable particularly for beginners. There are some nice tips for seasoned pros as well.
* [Responsive Design Bookmarklet](http://responsive.victorcoulon.fr/)
* [Design Course for Hackers](http://hackdesign.org/) - If you come from a programming background, check this out.
* [Method of Action](http://method.ac/) - Design for analytical minds.

## Conclusion

Jekyll provides a straight-forward way to develop websites. It might not be flawless but combined with hosting possibilities we covered it is a very affordable way to build them. I hope you picked up a few more general tips out of this brief guide. Regardless of the platform web design is always difficult and has its constraints.

In case you feel this guide is missing something or you have discovered a bug, let me know at the [issue tracker](https://github.com/bebraw/yeswejekyll/issues). If you found this guide worth your while, I would appreciate a tweet or even a small donation for my time. You can find the buttons over at TOC over there. Thanks!
