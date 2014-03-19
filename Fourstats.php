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

class Fourstats extends Frontend 
{

	protected $strTemplate = '4stats_tracking_code';
		
	// hook for parseFrontendTemplate 
	public function addTrackingCode($strContent, $strTemplate)
	{
		// already included
		if ($GLOBALS['fourstats_included']) 
		{
			return $strContent;
		}
		
		$GLOBALS['fourstats_included'] = true;
		global $objPage;     
		$root_details = $this->Database->prepare("SELECT * FROM tl_page WHERE id=?")->limit(1)->execute($objPage->rootId);
			
		if($root_details->numRows && $root_details->fs_project_id && $root_details->fs_project_id > 0 && $root_details->fs_enabled == '1')
		{
			// Tracking for admins disabled?
			if ($root_details->fs_ignoreadmins && $this->Input->Cookie('BE_USER_AUTH'))
			{
				return $strContent;
			}
			// Tracking for members disabled?
	        elseif ($root_details->fs_ignoremembers && FE_USER_LOGGED_IN)
	        {
	            return $strContent;
	        }
			
			// parse template file
			$objTemplate = new FrontendTemplate($this->strTemplate);
			$objTemplate->id = $root_details->fs_project_id;
			$objTemplate->hide_counter = $root_details->fs_hide_counter;
			$GLOBALS['TL_HEAD'][] = $objTemplate->parse();
		}
		return $strContent;
	}
  
}
