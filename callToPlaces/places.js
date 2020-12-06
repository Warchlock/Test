$("#btnRun4").click(function () {
  $.ajax({
    url: "./placesPHP.php",
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
