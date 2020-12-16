$.getJSON("data.php", function (data) {
  $.each(data.justIn, function () {
    $.each(this, function (k, v) {
      alert(k + " " + v);
    });
  });
  $.each(data.recent, function () {
    $.each(this, function (k, v) {
      alert(k + " " + v);
    });
  });
  $.each(data.old, function () {
    $.each(this, function (k, v) {
      alert(k + " " + v);
    });
  });
});
