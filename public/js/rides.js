const leafletMap = document.getElementById('leafletMap');
const { lat, lon, time, battery } = leafletMap.dataset;
const map = L.map(leafletMap);
const osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
const osm = new L.TileLayer(osmUrl, { minZoom: 8, maxZoom: 12, attribution: osmAttrib });

map.setView(new L.LatLng(lat, lon), 9);
map.addLayer(osm);
