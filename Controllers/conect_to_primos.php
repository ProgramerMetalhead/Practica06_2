<?php

require_once "../config.php";

$URL = "http://primosoft.com.mx/games/api/";

if ($_SERVER["REQUEST_METHOD"] == "GET"){
    
    $Reponse = file_get_contents($URL."getscore.php/?game=TicTacToe&orderAsc=1");
    
    if ($Reponse !== false){
        echo $Reponse;
    }

}

if ($_SERVER["REQUEST_METHOD"] == "POST"){
    
    header("Content-type: application/json");
    
    $json = json_decode(file_get_contents("php://input"));


    $curl = curl_init();

    curl_setopt_array($curl, array(
    CURLOPT_URL => $URL."addscore.php",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS => 'player='.$json->{'player'}.'&game='.$json->{'game'}.'&score='.$json->{'score'},
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    echo $response;
    
}