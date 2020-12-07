<?php

//https://api.opencagedata.com/geocode/v1/json?q=-23.5373732,-46.8374628&pretty=1&key=34c07d089f27453aae0ceecbb17f5bc2


$url = 'https://api.opencagedata.com/geocode/v1/json?q=' .  $_REQUEST['lat'] . ',' . $_REQUEST['lng'] . '&pretty=1&key=34c07d089f27453aae0ceecbb17f5bc2';


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
