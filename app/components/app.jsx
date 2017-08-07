/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactRouter = require('react-router-component');
var Pages = ReactRouter.Pages;
var Page = ReactRouter.Page;
var NotFound = ReactRouter.NotFound;

// Pages
var Home = require('./pages/home');
var About = require('./pages/about');
var Posts = require('./pages/posts');
var Post = require('./pages/post');
var Vita = require('./pages/vita');
var NotFoundPage = require('./pages/notFound');


var App = React.createClass({

  propTypes: {state: React.PropTypes.object.isRequired},

  getTitleFromPath: function(path) {
    var page = path.split('/').pop().replace(new RegExp('[-]', 'g'), ' ');
    return page.length ? page.charAt(0).toUpperCase() + page.slice(1) + ' /' : '';
  },

  render: function() {
    var title = this.getTitleFromPath(this.props.path)
    var posts = this.props.state.posts;
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>{title} Jonathan Krause @jonykrause, Front-end Software Engineer</title>
          <meta name="description" content="Jonathan Krause @jonykrause, Front-end Software Engineer" />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="Jonathan Krause @jonykrause" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="keywords" content="\_(ツ)_/¯" />

          <meta itemProp="name" content={`${title} Jonathan Krause @jonykrause, Front-end Software Engineer`} />
          <meta itemProp="description" content="Jonathan Krause @jonykrause, Front-end Software Engineer" />

          <meta property="og:title" content="Jonathan Krause" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="http://jonykrau.se" />
          <meta property="og:image" content="http://jonykrau.se/img/jony.jpg" />
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="og:image:width" content="1000" />
          <meta property="og:image:height" content="1000" />
          <meta property="og:description" content="Jonathan Krause @jonykrause, Front-end Software Engineer" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@jonykrause" />
          <meta name="twitter:creator" content="@jonykrause" />

          <link type="text/plain" rel="author" href="/humans.txt" />
          <link rel="icon" href="/favicon.ico" />
          <link href="/rss.xml" type="application/rss+xml" rel="alternate" />
          <link rel="stylesheet" href="/css/bundle.css" />
        </head>
        <Pages className="page" path={this.props.path}>
          <Page path="/" handler={Home} posts={posts} />
          <Page path="/posts" handler={Posts} posts={posts} />
          <Page path="/posts/:slug" handler={Post} posts={posts} />
          <Page path="/about" handler={About} />
          <Page path="/cv" handler={Vita} />
          <NotFound handler={NotFoundPage} />
        </Pages>
      </html>
    );
  }
});


module.exports = App;
