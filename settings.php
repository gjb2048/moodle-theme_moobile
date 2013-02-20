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
 * settings file for mymobile theme
 *
 * @package    theme
 * @subpackage moobile
 * @copyright  Gareth J Barnard in respect to changes to code created by John Stabinger.
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
defined('MOODLE_INTERNAL') || die;

if ($ADMIN->fulltree) {
    require_once($CFG->dirroot . '/theme/moobile/admin_setting_sliderselect.php');

    $yesstr = get_string('yes');
    $nostr = get_string('no');

    $noslidermode = false;
    $name = 'theme_moobile/colourswatch';
    $title = get_string('colourswatch', 'theme_moobile');
    $description = get_string('colourswatch_desc', 'theme_moobile');
    $default = 'a';
    $choices = array(
        'a' => get_string('blue', 'theme_moobile'),
        'b' => get_string('green', 'theme_moobile'),
        'c' => get_string('orange', 'theme_moobile'),
        'd' => get_string('pink', 'theme_moobile'),
        'e' => get_string('yellow', 'theme_moobile'),
        'f' => get_string('purple', 'theme_moobile'),
        'g' => get_string('red', 'theme_moobile')
    );
    $setting = new admin_setting_sliderselect($name, $title, $description, $default, $choices, $noslidermode,
                    'javascript', 340, 360, 'moobile', 'colourswatch');
    $settings->add($setting);

    $name = 'theme_moobile/font';
    $title = get_string('font', 'theme_moobile');
    $description = get_string('font_desc', 'theme_moobile');
    $default = 'BPreplay';
    $choices = array(// Note: Key must match filename without .otf.
        'BPreplay' => get_string('bpreplay', 'theme_moobile'),
        'Cabin' => get_string('cabin', 'theme_moobile'),
        'CabinSketch' => get_string('cabinsketch', 'theme_moobile'),
        'Quattrocento' => get_string('quattrocento', 'theme_moobile'),
        'QuattrocentoSans' => get_string('quattrocentosans', 'theme_moobile'),
        'ShortStack' => get_string('shortstack', 'theme_moobile'),
        'SourceCodePro' => get_string('sourcecodepro', 'theme_moobile')
    );
    //$setting = new admin_setting_configselect($name, $title, $description, $default, $choices);
    $setting = new admin_setting_sliderselect($name, $title, $description, $default, $choices, $noslidermode,
                    'javascript', 500, 140, 'moobile', 'font');
    $settings->add($setting);

    $name = 'theme_moobile/showmobileintro';
    $title = get_string('showmobileintro', 'theme_moobile');
    $description = get_string('showmobileintro_desc', 'theme_moobile');
    $setting = new admin_setting_confightmleditor($name, $title, $description, '');
    $settings->add($setting);

    $name = 'theme_moobile/showsitetopic';
    $title = get_string('showsitetopic', 'theme_moobile');
    $description = get_string('showsitetopic_desc', 'theme_moobile');
    $default = 'topicshow';
    $choices = array('topicshow' => $yesstr, 'topicnoshow' => $nostr);
    $setting = new admin_setting_configselect($name, $title, $description, $default, $choices);
    $settings->add($setting);

    $name = 'theme_moobile/showfullsizeimages';
    $title = get_string('showfullsizeimages', 'theme_moobile');
    $description = get_string('showfullsizeimages_desc', 'theme_moobile');
    $default = 'ithumb';
    $choices = array('ithumb' => $nostr, 'ithumbno' => $yesstr);
    $setting = new admin_setting_configselect($name, $title, $description, $default, $choices);
    $settings->add($setting);

    $name = 'theme_moobile/usetableview';
    $title = get_string('usetableview', 'theme_moobile');
    $description = get_string('usetableview_desc', 'theme_moobile');
    $default = 'tabshow';
    $choices = array('tabshow' => $yesstr, 'tabnoshow' => $nostr);
    $setting = new admin_setting_configselect($name, $title, $description, $default, $choices);
    $settings->add($setting);

    $name = 'theme_moobile/useajax';
    $title = get_string('useajax', 'theme_moobile');
    $description = get_string('useajax_desc', 'theme_moobile');
    $default = 'ajaxyes';
    $choices = array('ajaxyes' => $yesstr, 'ajaxno' => $nostr);
    $setting = new admin_setting_configselect($name, $title, $description, $default, $choices);
    $settings->add($setting);

    $name = 'theme_moobile/customcss';
    $title = get_string('customcss', 'theme_moobile');
    $description = get_string('customcssdesc', 'theme_moobile');
    $default = '';
    $setting = new admin_setting_configtextarea($name, $title, $description, $default);
    $settings->add($setting);

    unset($yesstr);
    unset($nostr);
}