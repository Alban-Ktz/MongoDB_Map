<?php
namespace App\Controller;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class AccueilController
{
  
  public function accueil(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
  {
    $response->getBody()->write(file_get_contents('./index.html'));
    return $response;
  }

   
}