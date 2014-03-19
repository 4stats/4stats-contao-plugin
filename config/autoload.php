<?php

/**
 * Contao Open Source CMS
 * 
 * Copyright (c) 2005-2014 Leo Feyer
 *
 * @package   4stats
 * @author    support@4stats.de
 * @license   LGPL
 * @copyright 4stats 2014
 */


/**
 * Register the classes
 */
ClassLoader::addClasses(array
(
	'Fourstats' => 'system/modules/4stats/Fourstats.php',
	'FourstatsBackEnd' => 'system/modules/4stats/FourstatsBackEnd.php',
));


/**
 * Register the templates
 */
TemplateLoader::addFiles(array
(
	'4stats_tracking_code'	=> 'system/modules/4stats/templates',
	'4stats_backend'		=> 'system/modules/4stats/templates',
));


