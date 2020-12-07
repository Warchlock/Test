var one;

$("#btnRun5").click(function () {
  $.ajax({
    url: "./openCagePHP.php",
    type: "POST",
    dataType: "json",
    data: {
      lat5: $("#lat5").val(),
      lng5: $("#lng5").val(),
    },
    success: function (result) {
      console.log(result);
      $("#name5").html(result["data"]["results"][0]["formatted"]);
      one = result["data"]["results"][0]["formatted"];
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // your error code
    },
  });
});
