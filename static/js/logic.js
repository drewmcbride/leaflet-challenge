// Create a map object.
var myMap = L.map("mapid", {
    center: [40.7607, -111.89105],
    zoom: 4
  });
  
// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var baseUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(baseUrl).then(function(data) {
    //   console.log(data);
    var earthquake = data.features
    console.log(earthquake[0])
    L.geoJSON(data, {
        pointTolayer: function(feature, latLng){
            console.log(feature);
            return L.circleMarker(latLng)
        },
        
        onEachfeature: function(feature, layer){
            layer.bindPopup (
                "Magnitude: " +feature.properties.mag+ " Depth: "+feature.geometry.coordinates[2]+ "Location: " +feature.properties.place
            )
        }
    }).addTo(myMap);
});
