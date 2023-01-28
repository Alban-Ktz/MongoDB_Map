<?php

use App\Controller\AccueilController;
use App\Controller\ApiController;
use App\Controller\InsertApiDataController;
use App\Service\ApiParseService;
use App\Service\MongoGeojsonService;
use UMA\DIC\Container;

require_once __DIR__ . '/vendor/autoload.php';

$container = new Container(require __DIR__ . '/settings.php');

$container->set(ApiParseService::class, static function (Container $container) {
    return new ApiParseService();
});

$container->set(MongoGeojsonService::class, static function (Container $container) {
    return new MongoGeojsonService();
});

$container->set(InsertApiDataController::class, static function (Container $container) {
    return new InsertApiDataController($container->get(ApiParseService::class));
});

$container->set(AccueilController::class, static function (Container $container) {
    return new AccueilController($container->get(InsertApiDataController::class));
});

$container->set(ApiController::class, static function (Container $container) {
    return new ApiController($container->get(MongoGeojsonService::class));
});

return $container;