// init the map

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
//   key: '', // your OpenCage API key
//   limit: 5 // number of results to be displayed
//   position: 'topright',
//   placeholder: 'Search...', // the text in the empty search box
//   errorMessage: 'Nothing found.',
//   showResultIcons: false,
//   collapsed: true,
//   expand: 'click',
//   addResultToMap: true, // if a map marker should be added after the user clicks a result
//   onResultClick: undefined // callback with result as first parameter
// };

// opencage
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

// weather call

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
      lat1: $("#lat1").val(),
      lng1: $("#lng1").val(),
    },
    success: function (result) {
      console.log(result);

      $("#name1").html(result["data"]["geonames"][0]["summary"]);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // your error code
    },
  });
});

// rest countries call
$("#btnRun2").click(function () {
  $.ajax({
    url: "./php/req.php",
    type: "POST",
    dataType: "json",
    data: {
      iso: $("#iso2").val(),
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

//currency call
$("#btnRun3*").click(function () {
  $.ajax({
    url: "./php/currencyphp.php",
    type: "POST",
    dataType: "json",
    data: {
      symbol: $("#symbol").val(),
    },
    success: function (result) {
      console.log(result);

      $("#name3").html(result["data"]["base"]);
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
      lat4: $("#lat4").val(),
      lng4: $("#lng4").val(),
    },
    success: function (result) {
      console.log(result);

      $("#name4").html(result["data"]["results"][0]["vicinity"]);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // your error code
    },
  });
});
