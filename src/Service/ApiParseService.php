<?php

namespace App\Service;

class ApiParseService
{
    private $apiUrlParking = "https://geoservices.grand-nancy.org/arcgis/rest/services/public/VOIRIE_Parking/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=nom%2Cadresse%2Cplaces%2Ccapacite&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=pjson";
    private $apiUrlBike = "https://transport.data.gouv.fr/gbfs/nancy/station_information.json";
    private $apiUrlBikeStatus = "https://transport.data.gouv.fr/gbfs/nancy/station_status.json";
    private $apiUrlBus = "../src/JSON/busApi.zip.geojson";

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
                'properties' => [
                    'type' => 'parking',
                    'name' => $feature->attributes->NOM,
                    'address' => $feature->attributes->ADRESSE,
                    'nbDispo' => $feature->attributes->PLACES,
                    'capacity' => $feature->attributes->CAPACITE
                ],
                'geometry' => [
                    $feature->geometry,
                    'type' => 'Point'
                ],
                'category' => [
                    'name' => 'parking',
                    'icon' => 'fa-square-parking',
                    'color' => 'blue'
                ],
            ];
        }

        // //GeoJSON bike points
        // $data = $this->GetData($this->apiUrlBike);
        // $dataBikeStatus = $this->GetData($this->apiUrlBikeStatus);
        // foreach ($data->data->stations as $station) {
        //     $stationId = $station->station_id;

        //     //get bikes and docks available corresponding with stationId
        //     foreach ($dataBikeStatus->data->stations as $bikeStatus) {
        //         if ($bikeStatus->station_id == $stationId) {
        //             $bikesAvailable = $bikeStatus->num_bikes_available;
        //             $docksAvailable = $bikeStatus->num_docks_available;
        //         }
        //     }

        //     $geoJsonDatas[] = [
        //         'properties' => [
        //             'tag' => 'bike',
        //             'name' => $station->name,
        //             'address' => $station->address,
        //             'capacity' => $station->capacity,
        //             'station_id' => $stationId,
        //             'nbDispo' => $bikesAvailable,
        //             'num_docks_available' => $docksAvailable
        //         ],
        //         'category' => [
        //             'name' => 'bike',
        //             'icon' => 'fa-square-bike',
        //             'color' => 'red'
        //         ],
        //         'geometry' => [
        //             "coordinates" => [
        //                 "x" =>  $station->lon,
        //                 "y" =>  $station->lat
        //             ],
        //             "type" => 'Point'
        //         ],
                
        //     ];
        // }

        // //GeoJSON bus points and bus lines
        // $data = $this->GetData($this->apiUrlBus);
        // foreach ($data->features as $feature) {
        //     if ($feature->geometry->type == 'Point') {
        //         $geoJsonDatas[] = [
        //             'properties' => [
        //                 'tag' => "busPoint",
        //                 $feature->properties
        //             ],
        //             'category' => [
        //                 'name' => 'busPoint',
        //                 'icon' => 'fa-square-bus',
        //                 'color' => 'purple'
        //             ],
        //             'geometry' => $feature->geometry,
        //             'type' => $feature->type
        //         ];
        //     } else {
        //         $geoJsonDatas[] = [
        //             'properties' => [
        //                 'tag' => "busLine",
        //                 $feature->properties
        //             ],
        //             'category' => [
        //                 'name' => 'busLine',
        //                 'icon' => 'fa-square-busLine',
        //                 'color' => 'yellow'
        //             ],
        //             'geometry' => $feature->geometry,
        //             'type' => $feature->type
        //         ];
        //     }
        // }

        return $geoJsonDatas;
    }
}
