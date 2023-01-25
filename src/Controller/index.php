<?php
// Code source permettant d'accéder aux données parking du Grand Nancy

//Autoload de composer, pour load toutes les dépendances de composer
require_once('../vendor/autoload.php');

function isCollectionExist(string $name, \MongoDB\Database $db): bool
    {
        if(!isset($db)){
            return false;
        }
        return in_array($name, iterator_to_array($db->listCollectionNames()));
    }


//Tableau qui va contenir les données à inserer
$pis = [];

//On crée une instance de MongoDB (Une connexion) et on selectionne la BDD 'tdmongo'
$db = (new MongoDB\Client('mongodb://mongodb'))->selectDatabase('tdmongo');

$exist=isCollectionExist('pis',$db);
if($exist==true){
  return false;
}else{
//Ici on récupère les données de l'API des parkings, un peu comme un fetch en JS, puis un les transformes en format json avec la fonction json_decode()
$data = json_decode(file_get_contents('https://geoservices.grand-nancy.org/arcgis/rest/services/public/VOIRIE_Parking/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=nom%2Cadresse%2Cplaces%2Ccapacite&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=pjson'));

//Dans la BDD on crée une collection nommée 'pis' (Collection = table en MySQL)
$db->createCollection('pis');

//On selectionne la collection pis créée juste au dessus
$db = $db->selectCollection('pis');


//Pour chaque parking 
foreach ($data->features as $feature) {
       //On crée un Objet qui est au format GeoJSON cf. https://fr.wikipedia.org/wiki/GeoJSON
  $pi = [
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
    'capacity' => $feature->attributes->CAPACITE,
  ];

  //On ajoute l'objet dans le tableau déclaré au tout début
  $pis[] = $pi;
}

//Si  le tableau n'est pas vide on insert TOUTES les données dans la BDD avec insertMany. Pour inserer seulement un objet on utilise la méthode insertOne
if (count($pis) > 0) {
  $res = $db->insertMany($pis);
}
}