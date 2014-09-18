/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactRouter = require('react-router-component');
var PostItem = require('./postItem');


var Posts = React.createClass({

 propTypes: {itemCount: React.PropTypes.number},

 render: function() {
    var count = this.props.itemCount || this.props.posts.length;
    var posts = this.props.posts.map(function(post, i, posts) {
      if (i < count) {
        return <PostItem key={i} linkpost={post.meta.linkpost} title={post.meta.title} date={post.meta.date} slug={post.slug} />;
      }
    });
    return (
      <div itemScope="" itemType="http://schema.org/Blog">
        <ul itemScope="" itemType="http://schema.org/BlogPosts" className="post-list">
          {posts}
        </ul>
      </div>
    );
  }
});

module.exports = Posts;
