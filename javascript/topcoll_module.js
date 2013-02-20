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
 * Collapsed Topics jQueryMobile styler and engine for the moobile theme.
 *
 * @package    theme.
 * @subpackage moobile.
 * @version    See the value of '$plugin->version' in version.php.
 * @copyright  &copy; 2013-onwards Gareth J Barnard - February 2013.
 * @author     G J Barnard - gjbarnard at gmail dot com and {@link http://moodle.org/user/profile.php?id=442195}.
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later.
 */
 
// Cleaned through use of http://jshint.com/.

// Global variables 
var toggleBinaryGlobal = "10000000000000000000000000000000000000000000000000000"; // 53 possible toggles - current settings in Moodle for number of topics - 52 + 1 for topic 0.  Need 1 as Most Significant bit to allow toggle 1+ to be off.
var thesparezeros = "00000000000000000000000000"; // A constant of 26 0's to be used to pad the storage state of the toggles when converting between base 2 and 36, this is to be compact.
var toggleState;
var wwwroot;
var courseid;
var numToggles = 0;
var togglePersistence = 1; // Toggle persistence - 1 = on, 0 = off.
var mobiletheme = false;
var sesskey;
var dtheme;
var savethetoggles = true;

/**
 * Initialise with the information supplied from the course formats 'format.php' so we can operate.
 * @param {String} thewwwroot the value of $CFG->wwwroot.
 * @param {Integer} thecourseid the id of the current course to allow for settings for each course.
 * @param {String} thetogglestate the current state of the toggles.
 * @param {Integer} noOfToggles The number of toggles.
 * @param {Integer} theTogglePersistence Persistence on (1) or off (0).
 * @param {String} thesesskey Session key for saving the toggle state using user preference AJAX.
 * @param {String} thetheme Theme swatch letter.
 */
function moobile_format_topcoll_init(thewwwroot, thecourseid, thetogglestate, noOfToggles, theTogglePersistence, thesesskey, thetheme) {
    "use strict";
    // Init.
    wwwroot = thewwwroot;
    courseid = thecourseid;
    toggleState = thetogglestate;
    numToggles = noOfToggles;
    togglePersistence = theTogglePersistence;
    sesskey = thesesskey;
    dtheme = thetheme;

    if (toggleState !== undefined)
    {
        toggleBinaryGlobal = moobile_format_topcoll_to2baseString(toggleState);
    }
    else
    {
        // Reset to default.
        toggleBinaryGlobal = "10000000000000000000000000000000000000000000000000000";
    }
    
    // Style and event handlers for the toggles.
    var textalign = $('.toggle a').first().css('text-align');
    for (var theToggle = 1; theToggle <= numToggles; theToggle++)
    {
        var toggler = $("#toggle-" + theToggle);
        var toggledsection = $("#toggledsection-" + theToggle);
        var togglelink = toggler.children('a');
        var toggleclosed = togglelink.hasClass('toggle_closed');
        var toggletitle = togglelink.children('h3').detach();

        toggledsection.prepend(toggletitle);
        toggledsection.attr('data-role', 'collapsible');
        toggledsection.attr('data-collapsed',toggleclosed.toString());
        toggledsection.attr('data-collapsed-icon', 'arrow-r');
        toggledsection.attr('data-expanded-icon', 'arrow-d');
        toggledsection.attr('data-content-theme', dtheme);
        toggledsection.show();
        toggler.remove();
		
        if (toggledsection !== null)
        {
            //console.log(instance);
            //console.info('ToggleEV num:'+theToggle);
            //Y.one("#toggle-" + theToggle).on('click', instance.handleClick, instance);
            toggledsection.bind("collapse", theToggle, function(event, ui) {
                moobile_format_topcoll_toggle_topic(false,event.data);
            }
            );
            toggledsection.bind("expand", theToggle, function(event, ui) {
                moobile_format_topcoll_toggle_topic(true,event.data);
            }
            );
        }
    }
   
    // Event handlers for all opened / closed.
    var allopen = $("#toggles-all-opened");
    if (allopen !== null) {
        allopen.unbind();
        allopen.click(function(event){
            event.preventDefault();
            moobile_format_topcoll_all_opened();
        });
    }
    var allclosed = $("#toggles-all-closed");
    if (allclosed !== null) {
        allclosed.unbind();
        allclosed.click(function(event){
            event.preventDefault();
            moobile_format_topcoll_all_closed();
        });
    }
	
    var toggleallsectiondiv = $('#toggle-all-and-settings .sectionbody');
    toggleallsectiondiv.attr('data-role', 'controlgroup');
    toggleallsectiondiv.attr('data-type', 'horizontal');
    toggleallsectiondiv.attr('data-mini', 'true');
    var toggleallopen = toggleallsectiondiv.children('#toggles-all-opened');
    toggleallopen.attr('data-role', 'button');
    toggleallopen.attr('data-icon', 'arrow-r');
    toggleallopen.removeClass('on');
    toggleallopen.removeAttr('id');
    var toggleallclosed = toggleallsectiondiv.children('#toggles-all-closed');
    toggleallclosed.attr('data-role', 'button');
    toggleallclosed.attr('data-icon', 'arrow-d');
    toggleallclosed.removeClass('off');
    toggleallclosed.removeAttr('id');
    $('#toggle-all-and-settings').removeAttr('id'); // Get rid of styling.
    $('.ctopics').trigger('create');
	
    // Apply style after styling to be effective...
    $('.toggledsection h3 a').each( function() {
        $(this).css('text-align', textalign);
    });
}

// Change the toggle binary global state as a toggle has been changed - toggle number 0 should never be switched as it is the most significant bit and represents the non-toggling topic 0.
// Args - toggleNum is an integer and toggleVal is a string which will either be "1" or "0"
function moobile_format_topcoll_togglebinary(toggleNum, toggleVal)
{
    "use strict";
    // Toggle num should be between 1 and 52 - see definition of toggleBinaryGlobal above.
    if ((toggleNum >=1) && (toggleNum <= 52))
    {
        // Safe to use.
        var start = toggleBinaryGlobal.substring(0,toggleNum);
        var end = toggleBinaryGlobal.substring(toggleNum+1);
        toggleBinaryGlobal = start + toggleVal + end;
        
        if (savethetoggles === true) 
        {
            moobile_format_topcoll_save_toggles();
        }
    }
}

// Toggle functions
// Args - expand if true then the toggle has been opened otherwise false.
//        toggleNum is the toggle number to change.
//        reloading is a boolean that states if the function is called from reload_toggles() so that we do not have to resave what we already know - ohh for default argument values.
function moobile_format_topcoll_toggle_topic(expand, toggleNum)  // Toggle the target and change the image.
{
    "use strict";

    //console.log(expand);
    //console.info('Toggle num:'+toggleNum);

    if (expand === false)
    {
        // Save the toggle!
        moobile_format_topcoll_togglebinary(toggleNum, "0");
    }
    else
    {
        // Save the toggle!
        moobile_format_topcoll_togglebinary(toggleNum, "1");
    }
}

// Current maximum number of topics is 52, but as the converstion utilises integers which are 32 bit signed, this must be broken into two string segments for the
// process to work.  Therefore each 6 character base 36 string will represent 26 characters for part 1 and 27 for part 2 in base 2.
// This is all required to save cookie space, so instead of using 53 bytes (characters) per course, only 12 are used.
// Convert from a base 36 string to a base 2 string - effectively a private function.
// Args - thirtysix - a 12 character string representing a base 36 number.
function moobile_format_topcoll_to2baseString(thirtysix)
{
    "use strict";
    // Break apart the string because integers are signed 32 bit and therefore can only store 31 bits, therefore a 53 bit number will cause overflow / carry with loss of resolution.
    var firstpart = parseInt(thirtysix.substring(0,6),36);
    var secondpart = parseInt(thirtysix.substring(6,12),36);
    var fps = firstpart.toString(2);
    var sps = secondpart.toString(2);
    
    // Add in preceding 0's if base 2 sub strings are not long enough
    if (fps.length < 26)
    {
        // Need to PAD.
        fps = thesparezeros.substring(0,(26 - fps.length)) + fps;
    }
    if (sps.length < 27)
    {
        // Need to PAD.
        sps = thesparezeros.substring(0,(27 - sps.length)) + sps;
    }
    
    return fps + sps;
}

// Convert from a base 2 string to a base 36 string - effectively a private function.
// Args - two - a 52 character string representing a base 2 number.
function moobile_format_topcoll_to36baseString(two)
{
    "use strict";
    // Break apart the string because integers are signed 32 bit and therefore can only store 31 bits, therefore a 52 bit number will cause overflow / carry with loss of resolution.
    var firstpart = parseInt(two.substring(0,26),2);
    var secondpart = parseInt(two.substring(26,53),2);
    var fps = firstpart.toString(36);
    var sps = secondpart.toString(36);

    // Add in preceding 0's if base 36 sub strings are not long enough
    if (fps.length < 6)
    {
        // Need to PAD.
        fps = thesparezeros.substring(0,(6 - fps.length)) + fps;
    }
    if (sps.length < 6)
    {
        // Need to PAD.
        sps = thesparezeros.substring(0,(6 - sps.length)) + sps;
    }

    return fps + sps;
}

// AJAX call to server to save the state of the toggles for this course for the current user.
// Args - value is the base 36 state of the toggles.
function moobile_format_topcoll_savetogglestate(value)
{
    "use strict";
    if (togglePersistence === 1) // Toggle persistence - 1 = on, 0 = off.
    {
        //M.util.set_user_preference('topcoll_toggle_'+courseid , value);
        var name = 'topcoll_toggle_' + courseid;
        var url = wwwroot+'/lib/ajax/setuserpref.php?sesskey='+
        sesskey+'&pref='+encodeURI(name)+'&value='+
        encodeURI(value);
        $.get(url).fail(function() {
            alert("Error updating toggle, check connection / login status.");
        });
    }
}

// Save the toggles - called from togglebinary and allToggle.
function moobile_format_topcoll_save_toggles()
{
    "use strict";
    moobile_format_topcoll_savetogglestate(moobile_format_topcoll_to36baseString(toggleBinaryGlobal));
}

// Functions that turn on or off all toggles.
// Alter the state of the toggles.  Where 'state' needs to be true for open and false for close.
function moobile_format_topcoll_allToggle(state)
{
    "use strict";
    var trigger;

    if (state === true)
    {
        trigger = "expand";
    }
    else
    {
        trigger = "collapse";
    }

    // Defer saving...
    savethetoggles = false;
    // Trigger all...
    for (var theToggle = 1; theToggle <= numToggles; theToggle++)
    {
        $( "#toggledsection-"+theToggle ).trigger(trigger);
    }
    // Now save the state of the toggles for efficiency...
    moobile_format_topcoll_save_toggles();
    // Turn back on...
    savethetoggles = true;
}

// Open all toggles.
function moobile_format_topcoll_all_opened()
{
    "use strict";
    moobile_format_topcoll_allToggle(true);
}

// Close all toggles.
function moobile_format_topcoll_all_closed()
{
    "use strict";
    moobile_format_topcoll_allToggle(false);
}