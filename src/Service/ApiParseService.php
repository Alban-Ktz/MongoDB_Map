<?php
namespace App\Service;

class ApiParseService{
    private $apiUrlParking = "https://geoservices.grand-nancy.org/arcgis/rest/services/public/VOIRIE_Parking/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=nom%2Cadresse%2Cplaces%2Ccapacite&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=pjson";
    private $apiUrlBike = "https://transport.data.gouv.fr/gbfs/nancy/station_information.json";
    private $apiUrlBus = "../src/ApiFile/55795.20221220.180715.388446.zip.geojson";

    public function GetData(String $apiName)
    {
        return json_decode(file_get_contents($apiName));
    }

    public function ApiToGeoJson()
    {
        $geoJsonDatas = [];

        //GeoJSON parking points
        $data = $this->GetData($this->apiUrlParking);
        foreach ($data->features as $feature) {
            $geoJsonDatas[] = [
                'properties' => 'parking',
                'name' => $feature->attributes->NOM,
                'address' => $feature->attributes->ADRESSE,
                'description' => '',
                'category' => [
                    'name' => 'parking',
                    'icon' => 'fa-square-parking',
                    'color' => 'blue'
                ],
                'geometry' => $feature->geometry,
                'places' => $feature->attributes->PLACES,
                'capacity' => $feature->attributes->CAPACITE
            ];
        }

        //GeoJSON bike points
        $data = $this->GetData($this->apiUrlBike);
        foreach ($data->data->stations as $station) { 
            $geoJsonDatas[] = [
                'properties' => 'bike',
                'name' => $station->name,
                'address' => $station->address,
                'category' => [
                    'name' => 'bike',
                    'icon' => 'fa-square-bike',
                    'color' => 'red'
                ],
                'geometry' => [
                    "type" => 'point',
                    "coordinates" => [
                        $station->lat,
                        $station->lon
                    ]
                ],
                'capacity' => $station->capacity,
                'station_id' => $station->station_id
            ];
        }

        // foreach($data->features->geometry->coordinates[0] as $coordinates)
        // {
        //     echo $coordinates[0].','.$coordinates[1].'<br>';
        // }
        
        // var_dump($data);

        return $geoJsonDatas;
    }
}
