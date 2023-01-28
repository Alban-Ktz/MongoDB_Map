<?php

namespace App\Service;

use MongoDB\Client as MongoDBClient;

class MongoGeojsonService {
    public function mongoToJson()
    {
        $db = (new MongoDBClient('mongodb://mongodb'))->selectDatabase('tdmongo');
        $items = $db->selectCollection('pis')->find([]);

        $api = [];

        foreach ($items as $item)
        {
            $api["features"] = array([
                "geometry" => $item->geometry,
                "properties" => $item->properties,
                "category" => $item->category,
                "type" => $item->type
            ]);
        }
        
        $api["type"] = "FeatureCollection";

        $geoJsonApi = json_encode($api, JSON_PRETTY_PRINT);
        file_put_contents("../src/JSON/data.geojson", $geoJsonApi);
    }
}