// We create the map object with options.
var map = L.map("mapid", {
  center: [0.7, -94.5],
  zoom: 3
});

var graymap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  }
);

// Then we add our 'graymap' tile layer to the map.
graymap.addTo(map);

// Here we make an AJAX call that retrieves our earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {

  // Here we add a GeoJSON layer to the map once the file is loaded.
  // Control color and size of the circle markers by following the L.geoJson documentation:
  // https://leafletjs.com/reference-1.7.1.html#geojson-l-geojson
  L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function(earthquake, latlng) {
      console.log();
      return L.circleMarker(latlng);
    }
  }).addTo(map);
});
