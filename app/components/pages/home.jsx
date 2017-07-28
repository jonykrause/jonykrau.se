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
          Hi, I’m <strong>Jonathan</strong> — <br/> Front-end Engineer<br/>
          currently with
          {" "}
          <a href="http://www.ebayclassifiedsgroup.com/">
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
