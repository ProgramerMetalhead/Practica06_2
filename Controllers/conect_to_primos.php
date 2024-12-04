<?php

require_once "../config.php";

$URL = "http://primosoft.com.mx/games/api/getscores.php";

if ($_SERVER["REQUEST_METHOD"] == "GET"){
    
    $Reponse = file_get_contents($URL."?game=TicTacToe&orderAsc=1");
    
    if ($Reponse !== false){
        echo $Reponse;
    }

}

if ($_SERVER["REQUEST_METHOD"] == "POST"){
    
    header("Content-type: application/json");
    
    $json = file_get_contents("php://input");

    // Crear las opciones de la petición
    $options = [
        'http' => [
            'header'  => "Content-Type: application/json\r\n" .
                         "Accept: application/json\r\n",
            'method'  => 'POST',
            'content' => $json
        ]
    ];

    // Crear el contexto de la petición
    $context = stream_context_create($options);

    $Reponse = file_get_contents($URL,false, $context);

    if ($Reponse === false){
        echo json_encode([
            "Error" => true,
            "ErrMessage" => "no se obtuvo unas respuesta con el servidor"]);
    } else{
        echo json_encode(["success" => true]);
    }
    
}