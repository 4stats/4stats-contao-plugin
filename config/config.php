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
 * Back end modules
 */
$GLOBALS['BE_MOD']['4stats'] = array(
	'4stats' => array(
	    'callback' => 'FourstatsBackEnd', 
		'icon'   => 'system/modules/4stats/assets/images/icon.png',
	    'stylesheet' => 'system/modules/4stats/assets/css/4stats.css',
	)
);

/**
 * Front end
 */
$GLOBALS['TL_HOOKS']['parseFrontendTemplate'][] = array('Fourstats', 'addTrackingCode');
