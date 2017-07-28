/**
 * @jsx React.DOM
 */

var React = require('react');
var Layout = require('../layout');
var PostList = require('../partials/postList');



var Home = React.createClass({
  render: function() {
    return (
      <Layout>
        <h1 className="f-welcome">
          Hi, I’m <strong><a title="some people call me Jony" href="http://jonykrau.se/about">Jonathan</a></strong> — <br/>
          <span title="Node.js, JavaScript, Software Engineer, Architecturing with Micro-Services">Front-end Engineer</span><br/>
          currently with
          {" "}
          <a title="eBay Classifieds Group" href="http://www.ebayclassifiedsgroup.com/">
          <span style={{ color: "#e53238"}}>e</span>
          <span style={{ color: "#0064d3"}}>B</span>
          <span style={{ color: "#f4ae01"}}>a</span>
          <span style={{ color: "#88b719"}}>y</span>
          </a>
        </h1>
        <PostList itemCount={3} posts={this.props.posts} />
      </Layout>
    );
  }
});

module.exports = Home;
