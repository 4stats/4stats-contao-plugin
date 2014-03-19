CREATE TABLE `tl_page` (
  `fs_enabled` char(1) NOT NULL default '1',
  `fs_project_id` int(10) NOT NULL default '0'
  `fs_api_key` char(64) NOT NULL default '',
  `fs_ignoreadmins` char(1) NOT NULL default '0',
  `fs_ignoremembers` char(1) NOT NULL default '0',
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

