<?php
namespace App\Controller;

use App\Service\ApiParseService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class AccueilController
{
  private $apiParseService;

  public function __construct(ApiParseService $apiParseService) {
    $this->apiParseService = $apiParseService;
  }


  public function accueil(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
  {
    $response->getBody()->write(file_get_contents('../src/html/index.html'));

    // $this->apiParseService->ApiParse();
    require('../src/Controller/insertApiData.php');
    return $response;
  }

   
}