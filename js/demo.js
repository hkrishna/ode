var map = L.map('map', { zoomControl: false }).setView([40.7259, -73.9805], 12);

// using tangram
var layer = Tangram.leafletLayer({
    scene: 'https://tangrams.github.io/carousel/traditional.yaml',
    attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/" target="_blank">Mapzen</a>'
}).addTo(map);

// set up hash
var hash = new L.Hash(map);

// add controls
new L.Control.Zoom({ position: 'topright' }).addTo(map);
L.control.locate({ position: 'topright', keepCurrentZoomLevel: true }).addTo(map);
L.control.locations({ position: 'topright', keepCurrentZoomLevel: true }).addTo(map);
L.control.ode({ position: 'topright', keepCurrentZoomLevel: true }).addTo(map);

// add mapzen bug
var mzBug = new MapzenBug({
  name: 'On Demand Extracter',
  tweet: 'Another cool demo from @mapzen!',
  repo: 'https://github.com/mapzen/ode'
});

window.areaSelect = L.areaSelect({
  width:256, 
  height:256
});
areaSelect.addTo(map);
