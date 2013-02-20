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
 * Lib file for the moobile theme.
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

/**
 * Allow AJAX updating of the user defined columns for tablets or not
 *
 * @param moodle_page $page
 */
function moobile_initialise_colpos(moodle_page $page) {
    user_preference_allow_ajax_update('theme_moobile_chosen_colpos', PARAM_ALPHA);
}

/**
 * Get the user preference for columns for tablets or not
 *
 * @param string $default
 * @return mixed
 */
function moobile_get_colpos($default = 'on') {
    return get_user_preferences('theme_moobile_chosen_colpos', $default);
}

/**
 * Allow AJAX updating of html editor or not
 *
 * @param moodle_page $page
 */
function moobile_initialise_editor(moodle_page $page) {
    user_preference_allow_ajax_update('theme_moobile_chosen_editor', PARAM_ALPHA);

    global $CFG;
    if (moobile_get_editor() == 'on') {
        $CFG->texteditors = 'tinymce,textarea';
    } else {
        $CFG->texteditors = 'textarea';
    }
}

/**
 * Get the user preference for html editor or not
 *
 * @param string $default
 * @return mixed
 */
function moobile_get_editor($default = 'off') {
    return get_user_preferences('theme_moobile_chosen_editor', $default);
}

/**
 * Get the user preference for editor or not and set it
 *
 * @param string $default
 * @return mixed
 */

/**
 * Makes our changes to the CSS
 *
 * @param string $css
 * @param theme_config $theme
 * @return string
 */
function moobile_user_settings($css, $theme) {
    if (!empty($theme->settings->font)) {
        $fontcss = $theme->settings->font;
    } else {
        $fontcss = null;
    }
    $css = moobile_set_font($css, $fontcss);

    if (!empty($theme->settings->customcss)) {
        $customcss = $theme->settings->customcss;
    } else {
        $customcss = null;
    }
    $css = moobile_set_customcss($css, $customcss);

    return $css;
}

function moobile_set_font($css, $fontcss) {
    global $CFG;
    $tag = '[[setting:fontwww]]';
    $css = str_replace($tag, $CFG->wwwroot . '/theme/moobile/style/font/', $css);
    $tag = '[[setting:font]]';
    $css = str_replace($tag, $fontcss, $css);
    return $css;
}

function moobile_set_customcss($css, $customcss) {
    $tag = '[[setting:customcss]]';
    $css = str_replace($tag, $customcss, $css);
    return $css;
}
