const leafletMap = document.getElementById('leafletMap');
const { lat, lon, time, battery } = leafletMap.dataset;
const map = L.map(leafletMap);
const osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
const osm = new L.TileLayer(osmUrl, { minZoom: 8, maxZoom: 18, attribution: osmAttrib });
const marker = L.marker([Number(lat), Number(lon)]).addTo(map);
const timeHtml = `<div>Time: ${new Date(Number(time))}</div>`;
const batteryHtml = `<div>Battery: ${battery}%</div>`;
const coordsHtml = `<div>Lat: ${lat}, Lon: ${lon}</div>`;

marker.bindPopup(`${timeHtml}${coordsHtml}${batteryHtml}`).openPopup();
map.setView(new L.LatLng(Number(lat), Number(lon)), 15);
map.addLayer(osm);
