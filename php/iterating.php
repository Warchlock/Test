<?php

// Read JSON file and decode into array.
$data = json_decode(file_get_contents('C:\xampp\htdocs\1\php\countryBorders.geo.json'), TRUE);

// Start select list
$html = "<select id=\"selCountry\">\n";

// Loop over features, collecting the country's natural name and its ISO A2 abbreviation.
foreach ($data['features'] as $point)
    // Concatenate <option> element for each country.
    $html .= "\t<option value=\"{$point['properties']['iso_a2']}\">{$point['properties']['name']}</option>\n";

// Close the select
$html .= "</select>\n";

echo $html;
