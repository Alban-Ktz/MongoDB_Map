<?php
namespace App\Controller;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class AccueilController
{
  private $insertData;

  public function __construct(InsertApiDataController $insertData) {
    $this->insertData = $insertData;
  }

  public function accueil(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
  {
    $this->insertData->loadDatabase();

    $response->getBody()->write(file_get_contents('../src/html/index.html'));
    return $response;
  }
}
