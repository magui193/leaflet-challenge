// Store our API endpoint as queryUrl.
var earthquakesUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create the layergroup for earthquakes
var earthquakes = new L.LayerGroup();

// We create the map object with options.
var map = L.map("mapid", {
  center: [0.7, -94.5],
  zoom: 3
});


var graymap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

// Add our gray map layer to the map.
var baseMaps = {
  "Grayscale": graymap
}

var overlayMaps = {
  "Earthquakes": earthquakes
}

// Create a layer control.
L.control.layers(baseMaps, overlayMaps).addTo(map);


// Here we make an AJAX call that retrieves our earthquake geoJSON data.
d3.json(earthquakesUrl, function (data) {
  // Function to determine size of market according to magnitude of the earthquake
  function markerSize(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 3;
  }

  // Function to determine the style of market according to magnitude of the earthquake
  function markerStyle(marker) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: markerColor(marker.properties.mag),
      radius: markerSize(marker.properties.mag),
      stroke: true,
      weight: 0.5
    }
  }

  // Function to determine the color of market according to magnitude of the earthquake
  function markerColor(magnitude) {
    if (magnitude > 5) {
      return 'red'
    } else if (magnitude > 4) {
      return 'darkorange'
    } else if (magnitude > 3) {
      return 'tan'
    } else if (magnitude > 2) {
      return 'yellow'
    } else if (magnitude > 1) {
      return 'darkgreen'
    } else {
      return ' lightgreen'
    }
  };

  // Here we add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    pointToLayer: function (marker, latlng) {
      console.log();
      return L.circleMarker(latlng);
    },
    style: markerStyle,

    // Add info of earthquake in marker
    onEachFeature: function (marker, layer) {
      layer.bindPopup("<h4>Location: " + marker.properties.place + "</h4><hr><p>Date & Time: " + new Date(marker.properties.time) + "</p><hr><p>Magnitude: " + marker.properties.mag + "</p>");
    }

    // Add d ata to earthquakes layer  
  }).addTo(earthquakes);

  // Add earthquakes to map
  earthquakes.addTo(map);

  //Create legend
  var legend = L.control({ position: 'bottomright' });
  legend.onAdd = function() {
    var div = L.DomUtil.create('div', 'info legend');
    magnitudelevel = [0, 1, 2, 3, 4, 5];

    div.innerHTML += "<h3>Magnitude</h3>"

    for (var i = 0; i < magnitudelevel.length; i++) {
      div.innerHTML +=
          '<i style="background:' + markerColor(magnitudelevel[i] + 1) + '"></i> ' +
            magnitudelevel[i] + (magnitudelevel[i + 1] ? '&ndash;' + magnitudelevel[i + 1] + '<br>' : '+');
    }
    return div;
  };

  // Add legend to the map
  legend.addTo(map);

});