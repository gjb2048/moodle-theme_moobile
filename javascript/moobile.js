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
 * jQueryMobile customisations for the moobile theme.
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

// Notes:
// For jQuery 1.9.1 no .live changed to .on - http://jquery.com/upgrade-guide/1.9/#live-removed - causes issues that need to be looked at like navigation not working in assignment.
// Implemented MDL-33934-2 as appropriate.
// Implemented MDL-33934-3 as appropriate.
// Implemented MDL-31342.
// Cleaned through use of http://jshint.com/.

$(document).bind("mobileinit", function() {
    "use strict";
    $.mobile.defaultPageTransition = "slide";
});

var siteurl = $('head meta[name=wwwroot]').attr('wwwroot');
var dtheme = $('head meta[name=datatheme]').attr('datatheme');

// Function below does generic stuff before creating all pages...
$('div').live('pagebeforecreate', function() {
    "use strict";
    //alert( 'This page was just enhanced by jQuery Mobile2!' );
    // Turn off ajax on all forms.
    $('form').attr("data-ajax", "false");

    //$('#page-site-indexPAGE a').attr("data-ajax", "false"); // For Collapsed Topics to work.

    $('#page-site-indexPAGE .teachers').remove(); // Remove listed teachers as their rendering causes a bottom border issue.

    // Lesson.
    $('.lessonbutton.standardbutton a').attr("data-role", "button");
    $('#page-mod-lesson-viewPAGE div.fitemtitle label').addClass("afirst");

    // Tablet column removal switch.
    $('.slider').live("change",function() {
        var slids = $(this).val();
        M.util.set_user_preference('theme_moobile_chosen_colpos', slids);
        if (slids === "off") {
            $('.ui-page-active').removeClass("has-myblocks");
        } else {
            $('.ui-page-active').addClass("has-myblocks");
        }
    });

    // Tinymce editor removal switch - MDL-31342
    $('#mooeditor').live("change",function() {
        var slids = $(this).val();
        M.util.set_user_preference('theme_moobile_chosen_editor', slids);
        $.mobile.showPageLoadingMsg();
        if ($(this).hasClass('notwide')) {  // When $gowide = (($mydevice == 'default' && $showusetableview == 'tabshow') || ($mydevice == 'tablet' && $showusetableview == 'tabshow')); is false.
            window.setTimeout(function() {
                window.location.href=siteurl;
            }, 1500);
        } else {
            window.setTimeout(function() {
                window.location.href=window.location.href;
            }, 1500);
        }
    });

    // tabs- links set to external to fix forms,
    $('div.tabtree ul.tabrow0').attr("data-role", "controlgroup");
    $('div.tabtree ul.tabrow12').attr("data-role", "controlgroup");
    $('div.tabtree li a').attr("data-role", "button").attr("data-ajax", "false");

    // Jump to current or bottom.
    $('a.jumptocurrent').live('tap', function() {
        var position = $(".ui-page-active .section.current").position();
        if (!position) {
            position = $(".ui-page-active .mobilefooter").position();
        }
        $.mobile.silentScroll(position.top);
        $(this).removeClass("ui-btn-active");
        return false;
    });

    // Scroll to top.
    $('a#uptotop').live('tap', function() {
        var position = $(".ui-page-active").position();
        $.mobile.silentScroll(position.top);
        $(this).removeClass("ui-btn-active");
        return false;
    });

    // Remove message notifcation overlay on tap 21/6/11.
    $('a#notificationno').on('tap', function() {
        $('#newmessageoverlay').remove();
        return false;
    });

    // Calendar and other links that need to be external.
    $('.maincalendar .filters a, li.activity.scorm a, div.files a, #page-user-filesPAGE li div a, .maincalendar .bottom a, .section li.url.modtype_url a, .resourcecontent .resourcemediaplugin a, #underfooter .noajax a, .block_mnet_hosts .content a, .block_private_files .content a, a.portfolio-add-link, #attempts td a, .settingsul li a, .foldertree li a').attr("data-ajax", "false");

    // Add blank to open in window for some.
    $('#page-mod-url-viewPAGE div.urlworkaround a, #page-mod-resource-viewPAGE div.resourceworkaround a, .mediaplugin a.mediafallbacklink, #page-mod-resource-viewPAGE .resourcemp3 a, .foldertree li a').attr("target", "_blank").attr("data-role", "button").attr("data-icon", "plus");

    // General stuff.
    $('form fieldset').attr("data-role", "fieldcontain");
    $('form .fitem').attr("data-role", "fieldcontain");

    // Submit button for forum.
    $('#page-mod-url-viewPAGE div.urlworkaround a').attr("data-role", "button");

    // Survey form fix.
    $('#surveyform').attr("action", siteurl + '/mod/survey/save.php');
    // Nav select navigation NEW
    $(".navselect").live("change", function() {
        var meb = encodeURI($(this).val());
        $(this).val("-1");
        if (meb !== "" && meb !== "-1") {
            $.mobile.showPageLoadingMsg();
            $.mobile.changePage(meb, {
                reloadPage: true
            }); // Reloads the page to cope with URI's that are the same page, otherwise icon always shows.
        }
    });
});

// Collapsed topic only stuff.
$('div#page-course-view-topcollPAGE').live('pagebeforecreate', function() {
    "use strict";

    $.getScript(siteurl+'/theme/moobile/javascript/topcoll_module.js', function() {

        var topcollmobiledata = $('#topcoll_mobile_data');
        var thecourseid = topcollmobiledata.attr('courseid');
        var thetogglestate = topcollmobiledata.attr('togglestate');
        var noOfToggles = topcollmobiledata.attr('numberoftoggles');
        var theTogglePersistence = topcollmobiledata.attr('togglepersistence');
        var thesesskey = topcollmobiledata.attr('sesskey');
        moobile_format_topcoll_init(siteurl, thecourseid, thetogglestate, noOfToggles, theTogglePersistence, thesesskey, dtheme);
    });
});

// Course page only javascript.
$('div.path-course-view, .path-course-view div.generalpage').live('pagebeforecreate', function() {
    "use strict";
    // Course listing.
    $('.section li img').addClass("ui-li-icon");
    // Note: For split list views the default theme is "b" so needs to be set - see http://jquerymobile.com/demos/1.2.0/docs/lists/lists-themes.html 
    $('.course-content ul.section').attr("data-role", "listview").attr("data-inset", "true").attr("data-theme", dtheme).attr("data-split-theme", dtheme);
    $('.sitetopic ul.section').attr("data-role", "listview").attr("data-inset", "true").attr("data-theme", dtheme).attr("data-split-theme", dtheme);
    $('.section-navigation.header.headingblock, .section-navigation.mdl-bottom').attr("data-role", "controlgroup");
    $('.section-navigation.header.headingblock .mdl-left a, .section-navigation.mdl-bottom .mdl-left a').attr("data-role", "button").attr("data-icon", "arrow-l");
    $('.section-navigation.header.headingblock .mdl-right a, .section-navigation.mdl-bottom .mdl-right a').attr("data-role", "button").attr("data-icon", "arrow-r").attr("data-iconpos", "right");
    $('.section-navigation.header.headingblock .mdl-align.title, .section-navigation.mdl-bottom .mdl-align a').attr("data-role", "button");
    $('.topics div.left.side').addClass("ui-bar-" + dtheme);
    $('.section.hidden div.headingwrap').attr("data-theme", dtheme);
    //$('.topics #section-0 div.left.side').removeClass("ui-li ui-li-divider ui-btn ui-bar-a");
    $('h3.section-title a').attr("data-role", "button");
    $('.section .resource.modtype_resource a, .section .modtype_survey a').attr("data-ajax", "false");

    // Toggle completion checkmarks and form fixes.
    $('.togglecompletion input[type="image"]').attr("data-role", "none");
    $('.togglecompletion input[type="image"]').click(function() {
        $(".section .togglecompletion").attr("action", '');
        var mylocc = siteurl + "/course/togglecompletion.php";
        $(".section .togglecompletion").attr("action", mylocc);
        this.form.submit();
        return false;
    });

    $('.contentafterlink a.autolink').each(function() {
        // Clone us such that the split list button remains the same after the strip.
        var us = $(this).clone();
        $(this).parent().append(us);
        // Strip out the inner 'a.autolink' of a 'p' on a 'contentafterlink' such that descriptions are shown.
        $(this).replaceWith(function() {
            return $(this).contents();
        });
    });
});

// Forum listing only stuff.
$('div#page-mod-forum-viewPAGE, #page-mod-forum-view div.generalpage').live('pagebeforecreate', function() {
    "use strict";
    // Forums listing change theme for other theme.
    $('table.forumheaderlist').attr("data-role", "controlgroup");
    $('table.forumheaderlist thead tr').attr("data-role", "button").attr("data-theme", dtheme);
    $('table.forumheaderlist td.topic a').attr("data-role", "button").attr("data-icon", "arrow-r").attr("data-iconpos", "right").attr("data-theme", dtheme);
});

$('div#page-mod-forum-viewPAGE').live('pageinit', function() {
    "use strict";
    $('.forumheaderlist td.topic').each(function(index) {
        var ggg = $(this).nextAll("td.replies").text();
        $(this).find('a').append('<span class="ui-li-count ui-btn-up-a ui-btn-corner-all"> ' + ggg + '</span>');
    });
});

// Forum discussion page only stuff.
$('div#page-mod-forum-discussPAGE, #page-mod-forum-discuss div.generalpage, div.forumtype-single, .forumtype-single div.generalpage, div#page-mod-forum-postPAGE').live('pagebeforecreate', function() {
    "use strict";
    // Remove parent post because of hash remove this if has listening is fixed.
    $('.options div.commands a').each(function(index) {
        var url = $(this).attr("href");
        if (url.indexOf("#") !== -1) {
            $(this).remove();
        }
    });

    // Actual forum posting.
    $('.forumpost div.row.header').addClass("ui-li ui-li-divider ui-btn ui-bar-" + dtheme);
    $('.options div.commands').attr("data-role", "controlgroup").attr("data-type", "horizontal");
    $('.options div.commands a').attr("data-role", "button").attr("data-ajax", "false").attr("data-mini", "true").attr("data-inline", "true");
    $('.forumpost div.author a').attr("data-inline", "true");
    $('.options div.commands').contents().filter(function() {
        return this.nodeType === 3; //Node.TEXT_NODE
    }).remove();
// Function above removes | in div.commands.
});

// Frontpage only stuff.
$('div#page-site-indexPAGE, div.pagelayout-coursecategory').live('pagebeforecreate', function() {
    "use strict";
    // Course boxes on category pages and front page stuff.
    // Forum posts on front page only.
    $('.forumpost div.row.header').addClass("ui-li ui-li-divider ui-btn ui-bar-" + dtheme);
    $('div.subscribelink a').attr("data-role", "button").attr("data-inline", "true");
    $('.unlist').attr("data-role", "controlgroup");
    $('div.coursebox a').attr("data-role", "button").attr("data-icon", "arrow-r").attr("data-iconpos", "right").attr("data-theme", dtheme);
    $('.box.categorybox').attr("data-role", "controlgroup");
    $('div.categorylist div.category a').attr("data-role", "button").attr("data-theme", dtheme);
    $('#shortsearchbox, #coursesearch2 #shortsearchbox').attr("data-type", "search");
});

$('div#page-site-indexPAGE').live('pageinit', function() {
    "use strict";
    $('div.categorylist div.category').each(function(index) {
        var ggb = $(this).find("span.numberofcourse").text().replace('(','').replace(')','');
        if (ggb !== "") {
            $(this).find('a').append('<span class="ui-li-count ui-btn-corner-all">' + ggb + '</span>');
        }
    });
});

// Coursepage only stuff.
$('div#page-course-indexPAGE').live('pagebeforecreate', function() {
    "use strict";
    // Course boxes on category pages and course page stuff.
    $('div.subscribelink a').attr("data-role", "button").attr("data-inline", "true");
    $('.unlist').attr("data-role", "controlgroup");
    $('.unlist li:last-child div.coursebox h3 a').addClass("ui-corner-bottom ui-controlgroup-last");
    $('div.coursebox a').attr("data-role", "button").attr("data-icon", "arrow-r").attr("data-iconpos", "right").attr("data-theme", dtheme);
    $('.box.categorybox').attr("data-role", "controlgroup");
});

// Chat only stuff.
$('div#chatpage, div.path-mod-chat').live('pagebeforecreate', function() {
    "use strict";
    $('#input-message, #button-send').attr("data-role", "none");
    $('#enterlink a').attr("data-role", "button").attr("data-ajax", "false").attr("data-icon", "plus");
    $('form, input, button').attr("data-ajax", "false");
});

// Login page only stuff.
$('div#page-login-indexPAGE').live('pagebeforecreate', function() {
    "use strict";
    //signup form fix
    $('.path-login .signupform #signup').attr("action", siteurl + '/login/signup.php');
    $('.path-login #guestlogin').attr("action", siteurl + '/login/index.php');
});

// Messaging only stuff.
$('div#page-message-indexPAGE').live('pagebeforecreate', function() {
    "use strict";
    // Below to fix form actions here and there.
    $("#usergroupform").attr("action", '');
    //if (userform == "") {
    var myloc = siteurl + "/message/index.php";
    $("#usergroupform").attr("action", myloc);
    // Messaging links.
    $('.path-message td.link').attr("data-role", "controlgroup").attr("data-type", "horizontal");
    $('.path-message td.link a').attr("data-role", "button").attr("data-inline", "true");
});

// Database and glossary only stuff.
$('div#page-mod-data-viewPAGE, div#page-mod-glossary-viewPAGE').live('pagebeforecreate', function() {
    "use strict";
    $('.defaulttemplate td a').attr("data-role", "button").attr("data-ajax", "false").attr("data-inline", "true");
    $('#options select, .aliases select').attr("data-native-menu", "true");
    $('#pref_search, .glossarysearchbox input[type="text"]').attr("data-type", "search");
    $('#options').attr("action", siteurl + '/mod/data/view.php');
    $('#page-mod-glossary-viewPAGE form').each(function(index) {
        var glossform = $(this).attr("action");
        if (glossform === "view.php") {
            $(this).attr("action", siteurl + '/mod/glossary/view.php');
        }
    });
});

// Moobile only stuff.
$('div#page-my-indexPAGE').live('pagebeforecreate', function() {
    "use strict";
    // Moobile page fixes.
    // Block_course_overview.
    $('.block_course_overview div.headingwrap').attr("data-role", "none");
    $('.block_course_overview h3.main a').attr("data-theme", dtheme);
});

// Resource only stuff to help embedded PDFs, provides link to open in new window.
$('div#page-mod-resource-viewPAGE').live('pagebeforecreate', function() {
    "use strict";
    $('div.resourcepdf').each(function(index) {
        var thisopen = $(this).find('#resourceobject').attr("data");
        $(this).append('<a class="mobileresource" href="' +thisopen+ '" target="_blank"></a>');
    });
});

// Quiz page only javascript.
$('div#page-mod-quiz-viewPAGE, div#page-mod-quiz-attemptPAGE, div#page-mod-quiz-summaryPAGE, div#page-mod-quiz-reviewPAGE, #page-mod-quiz-attempt #content2').live('pagebeforecreate', function() {
    "use strict";
    // Add quiz timer into quiz page.
    $('#quiz-timer').remove();
    $('.moobilecontent').prepend('<div id="quiz-timer" > <span id="quiz-time-left"></span></div>');
    $('.que .info').addClass("ui-bar-" + dtheme);
    $('.que input.submit').attr("data-role", "none");
    $('div.submitbtns a, div.quizattemptcounts a').attr("data-role", "button").attr("data-ajax", "false");
    $('#page-mod-quiz-attemptPAGE .questionflag input, .path-mod-quiz .questionflag input').attr("data-role", "none");
});

// Assignment page only stuff.
$('#page-mod-assignment-viewPAGE').live('pagebeforecreate', function() {
    "use strict";
    //below fixes the advanced upload edit notes button
    $('#page-mod-assignment-viewPAGE div[rel="upload.php"]').parent().attr("action", siteurl + '/mod/assignment/upload.php');
});

$('#page-mod-assign-viewPAGE').live('pagebeforecreate', function() {
    "use strict";
    $('div.submissionlinks a').attr('data-role', 'button');
});

// Hotpot page only stuff.
$('div.path-mod-hotpot').live('pagebeforecreate', function() {
    $('.path-mod-hotpot button').attr("data-role", "none");
});

// Book only stuff.
$('#page-mod-book-viewPAGE').live('pagebeforecreate', function() {
    // Fix 'Exit book' link not working with blunderbuss approach.
    $('a').unbind().click(function(event) {
        event.preventDefault();
        var url = $(this).attr('href');    
        //console.log(url);
        window.location.href = url;
    });
});    

// Choice only stuff.
$('#page-mod-choice-viewPAGE').live('pagebeforecreate', function() {
    $('.reportlink a').attr('data-role', 'button');
});

//$('#page-mod-choice-reportPAGE').live('pagebeforecreate', function() {
//    $('.user input').each( function(){
//       var 
//    });
//});

// Lesson only stuff.
$('#page-mod-lesson-editPAGE').live('pagebeforecreate', function() {
    $('.firstpageoptions a').attr('data-role', 'button');
    $('.addlinks').attr('data-role', 'controlgroup').attr('data-mini', 'true').attr('data-type', 'horizontal').attr('data-mini', 'true');
    
    // Strip out the text dividers between the 'a' tags.
    $('.addlinks').each(function() {
        var $children = $(this).children();
        $(this).html("").append($children);
    });

    $('.addlinks a').each(function() {
        $(this).attr('data-role', 'button');
    });
});

// Functions below does stuff after creating page for some cleaning...
$('body').live('pageinit', function() {
    "use strict";

    if ($('body').hasClass('ajaxno')) {
        $.mobile.ajaxEnabled = false;
    }
    
    $('div#page-site-indexPAGE .unlist li:last-child div.coursebox h3 a').addClass("ui-corner-bottom ui-controlgroup-last");
    $('.path-calendar div.ui-radio label:first-child, .path-mod-lesson div.ui-radio label:first-child, #page-mod-wiki-createPAGE div.ui-radio label:first-child').addClass("afirst");
    $('.forumpost div.author a').removeAttr('data-role');
    //$('.questionflagimage2').removeClass("ui-btn-hidden");a#notificationyes
    // Image replacement.
    $(this).find(".ithumb .course-content .summary img, .ithumb .course-content .activity.label img, .ithumb .sitetopic .no-overflow img").click(function() {
        var turl = $(this).attr("src");
        window.open(turl);
    });
});