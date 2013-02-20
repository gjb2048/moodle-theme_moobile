<?php

// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Experimental configuration for the moobile theme.
 *
 * @package    theme.
 * @subpackage moobile modified from mymobile.
 * @version    See the value of '$plugin->version' in version.php.
 * @copyright  &copy; 2013-onwards Gareth J Barnard - February 2013 - in respect to modifications of the MyMobile theme.
 * @copyright  John Stabinger original MyMobile theme.
 * @author     G J Barnard - gjbarnard at gmail dot com and {@link http://moodle.org/user/profile.php?id=442195}.
 * @author     Based on code originally written by John Stabinger.
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later.
 */
// The name of the theme
$THEME->name = 'moobile';

// This theme relies on canvas and of course base themes
$THEME->parents = array(
    'canvas',
    'base'
);

// Set the stylesheets that we want to include for this theme
$THEME->sheets = array(
    'moobile_font',
    'moobile',
    'jquery_mobile_structure_moobile',
    'moobile_rtl',
    'moobile_core',
    'moobile_media'
);

// Exclude parent sheets that we don't want
$THEME->parents_exclude_sheets = array(
    'base' => array(
        'pagelayout',
        'dock',
        'editor',
		'admin'
    ),
    'canvas' => array(
        'pagelayout',
        'tabs',
        'editor',
		'admin'
    ),
);

$THEME->plugins_exclude_sheets = array(
    'mod' => array('resource')
);

// Disable the dock - this theme does not support it.
$THEME->enable_dock = false;

// Set up the default layout options. Note that none of these have block
// regions. See the code below this for where and when block regions are added.
$THEME->layouts = array(
    'base' => array(
        'file' => 'general.php',
        'regions' => array(),
    ),
    'standard' => array(
        'file' => 'general.php',
        'regions' => array(),
    ),
    'course' => array(
        'file' => 'general.php',
        'regions' => array(),
    ),
    'coursecategory' => array(
        'file' => 'general.php',
        'regions' => array(),
    ),
    'incourse' => array(
        'file' => 'general.php',
        'regions' => array(),
    ),
    'frontpage' => array(
        'file' => 'general.php',
        'regions' => array(),
    ),
    'admin' => array(
        'file' => 'general.php',
        'regions' => array(),
    ),
    'mydashboard' => array(
        'file' => 'general.php',
        'regions' => array(),
        'options' => array('nonavbar' => true),
    ),
    'mypublic' => array(
        'file' => 'general.php',
        'regions' => array(),
    ),
    'login' => array(
        'file' => 'general.php',
        'regions' => array(),
        'options' => array('langmenu' => true, 'nonavbar' => true),
    ),
    'popup' => array(
        'file' => 'embedded.php',
        'regions' => array(),
        'options' => array('nofooter' => true, 'noblocks' => true, 'nonavbar' => true),
    ),
    'frametop' => array(
        'file' => 'general.php',
        'regions' => array(),
        'options' => array('nofooter' => true),
    ),
    'maintenance' => array(
        'file' => 'general.php',
        'regions' => array(),
        'options' => array('nofooter' => true, 'nonavbar' => true),
    ),
    'embedded' => array(
        'file' => 'embedded.php',
        'regions' => array(),
        'options' => array('nofooter' => true, 'nonavbar' => true),
    ),
    // Should display the content and basic headers only.
    'print' => array(
        'file' => 'general.php',
        'regions' => array(),
        'options' => array('nofooter' => true, 'nonavbar' => false, 'noblocks' => true),
    ),
    // The pagelayout used when a redirection is occuring.
    'redirect' => array(
        'file' => 'embedded.php',
        'regions' => array(),
        'options' => array('nofooter' => true, 'nonavbar' => true, 'nocustommenu' => true),
    ),
    // The pagelayout used for reports
    'report' => array(
        'file' => 'general.php',
        'regions' => array(),
        'options' => array('nofooter' => true, 'nonavbar' => false, 'noblocks' => true),
    ),
);

// Get whether to show blocks and use appropriate pagelayout
// this is necessary for block JS errors and other block problems
$thisdevice = get_device_type();
if ($thisdevice == "default" || $thisdevice == "tablet" || optional_param('moobile_blocks', false, PARAM_BOOL)) {
    // These are layouts with blocks
    $blocklayouts = array('course', 'incourse', 'frontpage', 'mydashboard', 'mypublic');
    foreach ($blocklayouts as $layout) {
        $THEME->layouts[$layout]['regions'] = array('myblocks');
        $THEME->layouts[$layout]['defaultregion'] = 'myblocks';
    }
} else {
    // A dummy block to prevent warnings causing issues.  Blocks not shown on page.
    $blocklayouts = array('course', 'incourse', 'frontpage', 'mydashboard', 'mypublic');
    foreach ($blocklayouts as $layout) {
        $THEME->layouts[$layout]['regions'] = array('mynoblocks');
        $THEME->layouts[$layout]['defaultregion'] = 'mynoblocks';
    }
}

// Add the required JavaScript to the page
$THEME->javascripts = array(
    'moobile_loader'
);

// Sets a custom render factory to use with the theme, used when working with custom renderers.
$THEME->rendererfactory = 'theme_overridden_renderer_factory';
$THEME->csspostprocess = 'moobile_user_settings';