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
    const { lat, lon, acc, time, battery } = this.props.tracking || {};
    return (
      <Layout>
       <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
         integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
         crossorigin=""/>
       <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"
         integrity="sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw=="
         crossorigin=""></script>
       <script async src="/js/rides.js"></script>
        <div className="post">
            <h2>Follow the route</h2>
            <small>via Spotwalla</small>
            <div dangerouslySetInnerHTML={{ __html: spotwalla }} />
            <h2>Live tracking</h2>
            <small>via Locus</small>
            <div dangerouslySetInnerHTML={{ __html: locus }} />
            <h2>See latest position</h2>
            <div id="leafletMap" data-lat={lat} data-lon={lon} data-time={time} data-battery={battery}></div>
        </div>
      </Layout>
    );
  }
});

module.exports = TrackMap;
