$("#btnRun").click(function () {
  $.ajax({
    url: "./weatherPHP.php",
    type: "POST",
    dataType: "json",
    data: {
      lat: $("#lat").val(),
      lng: $("#lng").val(),
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
