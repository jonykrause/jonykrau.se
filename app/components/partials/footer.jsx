/**
 * @jsx React.DOM
 */

var React = require('react');

var TwitterFollow = React.createClass({
  render: function() {
    return (
      <div className="tw-follow">
        <a href="https://twitter.com/jonykrause" className="twitter-follow-button" data-show-count="false">Follow @jonykrause</a>
        <div dangerouslySetInnerHTML={{__html: '<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?"http":"https";if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document, "script", "twitter-wjs");</script>'}} />
      </div>
    );
  }
});

var Adress = React.createClass({
  render: function() {
    return (
      <address className="address">
        <span itemProp="name">Jonathan Krause</span>
        <div className="is-hidden">
          <span itemProp="birthDate">06.07.1987</span><span itemProp="deathDate">unknown</span><span itemProp="image">http://jonykrau.se/images/jony-small.jpg</span><span itemProp="worksFor">Edenspiekermann AG</span>
        </div>
        <span className="sep">·</span><span itemProp="jobTitle" className="is-hidden">Front-end Developer</span><span itemScope="" itemProp="address" itemType="http://schema.org/PostalAddress"><span itemProp="postalCode">10439</span><span itemProp="addressLocality"> Berlin</span></span>
        <div>
          <a href="mailto:jony@jonathan-krause.de" itemProp="email">jony@jonathan-krause.de</a>
          <TwitterFollow />
        </div>
      </address>
    );
  }
});
var VCard = React.createClass({
  render: function() {
    return (
      <div itemScope="" itemType="http://schema.org/Person" className="vcard">
        <figure className="myface">
          <img alt="Picture of Jonathan Krause" width="66" height="66" src="/img/jony-small.jpg" />
        </figure>
        <Adress />
      </div>
    );
  }
});

var Footer = React.createClass({

  render: function() {
    return (
      <footer role="contentinfo" className="page-footer l-module">
        <VCard />
      </footer>
    );
  }
});

module.exports = Footer;
