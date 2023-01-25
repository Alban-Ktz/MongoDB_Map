<?php

// bootstrap.php

use Doctrine\Common\Cache\Psr6\DoctrineProvider;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Tools\Setup;
use Psr\Container\ContainerInterface;
use Symfony\Component\Cache\Adapter\ArrayAdapter;
use Symfony\Component\Cache\Adapter\FilesystemAdapter;
use UMA\DIC\Container;
use Slim\Views\Twig;
use App\Controller\UserController;
use App\Services\UserService;
use App\Controller\AccueilController;
use App\Controller\GameController;
use App\Services\GameService;
use App\Services\ConditionService;

require_once __DIR__ . '/vendor/autoload.php';

$container = new Container(require __DIR__ . '/settings.php');









return $container;