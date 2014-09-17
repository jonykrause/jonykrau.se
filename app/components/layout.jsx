/**
 * @jsx React.DOM
 */

var React = require('react');
var Header = require('./partials/header');
var Footer = require('./partials/footer');

var Layout = React.createClass({
  render: function() {
    return (
      <div className="page-container">
        <Header />
        <div className="page-content l-module">
          { this.props.children }
        </div>
        <Footer />
        <div dangerouslySetInnerHTML={{__html: '<script>(function(a,e,f,g,b,c,d){a.GoogleAnalyticsObject=b;a[b]=a[b]||function(){(a[b].q=a[b].q||[]).push(arguments)};a[b].l=1*new Date;c=e.createElement(f);d=e.getElementsByTagName(f)[0];c.async=1;c.src=g;d.parentNode.insertBefore(c,d)})(window,document,"script","//www.google-analytics.com/analytics.js","ga");ga("create","UA-37971335-1","jonykrau.se");ga("send","pageview");</script>'}} />
      </div>
    );
  }
});


module.exports = Layout;
