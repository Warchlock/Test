$("#btnRun").click(function () {
  $.ajax({
    url: "./wikiPHP.php",
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
