$("#btnRun2").click(function () {
  $.ajax({
    url: "./req.php",
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
