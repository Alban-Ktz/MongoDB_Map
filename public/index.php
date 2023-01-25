<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$container = require_once __DIR__ . '/../bootstrap.php';

AppFactory::setContainer($container);

$app = AppFactory::create();


$app->get('/', \App\Controller\AccueilController::class . ':accueil');




$app->run();
//include('../src/index.php');
//include('../src/html/index.html');

?>