<?php

$url = 'http://api.geonames.org/findNearbyWikipediaJSON?' . 'lat=' . $_REQUEST['lat1'] . '&lng=' . $_REQUEST['lng1'] . '&username=warchlock';


$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);

$result = curl_exec($ch);

curl_close($ch);

$decode = json_decode($result, true);

$output['status']['code'] = "200";
$output['status']['name'] = "ok";


$output['data'] = $decode;

header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output);
