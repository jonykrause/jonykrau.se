/**
 * @jsx React.DOM
 */

var React = require('react');
var Layout = require('../layout');

var gpsie = '<iframe class="gpsies" src="//www.gpsies.com/liveTrackingOnly.do?username=jonykrause&authkey=69C384DB17D8D626" width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>';

var spotwalla = '<iframe class="spotwalla" src="https://spotwalla.com/embed.php?id=184455ac4927b2f5e1&scale=on&zoom=default&refresh=yes" width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>';

var locus = '<iframe class="spotwalla" src="https://live-track.locusmap.eu/room/J5IK-SF5Q" width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>';

var TrackMap = React.createClass({
  render: function() {
    console.log('props: ', this.props);
    return (
      <Layout>
        <div className="post">
            <h2>Follow the route</h2>
            <small>via Spotwalla</small>
            <div dangerouslySetInnerHTML={{ __html: spotwalla }} />
            <h2>Live tracking</h2>
            <small>via Locus</small>
            <div dangerouslySetInnerHTML={{ __html: locus }} />
            <h2>See latest position</h2>
        </div>
      </Layout>
    );
  }
});

module.exports = TrackMap;
