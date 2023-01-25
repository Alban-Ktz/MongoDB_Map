<?php
namespace App\Controller;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class ApiController
{
  
  public function getData(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
  {
    $response->getBody()->write(file_get_contents('../src/JSON/myfile.json'));
    return $response;
  }

   
}