// Create a map object.
var myMap = L.map("mapid", {
    center: [40.7607, -111.8910],
    zoom: 3
  });
  
  // Add a tile layer.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  d3.json("  https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    //   console.log(data);
    L.geoJSON(data, {
        pointTolayer: function(feature, latlng) {
            return L.circleMarker(latlng)
        },
        onEachfeature: function(feature, layer){
            layer.bindPopup (
                "Magnitude: " +feature.properties.mag+ " Depth: "+feature.geometry.coordinates[2]+ "Location: " +feature.properties.place
            )
        }
    }).addTo(myMap);
});
