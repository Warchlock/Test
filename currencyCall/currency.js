$("#btnRun3*").click(function () {
  $.ajax({
    url: "./currencyphp.php",
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
