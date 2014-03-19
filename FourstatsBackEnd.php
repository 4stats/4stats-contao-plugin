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

class FourstatsBackEnd extends \BackendModule
{
	/**
	 * Template
	 * @var string
	 */
	protected $strTemplate = '4stats_backend';

	/**
	 * Save input
	 * @var boolean
	 */
	protected $blnSave = true;

	/**
	 * Advanced mode
	 * @var boolean
	 */
	protected $blnAdvanced = true;

	/**
	 * Generate the module
	 * @return void
	 */
	protected function compile()
	{
		global $objPage;
		
		$this->loadLanguageFile('tl_4stats');
		  
		$root_details = $this->Database->prepare("SELECT * FROM tl_page WHERE pid=?")->limit(1)->execute('0');
			
		if($root_details->numRows)
		{			
			$this->Template->id = $root_details->fs_project_id;
			$this->Template->api_key = $root_details->fs_api_key;
		}
		
		$this->Template->day_performance = $GLOBALS['TL_LANG']['tl_4stats']['day_performance'];
		$this->Template->performance_month = $GLOBALS['TL_LANG']['tl_4stats']['performance_month'];
		$this->Template->performance_year = $GLOBALS['TL_LANG']['tl_4stats']['performance_year'];

		$GLOBALS['TL_JAVASCRIPT'][] = 'https://code.jquery.com/jquery-1.11.0.min.js';
		$GLOBALS['TL_JAVASCRIPT'][] = 'https://www.google.com/jsapi';
		$GLOBALS['TL_JAVASCRIPT'][] = 'system/modules/4stats/assets/js/4stats.min.js';
		$GLOBALS['TL_HEAD'][] = '<script>var $j = jQuery.noConflict();</script>';
	}
}
