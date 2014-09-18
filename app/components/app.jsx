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
var NotFoundPage = require('./pages/notFound');


var App = React.createClass({

  propTypes: {state: React.PropTypes.object.isRequired},

  render: function() {
    var posts = this.props.state.posts;
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>Jonathan Krause @jonykrause, Front–end developer</title>
          <meta name="description" content="Jonathan Krause, Front-end Developer" />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="Jonathan Krause @jonykrause" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="keywords" content="༼☉ɷ⊙༽" />
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
          <NotFound handler={NotFoundPage} />
        </Pages>
      </html>
    );
  }
});


module.exports = App;
