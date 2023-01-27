<?php
namespace App\Controller;

use App\Service\ApiParseService;
use Exception;
use MongoDB\Client as MongoDBClient;

class InsertApiDataController {
  private $apiParseService;

  public function __construct(ApiParseService $apiParseService) {
    $this->apiParseService = $apiParseService;
  }

  public function isCollectionExist(string $name, \MongoDB\Database $db): bool
  {
    if (!isset($db)) {
      return false;
    }
    return in_array($name, iterator_to_array($db->listCollectionNames()));
  }
  
  public function loadDatabase()
  {
    //On crée une instance de MongoDB (Une connexion) et on selectionne la BDD 'tdmongo'
    $db = (new MongoDBClient('mongodb://mongodb'))->selectDatabase('tdmongo');

    if ($this->isCollectionExist('pis', $db)) {
      $db->dropCollection('pis');
    }

    $this->createDatabase($db);
  }
  
  public function createDatabase(\MongoDB\Database $db)
  {
    //Dans la BDD on crée une collection nommée 'pis' (Collection = table en MySQL)
    $db->createCollection('pis');
  
    //On selectionne la collection pis créée juste au dessus
    $db = $db->selectCollection('pis');
  
    //Tableau qui va contenir les données à inserer
    $pis = $this->apiParseService->ApiToGeoJson();

    //Si  le tableau n'est pas vide on insert TOUTES les données dans la BDD avec insertMany. Pour inserer seulement un objet on utilise la méthode insertOne
    if (count($pis) > 0) {
      try {
        $db->insertMany($pis);
      } catch (Exception $e) {
        echo "Erreur d'insertion des données : " + $e->getMessage();
      }
    }
  }
}