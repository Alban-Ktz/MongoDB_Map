<?php
namespace App\Controller;

use App\Service\MongoGeojsonService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class ApiController
{ 
  private $mongoGeojson;

  public function __construct(MongoGeojsonService $mongoGeojson) {
    $this->mongoGeojson = $mongoGeojson;
  }

  public function getData(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
  {
    $this->mongoGeojson->mongoToJson();
    $response->getBody()->write(file_get_contents('../src/JSON/data.geojson'));
    return $response;
  }
}