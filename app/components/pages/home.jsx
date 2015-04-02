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
          Hi, I’m <strong>Jonathan</strong> — <br/> Front-end Developer <br/>
        </h1>
        <PostList itemCount={3} posts={this.props.posts} />
      </Layout>
    );
  }
});

module.exports = Home;
