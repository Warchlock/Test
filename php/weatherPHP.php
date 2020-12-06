<?php

// API key  369ad5f5b231fedae3b1da93e06731cd
// call api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}


$url = 'api.openweathermap.org/data/2.5/weather?' . 'lat=' . $_REQUEST['lat'] . '&lon=' . $_REQUEST['lng'] . '&appid=369ad5f5b231fedae3b1da93e06731cd';


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
