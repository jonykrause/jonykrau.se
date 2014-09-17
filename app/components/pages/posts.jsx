/**
 * @jsx React.DOM
 */

var React = require('react');
var PostList = require('../partials/postList');
var Layout = require('../layout');

var Posts = React.createClass({
  render: function() {
    return (
      <Layout>
        <PostList posts={this.props.posts} />
      </Layout>
    );
  }
});

module.exports = Posts;
