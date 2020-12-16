// init the map
//var json = require("../php/countryBorders.geo.json"); //with path
var mymap = L.map("mapid").setView([51.505, -0.09], 13);
var OpenStreetMap_Mapnik = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
).addTo(mymap);

// opnecage options:

// var options = {
//   key: "", // your OpenCage API key
//   limit: 5, // number of results to be displayed
//   position: "topright",
//   placeholder: "Search...", // the text in the empty search box
//   errorMessage: "Nothing found.",
//   showResultIcons: false,
//   collapsed: true,
//   expand: "click",
//   addResultToMap: true, // if a map marker should be added after the user clicks a result
//   onResultClick: undefined, // callback with result as first parameter
// };

// // opencage

var options = {
  key: "34c07d089f27453aae0ceecbb17f5bc2",
  limit: 3,
  proximity: "51.505, -0.09", // favour results near here
  showResultIcons: true,
};
var control = L.Control.openCageSearch(options).addTo(mymap);

// opencage This will add a polygon representing the result's boundingbox when a result is selected.

// control.markGeocode = function (result) {
//   var bbox = result.bbox;
//   L.polygon([
//     bbox.getSouthEast(),
//     bbox.getNorthEast(),
//     bbox.getNorthWest(),
//     bbox.getSouthWest(),
//   ]).addTo(mymap);
// };

// geolocation

var geocoder = L.Control.OpenCageSearch.geocoder(options);
var marker;
mymap.on("click", function (e) {
  var query = e.latlng.lat.toString() + "," + e.latlng.lng.toString();
  geocoder.geocode(query, function (results) {
    var res = results[0];
    if (res) {
      if (marker) {
        marker.setLatLng(res.center).setPopupContent(res.name).openPopup();
      } else {
        marker = L.marker(res.center)
          .bindPopup(res.name)
          .addTo(mymap)
          .openPopup();
      }
    }
  });
});

mymap.locate({ setView: true, maxZoom: 16 });

//marker for detected location:

function onLocationFound(e) {
  var radius = e.accuracy;

  L.marker(e.latlng).addTo(mymap).bindPopup("you").openPopup();

  L.circle(e.latlng, radius).addTo(mymap);
}

mymap.on("locationfound", onLocationFound);

// error if location not found:
function onLocationError(e) {
  alert(e.message);
}

mymap.on("locationerror", onLocationError);

// getting lat and lng from click
var lat;
var lng;

mymap.on("locationfound", function (e) {
  console.log(e.latlng); //So you can see if it's working
  lat = e.latlng.lat;
  lng = e.latlng.lng;
});

// nav menu buttons scripts

function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
// call to open cage, gives you iso and symbol code for restCountries and currency call

$(document).ready(function () {
  $.ajax({
    url: "../test/php/openCagePHP.php",
    type: "POST",
    dataType: "json",
    data: {
      lat,
      lng,
    },
    success: function (result) {
      //variables to use in restCountries/currency calls
      var iso2 =
        result["data"]["results"][0]["components"]["ISO_3166-1_alpha-2"];
      var symbol =
        result["data"]["results"][0]["annotations"]["currency"]["iso_code"];

      // variables to use in highlightBorders function
      // var json = (function () {
      //   var json = null;
      //   $.ajax({
      //     async: false,
      //     global: false,
      //     url: "./php/countryBorders.geo.json",
      //     dataType: "json",
      //     success: function (data) {
      //       json = data;
      //     },
      //   });
      //   return json;
      // })();
      // console.log(json);

      // function to highlight borders based on location
      $(document).ready(function () {
        $.getJSON("./php/countryBorders.geo.json", function (data) {
          for (var j = 0; j < 175; j++) {
            var result = data.features[j].properties.iso_a2;
            for (var i = 0; i < result.length; i++) {
              if (result == iso2) {
                coord = L.GeoJSON.coordsToLatLngs(
                  data.features[j].geometry.coordinates,
                  2
                );

                function highlightBorders(match) {
                  L.polyline(match, {
                    color: "green",
                    weight: 2,
                    opacity: 1,
                  }).addTo(mymap);
                }
                highlightBorders(coord);
              }
            }
          }
        });
      });

      // rest countries call from inside ajax function to access data as variables
      $("#btnRun2").click(function () {
        $.ajax({
          url: "./php/req.php",
          type: "POST",
          dataType: "json",
          data: {
            iso2,
          },
          success: function (result) {
            console.log(result);

            $("#name2").html(result["data"]["altSpellings"][0]);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            // your error code
          },
        });
      });
      //currency call from inside ajax to get currency symbol as a variable

      $("#btnRun3*").click(function () {
        $.ajax({
          url: "./php/currencyphp.php",
          type: "POST",
          dataType: "json",
          data: {
            symbol,
          },
          success: function (result) {
            console.log(result);

            $("#name3").html(result["data"]["rates"]["GBP"]);
            //data.rates.GBP
          },
          error: function (jqXHR, textStatus, errorThrown) {
            // your error code
          },
        });
      });
      console.log(result);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // your error code
    },
  });
});

$("#btnRun").click(function () {
  $.ajax({
    url: "./php/weatherPHP.php",
    type: "POST",
    dataType: "json",
    data: {
      lat,
      lng,
    },
    success: function (result) {
      console.log(result);

      $("#name").html(result["data"]["weather"][0]["id"]);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // your error code
    },
  });
});

// wiki call

$("#btnRun1").click(function () {
  $.ajax({
    url: "././php/wikiPHP.php",
    type: "POST",
    dataType: "json",
    data: {
      lat,
      lng,
    },
    success: function (result) {
      console.log(result);

      var wikiPopup1 = L.popup()
        .setLatLng([
          result["data"]["geonames"][0]["lat"],
          result["data"]["geonames"][0]["lng"],
        ])
        .setContent($("#wikiPopup1").html())
        .addTo(mymap);

      $("#resultsWiki").html(result["data"]["geonames"][0]["summary"]);
      var wikiPopup2 = L.popup()
        .setLatLng([
          result["data"]["geonames"][1]["lat"],
          result["data"]["geonames"][1]["lng"],
        ])
        .setContent($("#wikiPopup2").html())
        .addTo(mymap);
      $("#resultsWiki").html(result["data"]["geonames"][1]["summary"]);
      var wikiPopup3 = L.popup()
        .setLatLng([
          result["data"]["geonames"][2]["lat"],
          result["data"]["geonames"][2]["lng"],
        ])
        .setContent($("#wikiPopup3").html())
        .addTo(mymap);
      $("#resultsWiki").html(result["data"]["geonames"][2]["summary"]);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // your error code
    },
  });
});

// hotels call
$("#btnRun4").click(function () {
  $.ajax({
    url: "./php/placesPHP.php",
    type: "POST",
    dataType: "json",
    data: {
      lat,
      lng,
    },
    success: function (result) {
      console.log(result);

      var wikiPopup1 = L.popup()
        .setLatLng([
          result["data"]["results"][0]["geometry"]["location"]["lat"],
          result["data"]["results"][0]["geometry"]["location"]["lng"],
        ])
        .setContent("I am a hotel entry!")
        .addTo(mymap);

      var hotelPopup2 = L.popup()
        .setLatLng([
          result["data"]["results"][1]["geometry"]["location"]["lat"],
          result["data"]["results"][1]["geometry"]["location"]["lng"],
        ])
        .setContent("I am a hotel entry!")
        .addTo(mymap);

      var hotelPopup3 = L.popup()
        .setLatLng([
          result["data"]["results"][2]["geometry"]["location"]["lat"],
          result["data"]["results"][2]["geometry"]["location"]["lng"],
        ])
        .setContent("I am a hotel entry!")
        .addTo(mymap);

      var hotelPopup4 = L.popup()
        .setLatLng([
          result["data"]["results"][3]["geometry"]["location"]["lat"],
          result["data"]["results"][3]["geometry"]["location"]["lng"],
        ])
        .setContent("I am a hotel entry!")
        .addTo(mymap);

      var hotelPopup5 = L.popup()
        .setLatLng([
          result["data"]["results"][4]["geometry"]["location"]["lat"],
          result["data"]["results"][4]["geometry"]["location"]["lng"],
        ])
        .setContent("I am a hotel entry!")
        .addTo(mymap);

      // data.results[0].geometry.location.lat
      $("#name4").html(result["data"]["results"][0]["vicinity"]);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // your error code
    },
  });
});

// popups test
