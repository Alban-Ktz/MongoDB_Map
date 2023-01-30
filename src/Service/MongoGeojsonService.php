<?php

namespace App\Service;

use MongoDB\Client as MongoDBClient;

class MongoGeojsonService {
    public function mongoToJson()
    {
        $db = (new MongoDBClient('mongodb://mongodb'))->selectDatabase('tdmongo');
        $items = $db->selectCollection('pis')->find([]);

        $geoJson = [];
        $geoJson["features"] = array();

        foreach ($items as $item)
        {
            $data = array(
                "geometry" => $item->geometry,
                "properties" => $item->properties,
                "type" => $item->type
            );

            array_push($geoJson["features"], $data);
        }
        
        $geoJson["type"] = "FeatureCollection";

        $geoJsonApi = json_encode($geoJson, );
        file_put_contents("../src/JSON/data.geojson", $geoJsonApi);
    }
}