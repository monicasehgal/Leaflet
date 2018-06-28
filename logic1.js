// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// Techtonic plates link
// Tectonic plates link
var TectonicPlatesLink = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});


// Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake

function createFeatures(earthquakeData) {
   
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: function onEachFeature(feature, layer)
  
    });

  pointToLayer: (feature, latlng) => {
    return new L.circle(latlng,
      {radius: getRadius(feature.properties.mag),
        fillColor: getColor(feature.properties.mag),
        fillOpacity: .7,
        stroke: true,
        color: "black",
        weight: .5
    })
  }
};
//  // Define arrays to hold created city and state markers
//  var cityMarkers = [];
//  //var stateMarkers = [];
 
//  // Loop through locations and create city and state markers

   
 
//    // Setting the marker radius for the city by passing population into the markerSize function
//    cityMarkers.push(
//      L.circle(locations[i].coordinates, {
//        stroke: false,
//        fillOpacity: 0.75,
//        color: "purple",
//        fillColor: "purple",
//        radius: markerSize(locations[i].feature.properties.mag)
//      })
//    );
 
  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  
  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);

    function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1Ijoidmlic2ltIiwiYSI6ImNqaHhoczVjZjBiemszdnFzcmNnb3R2eWwifQ.hPQv3caBuy4pjQ3VIJaeUw");

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoidmlic2ltIiwiYSI6ImNqaHhoczVjZjBiemszdnFzcmNnb3R2eWwifQ.hPQv3caBuy4pjQ3VIJaeUw");
  var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoidmlic2ltIiwiYSI6ImNqaHhoczVjZjBiemszdnFzcmNnb3R2eWwifQ.hPQv3caBuy4pjQ3VIJaeUw")

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap,
    "Light Map": lightMap
  };

  // Create overlay object to hold our overlay layer
  
  // Add a tectonic plate layer
  var tectonicPlates = new L.LayerGroup();

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes,
    "Tectonic Plates": tectonicPlates
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });
 

  // pointToLayer: function (feature, latlng) {
  //   return new L.circle(latlng,
  //     {radius: getRadius(feature.properties.mag),
  //       fillColor: getColor(feature.properties.mag),
  //       fillOpacity: .7,
  //       stroke: true,
  //       color: "black",
  //       weight: .5
  //   })
  // };


//   Create a layer control
//   Pass in our baseMaps and overlayMaps
//   Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

