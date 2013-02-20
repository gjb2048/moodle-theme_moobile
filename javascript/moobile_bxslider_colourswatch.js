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
 * BXSlider colour swatch settings for the moobile theme.
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

var wwwroot = $('div #moobilecolourswatchwwwroot').attr('wwwroot');
$('head').append('<link rel="stylesheet" href="'+wwwroot+'/theme/moobile/javascript/jquery.bxslider/jquery.bxslider.css" type="text/css" />');
$('#admin-colourswatch .form-description').css('margin: 1.5em 0 0 14.25em;');
$(document).ready(function(){
    var startslide = $('div #moobilecolourswatchwwwroot').attr('startslide');
    var width = $('div #moobilecolourswatchwwwroot').attr('width');
    $('#colourswatch-bxslider').bxSlider({
        onSlideAfter: function($slideElement, oldIndex, newIndex){
            var value = $('.moobilecolourswatchimage-'+newIndex).attr('moobilecolourswatch');
            $('.moobilecolourswatchinput').attr('value', value);
        },
        startSlide: startslide,
        captions: true,
        slideWidth: width,
        slideMargin: 0
    });
});
