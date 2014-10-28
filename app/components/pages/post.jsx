/**
 * @jsx React.DOM
 */

var React = require('react');
var FormattedDate = require('../partials/formattedDate');
var Pagination = require('../partials/pagination');
var Layout = require('../layout');
var NotFoundPage = require('../pages/notFound');

var Post = React.createClass({

  render: function() {

    var slug = this.props.slug;
    var post = this.props.posts.filter(function(post) {
      return post.slug === slug;
    })[0];

    if (!post) {
      return NotFoundPage();
    }

    return (
      <Layout>
        <article itemScope="" itemType="http://schema.org/BlogPosting" className="post">
          <header className="post__header">
            <FormattedDate date={post.meta.date} className="post__date" />
            <h1 itemProp="headline" className="post__heading">
              {post.meta.title}
            </h1>
            <Pagination prev={post.prevSlug} next={post.nextSlug} />
          </header>
          <div dangerouslySetInnerHTML={{__html: JSON.parse(post.markup)}} itemProp="articleBody" className="post__content"></div>
        </article>
      </Layout>
    );
  }
});

module.exports = Post;
