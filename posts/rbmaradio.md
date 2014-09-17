date: 2012-07-24
title: rbmaradio.com — under the hood
linkpost: http://www.edenspiekermann.com/blog/rbma-radio-under-the-hood
---

<div>
<p>Edenspiekermann <a href="/en/blog/rbma-radio-relaunch" title="/en/blog/rbma-radio-relaunch">recently relaunched the Red Bull Music Academy Radio</a>. In this post <a href="/en/people/lukas-hodel" title="/en/people/lukas-hodel">Lukas Hodel</a> and I give you a brief overview about the technical background of <a href="http://www.rbmaradio.com/" title="http://www.rbmaradio.com/">www.rbmaradio.com</a>. We tried to write this post in a non-web-developer-should-also-understand-at-least-a-tiny-bit kind of way. In the future we will also post some more detailed what-the-hell-are-they-talking-about posts.</p>
<figure><img src="http://www.edenspiekermann.com/system/images/BAhbB1sHOgZmSSJDMjAxMi8wNy8yNC8xMS8zMC8zMC85MzkvYTc0ZmVlZDQ5ZjZkMTFlMTllNGExMjMxMzgxM2ZmYzBfNy5qcGcGOgZFVFsIOgZwOgp0aHVtYkkiCTY5NngGOwZU/a74feed49f6d11e19e4a12313813ffc0_7.jpg" rel="696x" height="696" width="696">
<figcaption>Photo by <a href="http://instagram.com/p/KsWPAuE3CR/">Marlene Schufferth</a>
</figcaption>
</figure>
<p><strong>Single Page App</strong>
</p>
<p>We wanted the player to keep playing while the user explored the site, therefore it was clear that www.rbmaradio.com had to be a so called Single Page App. Single Page Apps are the latest evolution of websites which behave much more like desktop applications.</p>
<p>To accomplish this, two technologies were crucial:<br>1. Client side HTML rendering <br>2. Client side routing.<br>Client side means directly in the user’s browser.</p>
<p><strong>Client Side HTML Rendering</strong>
</p>
<p>Most of today’s websites are rendered on the server side. This means that every time the user interacts with the website, there is a request to the server, then the server responds with a rendered HTML page. With client side rendering, many of these requests are obsolete, making the site dramatically quicker.</p>
<p><strong>Client Side Routing</strong>
</p>
<p>Since we were rendering different HTML layouts, directly in the user's browser, we had to make sure there was a possibility to navigate directly to a certain page. For example, a layout could be a whole page or just part of a page. When you browse the site, you will notice the URL changes corresponding to the current page. This makes it possible for search engines to index the website and gives you the ability to share or bookmark the page.</p>
<p><strong>It’s all about JavaScript …</strong>
</p>
<p>For a long time JavaScript had a reputation of being a dirty language. One would only use it to pimp out websites with fancy effects. </p>
<p>In modern Single Page Apps, JavaScript is not just used for adding fancy bells and whistles, it makes up the core functionality of the website. Over 50% of Red Bull Music Academy Radio relies on pure JavaScript code. As you might imagine good structured code is crucial in maintaining such an application. </p>
<p>We decided to <a href="http://weblog.bocoup.com/organizing-your-backbone-js-application-with-modules/" title="http://weblog.bocoup.com/organizing-your-backbone-js-application-with-modules/">structure the code in modules</a>. Every module has clearly defined responsibilities. The modules communicate via a <a href="http://lostechies.com/derickbailey/2012/04/03/revisiting-the-backbone-event-aggregator-lessons-learned/" title="http://lostechies.com/derickbailey/2012/04/03/revisiting-the-backbone-event-aggregator-lessons-learned/">global event bus</a>, that means they don't interact directly with each other. Doing so, we can guarantee that the app still works, even if a module is not ready yet. (“What the hell is a global event bus?” would probably be a good title for a future blog post.)</p>
<p>With this in mind, we chose the following combination of tools and frameworks:</p>
<p>- <a href="http://coffeescript.org/" title="http://coffeescript.org/">CoffeeScript</a>
<br>-&nbsp;<a href="http://backbonejs.org/" title="http://backbonejs.org/">Backbone.js</a>
<br>- <a href="https://github.com/derickbailey/backbone.marionette" title="https://github.com/derickbailey/backbone.marionette">Backbone.Marionette</a>
<br>- <a href="https://github.com/netzpirat/haml_coffee_assets" title="https://github.com/netzpirat/haml_coffee_assets">HAMLC Templates</a>
</p>
<p><strong>... and Ruby</strong>
</p>
<p>On the server side, we decided to use the web application framework <a href="http://rubyonrails.org/" title="http://rubyonrails.org/">Ruby On Rails</a>. It’s a framework programmed in the <a href="http://www.ruby-lang.org/en/" title="http://www.ruby-lang.org/en/">Ruby</a> language which got very popular in the last 6 years. We chose Ruby On Rails because of its huge community and also, in our opinion, programming in Ruby is just more fun.</p>
<p><strong>Listen to the sound of music …</strong>
</p>
<p>The most important part of a web radio is of course the music player. For this task we chose the excellent open source project <a href="http://www.schillmania.com/projects/soundmanager2/" title="http://www.schillmania.com/projects/soundmanager2/">SoundManager2</a>. What’s awesome about SoundManager2 is that it automatically switches between Flash and HTML5, making it work on many platforms and devices.</p>
<p><strong>… wherever you want</strong>
</p>
<p>Although this project makes heavy use of JavaScript, we wanted it to work in as many scenarios as possible. We live in a fast moving world where the number of web-enabled devices is permanently growing. <a href="http://gs.statcounter.com/#mobile_vs_desktop-ww-monthly-201207-201207-bar" title="http://gs.statcounter.com/#mobile_vs_desktop-ww-monthly-201207-201207-bar">Mobile already amounts to 11% of web traffic world wide</a>. For example two years ago it wasn’t even <a href="http://gs.statcounter.com/#mobile_vs_desktop-ww-monthly-201007-201007-bar" title="http://gs.statcounter.com/#mobile_vs_desktop-ww-monthly-201007-201007-bar">3%</a>. Nowadays, when creating a piece for the web you have to approach the development with this in mind. There are several strategies to tackle this problem out there.</p>
<p>For the new RBMA Radio, we decided to start with a responsive website. By the way, here at Edenspiekermann we totally back the idea of responsive web design and implement this by default when it fits the job. Instead of delivering several static layouts and experiences for a bunch of known contexts, the responsive approach tries to kill several birds with one stone – at least this is the theory. You have to make sure you rely on a solid base which you prepare for the lowest common denominator (e.g. a mobile phone). From this starting point you progressively enhance the user experience by carefully adding more and more features. During this process you have to decide which contexts get a certain feature or not, as well as define a proper way of doing this. It’s a mixture of taking control and leaving control because you can’t make decisions for unknown contexts. </p>
<p>Performance is very important – if not the key – to a truly responsive design. For example we developed a way for delivering different image sizes to different screen sizes and bandwidth capabilities, while also considering retina displays. Performance heavy features that are not necessary in every circumstance will not be used and if possible not downloaded by the browser. All of this increases the performance dramatically. </p>
<p>With progressive enhancement in mind, responsive design is pretty hard. We tried our best to deliver a solid user experience on a variety of contexts, and think we did a pretty good job. It’s really not about a website that looks pretty when you resize the browser window and it’s also not about buzz-word compliance. It’s all about responsibility, accessibility and the future of the web!</p>
</div>
