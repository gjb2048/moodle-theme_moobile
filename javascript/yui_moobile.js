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
 * YUI jQuery, jQueryMobile and customisations loader for the moobile theme.
 *
 * @package    theme.
 * @subpackage moobile.
 * @version    See the value of '$plugin->version' in version.php.
 * @copyright  &copy; 2013-onwards Gareth J Barnard - February 2013.
 * @author     G J Barnard - gjbarnard at gmail dot com and {@link http://moodle.org/user/profile.php?id=442195}.
 * @thanks     Thanks to Andrew Nicols for supplying the code skeleton - https://moodle.org/user/profile.php?id=268794 & http://jsfiddle.net/andrewnicols/WaFDA/.
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later.
 */

YUI.applyConfig({
    groups: {
        'jquery': {
            async: false,
            combine: true,
            modules: {
                'jquery': {
                    fullpath: M.cfg.wwwroot + '/theme/moobile/javascript/jquery-1.8.2.min.js'
                },
                'jquery-moobile-custom': {
                    fullpath: M.cfg.wwwroot + '/theme/moobile/javascript/moobile.js',
                    requires: ['jquery']
                },
                'jquery-moobile': {
                    fullpath: M.cfg.wwwroot + '/theme/moobile/javascript/jquery.mobile-1.2.0_moobile.js',
                    requires: ['jquery-moobile-custom']
                }
            }
        }
    }
});
YUI().use('jquery-moobile', function(Y) {});