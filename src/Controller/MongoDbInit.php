<?php
    $db = (new MongoDB\Client('mongodb://mongodb'))->selectDatabase('tdmongo');
    $table= $db->selectCollection('pis');
    $items= $table->find([]);
    $i=0;
    $api=array();
    foreach ($items as $item)
    {

    $array=Array (
            "name" => $item->name,
            "ad"=>$item->address,
            "desc"=>$item->description,
            "x"=>$item->geometry->x,
            "y"=>$item->geometry->y,
            "places"=>$item->places,
            "capacities"=>$item->capacity,
        );
            $i++;
            array_push($api,$array);

    }
    $jsonapi=json_encode($api,JSON_UNESCAPED_UNICODE);
    file_put_contents("../src/JSON/myfile.json",$jsonapi);
    ?>