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


$GLOBALS['TL_DCA']['tl_page']['palettes']['root'] = str_replace('{publish_legend}', '{fourstats_legend},fs_enabled,fs_project_id,fs_api_key,fs_ignoreadmins,fs_ignoremembers;{publish_legend}', $GLOBALS['TL_DCA']['tl_page']['palettes']['root']);

/**
 * Table tl_page
 */
$GLOBALS['TL_DCA']['tl_page']['fields']['fs_enabled'] = array
(
    'label'                   => &$GLOBALS['TL_LANG']['tl_page']['fs_enabled'],
    'inputType'               => 'checkbox',
    'eval'                    => array('tl_class'=>'w50'),
);

$GLOBALS['TL_DCA']['tl_page']['fields']['fs_project_id'] = array
(
    'label'                   => &$GLOBALS['TL_LANG']['tl_page']['fs_project_id'],
    'inputType'               => 'text',
    'eval'                    => array('size' => 8, 'tl_class'=>'w50', 'rgxp'=>'digit'),
);

$GLOBALS['TL_DCA']['tl_page']['fields']['fs_api_key'] = array
(
    'label'                   => &$GLOBALS['TL_LANG']['tl_page']['fs_api_key'],
    'inputType'               => 'text',
    'eval'                    => array('size' => 64, 'tl_class'=>'w50'),
);

$GLOBALS['TL_DCA']['tl_page']['fields']['fs_ignoreadmins'] = array
(
    'label'                   => &$GLOBALS['TL_LANG']['tl_page']['fs_ignoreadmins'],
    'inputType'               => 'checkbox',
    'eval'                    => array('tl_class'=>'w50'),
);


$GLOBALS['TL_DCA']['tl_page']['fields']['fs_ignoremembers'] = array
(
    'label'                   => &$GLOBALS['TL_LANG']['tl_page']['fs_ignoremembers'],
    'inputType'               => 'checkbox',
    'eval'                    => array('tl_class'=>'w50'),
);

