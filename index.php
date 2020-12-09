<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>Document</title>
  <link rel="stylesheet" href="css\style1.css" type="text/css">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin="" />
  <!-- Make sure you put this AFTER Leaflet's CSS -->
  <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/opencagedata/leaflet-opencage-search@1.3.0/dist/css/L.Control.OpenCageData.Search.min.css" />

  <script src="https://cdn.jsdelivr.net/gh/opencagedata/leaflet-opencage-search@1.3.0/dist/js/L.Control.OpenCageSearch.min.js"></script>

  <!-- jquery and popper-->

  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>

  <!--bootstrap-->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</head>

<body>
  <div id="logo"></div>
  <div id="mapid"></div>
  <nav class="navbar navbar-default navbar-fixed-bottom">
    <div class="container">
      <!-- Tab links -->
      <div class="tab">
        <button class="tablinks" id="btnRun2" onclick="openTab(event, 'restCountries')">Rest countries</button>
        <button class="tablinks" id="btnRun" onclick="openTab(event, 'weather')">Weather</button>
        <button class="tablinks" id="btnRun1" onclick="openTab(event, 'wiki')">Wikipedia/poi</button>
        <button class="tablinks" id="btnRun3" onclick="openTab(event, 'currency')">Currency</button>
        <button class="tablinks" id="btnRun4" onclick="openTab(event, 'dk')">Dk</button>
      </div>

      <!-- Tab content -->

      <!-- Call to rest countries -->
      <div id="restCountries" class="tabcontent">
        <div id="divResults">

          <table>

            <tr>
              <td align="right">
                name:
              </td>
              <td id="name2">

              </td>

            </tr>


          </table>
        </div>
        <?php

        // Read JSON file and decode into array.
        $data = json_decode(file_get_contents('./php/countryBorders.geo.json'), TRUE);

        // Start select list
        $html = "<select id=\"iso2\">\n";

        // Loop over features, collecting the country's natural name and its ISO A2 abbreviation.
        foreach ($data['features'] as $point)
          // Concatenate <option> element for each country.
          $html .= "\t<option value=\"{$point['properties']['iso_a2']}\">{$point['properties']['name']}</option>\n";

        // Close the select
        $html .= "</select>\n";

        echo $html;
        ?>

        <br><br>

      </div>

      <!-- call to weather api -->

      <div id="weather" class="tabcontent">

        <div id="divResults">

          <table>

            <tr>
              <td align="right">
                weather
              </td>
              <td id="name">

              </td>

            </tr>
          </table>
        </div>
      </div>

      <!-- call to wiki page -->

      <div id="wiki" class="tabcontent">
        <select id="lat1">
          <option value="47">47</option>

        </select>

        <select id="lng1">
          <option value="2">2</option>
        </select>

        <button id="btnRun1">Run</button>

        <br><br>

        <div id="divResults">

          <table>

            <tr>
              <td align="right">
                wiki entry:
              </td>
              <td id="name1">

              </td>

            </tr>
          </table>

        </div>
      </div>

      <!-- currency exchange call-->

      <div id="currency" class="tabcontent">
        <div id="divResults">


          <table>

            <tr>
              <td align="right">
                currency:
              </td>
              <td id="name3">

              </td>

            </tr>


          </table>
        </div>
      </div>

      <div id="dk" class="tabcontent">
        <select id="lat4">
          <option value="35">35</option>

        </select>

        <select id="lng4">
          <option value="139">139</option>
        </select>

        <button id="btnRun4">Run</button>

        <br><br>

        <div id="divResults">

          <table>

            <tr>
              <td align="right">
                Places
              </td>
              <td id="name4">

              </td>

            </tr>
          </table>

        </div>
      </div>
  </nav>


  <script src="./node_modules/jquery/dist/jquery.js"></script>

  <script src="js/script2.js"></script>



</body>


</html>