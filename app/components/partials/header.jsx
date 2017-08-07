/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactRouter = require('react-router-component');
var Link = ReactRouter.Link;

var ActiveLink = React.createClass({
  mixins: [ReactRouter.NavigatableMixin],
  isActive: function() {
    return this.getPath() === this.props.href || this.getPath().indexOf(this.props.href) != -1 && this.props.href != '/';
  },
  render: function() {
    var className;
    if (this.props.activeClassName && this.isActive()) {
      className = this.props.activeClassName
    }
    var link = Link({className: className}, this.props.children)
    return this.transferPropsTo(link)
  }
});


var Header = React.createClass({
  render: function() {
    var activeClassName = "is-active";
    return (
      <header role="banner" className="page-header l-module">
        <nav role="navigation" className="page-nav">
          <ul className="item-list">
            <li>
              <ActiveLink href="/" activeClassName={activeClassName}>Home</ActiveLink>
            </li>
            <li>
              <ActiveLink href="/posts" activeClassName={activeClassName}>Blog</ActiveLink>
            </li>
            <li>
              <ActiveLink href="/about" activeClassName={activeClassName}>About</ActiveLink>
            </li>
            <li>
              <a href="https://twitter.com/jonykrause">Twitter</a>
            </li>
            <li>
              <a href="https://github.com/jonykrause">Github</a>
            </li>
            <li>
              <a href="https://instagram.com/jonykrause">Instagram</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
});

module.exports = Header;
