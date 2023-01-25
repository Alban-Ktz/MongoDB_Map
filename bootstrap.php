<?php

// bootstrap.php

use UMA\DIC\Container;

require_once __DIR__ . '/vendor/autoload.php';

$container = new Container(require __DIR__ . '/settings.php');

return $container;