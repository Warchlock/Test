<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>






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
    $data = json_decode(file_get_contents('C:\xampp\htdocs\1\php\countryBorders.geo.json'), TRUE);

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
    <button id="btnRun2">Run</button>
    <br><br>
    <script type="application/javascript" src="../../geonamesExample/libs/js/jquery-2.2.3.min.js"></script>
    <script type="application/javascript" src="./jes.js"></script>

</body>

</html>