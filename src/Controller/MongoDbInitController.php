<?php
namespace App\Controller;

use MongoDB\Client as MongoDBClient;

class MongoDbInitController {

    public function dbInit()
    {
        $db = (new MongoDBClient('mongodb://mongodb'))->selectDatabase('tdmongo');
        $items = $db->selectCollection('pis')->find([]);
        $i = 0;
        $api = array();

        foreach ($items as $item)
        {
            $array=Array (
                "properties" => $item->properties,
                "geometry" => $item->geometry,
                "category" => $item->category
            );
                
            $i++;
            array_push($api,$array);
        }

        $geoJsonApi = json_encode($api, JSON_NUMERIC_CHECK);
        file_put_contents("../src/JSON/data.geojson", $geoJsonApi);
    }
}