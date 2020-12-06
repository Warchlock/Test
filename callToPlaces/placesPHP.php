<?php

//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=hotel&key=AIzaSyDsM0PM_6gV7m1bc1zS8y4K8usei1-oBZk

$url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' . 'location=' . $_REQUEST['lat4'] . ',' . $_REQUEST['lng4'] . '&radius=1000' . '&type=hotel&key=AIzaSyDsM0PM_6gV7m1bc1zS8y4K8usei1-oBZk';


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
