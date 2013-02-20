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
 * Experimental jQuery loader for the moobile theme.
 *
 * @package    theme.
 * @subpackage moobile.
 * @version    See the value of '$plugin->version' in version.php.
 * @copyright  &copy; 2013-onwards Gareth J Barnard - February 2013.
 * @author     G J Barnard - gjbarnard at gmail dot com and {@link http://moodle.org/user/profile.php?id=442195}.
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later.
 */
 
var wwwroot = document.getElementsByName("wwwroot")[0].getAttribute("wwwroot");

// From: http://old.shift8creative.com/blog/including-external-javascript-from-another-javascript-file
// Reproduced with permission.
function IncludeJavaScript(sURL) {
    var oRequest;

    // if using a normal browser
    if (window.XMLHttpRequest) {
        oRequest = new XMLHttpRequest();
    } else {
        if (window.ActiveXObject) {
            // if using IE 6 for some terrible reason
            oRequest  = new ActiveXObject('MSXML2.XMLHTTP.3.0');
        }
    }

    oRequest.open("GET",sURL,false);
    oRequest.setRequestHeader("User-Agent",navigator.userAgent);
    oRequest.send(null)

    if (oRequest.status==200) {
        eval(oRequest.responseText);
    } else {
    // alert("Error executing XMLHttpRequest.");
    }
};

// Test
//IncludeJavaScript(wwwroot+'/theme/moobile/javascript/jquery-1.9.1.min.js');

// From: http://jquery-howto.blogspot.co.uk/2009/03/check-if-jqueryjs-is-loaded.html
if (typeof jQuery != 'undefined') {
    // jQuery is loaded.
    var versionstring = $().jquery;
    if (versionstring !== '1.9.1') {
        // Unload and reload...
        // From: http://blog.nemikor.com/2009/10/03/using-multiple-versions-of-jquery/
        // And : http://api.jquery.com/jQuery.noConflict/
        jQuery.noConflict(true);
        IncludeJavaScript(wwwroot+'/theme/moobile/javascript/jquery-1.9.1.min.js');
    }
} else {
    // jQuery is not loaded
    IncludeJavaScript(wwwroot+'/theme/moobile/javascript/jquery-1.9.1.min.js');
} 

// Load the rest...
IncludeJavaScript(wwwroot+'/theme/moobile/javascript/jquery-migrate-1.1.0.min.js'); // Needed to support $.browser.msie in jquery-1.9.1.min above to support IE 6/7/8.
IncludeJavaScript(wwwroot+'/theme/moobile/javascript/jquery.mobile-1.2.0_moobile.js');
IncludeJavaScript(wwwroot+'/theme/moobile/javascript/moobile.js');
