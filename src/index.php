<?php
// Code source permettant d'accéder aux données parking du Grand Nancy

//Autoload de composer, pour load toutes les dépendances de composer
require_once('../vendor/autoload.php');

//Tableau qui va contenir les données à inserer
$pis = [];

//On crée une instance de MongoDB (Une connexion) et on selectionne la BDD 'tdmongo'
$db = (new MongoDB\Client('mongodb://mongodb'))->selectDatabase('tdmongo');

//Ici on récupère les données de l'API des parkings, un peu comme un fetch en JS, puis un les transformes en format json avec la fonction json_decode()
$data = json_decode(file_get_contents('...'));

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