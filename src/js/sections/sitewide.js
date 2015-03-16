var privateVar = "i am a crap";

export function init() {
  // console.log(privateVar);
}

L.mapbox.accessToken = 'pk.eyJ1IjoicGVja29taW5nbyIsImEiOiJoVHNQM29zIn0.AVmpyDYApR5mryMCJB1ryw';
var map = L.mapbox.map('map', 'peckomingo.lb8m2cga')
  .setView([48.22, 16.379], 11);

//spitalgasse 17, alserstrasse 55

$(".sendAddress").on("click", function() {
  var addresse = $(".addressField").val();
  $.getJSON( "http://data.wien.gv.at/daten/OGDAddressService.svc/GetAddressInfo?Address="+addresse+"&crs=EPSG:4326", function( data ) {

    $(".codeOut").empty().append(JSON.stringify(data));
    var coords = data.features[0].geometry.coordinates;
    console.log(coords);
    map.eachLayer(function(layer) {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });
    var point =  L.geoJson(data.features[0]).addTo(map);
    var graetzl = L.geoJson(map.featureLayer._geojson);
    var results = leafletPip.pointInLayer(coords, graetzl);
    var text = "";
    for(var i=0; i < results.length; i++) {
      text += results[i].feature.properties.title;
      if(i < results.length-1) {
        text = text + ", "
      }
    }
    $(".graetzl").empty();
    if(results.length != 0) {
      $(".graetzl").append("<span>Adresse ist in den Grätzln</span>  " + text)
    }

    //map.fitBounds(point.getBounds());
    map.setView([coords[1], coords[0]], 16)

  });








});
