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
 * General layout for the moobile theme.
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
$toblock = optional_param('moobile_blocks', false, PARAM_BOOL);
$toset = optional_param('moobile_settings', false, PARAM_BOOL);

$mypagetype = $PAGE->pagetype;
$mylayoutype = $PAGE->pagelayout;
$mydevice = $PAGE->devicetypeinuse;

if (!empty($PAGE->theme->settings->colourswatch)) {
    $dtheme = $PAGE->theme->settings->colourswatch;
} else {
    $dtheme = 'a';
}

// Custom settings:
$hasshowmobileintro = (!empty($PAGE->theme->settings->showmobileintro));

if (!empty($PAGE->theme->settings->showfullsizeimages)) {
    $hasithumb = $PAGE->theme->settings->showfullsizeimages;
} else {
    $hasithumb = 'ithumb';
}

if (!empty($PAGE->theme->settings->showsitetopic)) {
    $showsitetopic = $PAGE->theme->settings->showsitetopic;
} else {
    $showsitetopic = 'topicnoshow';
}

if (!empty($PAGE->theme->settings->usetableview)) {
    $showusetableview = $PAGE->theme->settings->usetableview;
} else {
    $showusetableview = 'tabshow';
}

if (!empty($PAGE->theme->settings->useajax)) {
    $useajax = $PAGE->theme->settings->useajax;
} else {
    $useajax = 'ajaxyes';
}

if ($mylayoutype == 'course') {
    // Jump to current topic only in course pages.
    $jumptocurrent = 'true';
} else {
    $jumptocurrent = 'false';
}

// Below sets a URL variable to use in some links.
$urlblocks = new moodle_url($PAGE->url, array('moobile_blocks' => 'true'));
$urlsettings = new moodle_url($PAGE->url, array('moobile_settings' => 'true'));

$hasheading = ($PAGE->heading);
$hasnavbar = (empty($PAGE->layout_options['nonavbar']) && $PAGE->has_navbar());
$hasfooter = (empty($PAGE->layout_options['nofooter']));
$hasmyblocks = $PAGE->blocks->region_has_content('myblocks', $OUTPUT);

$bodyclasses = array();
// Add ithumb class to decide whether to show or hide images and site topic.
$bodyclasses[] = (string) $hasithumb;
$bodyclasses[] = (string) $showsitetopic;
$bodyclasses[] = (string) $useajax;

$gowide = (($mydevice == 'default' && $showusetableview == 'tabshow') || ($mydevice == 'tablet' && $showusetableview == 'tabshow'));
if ($gowide) {
    // Initialize column position choices.
    moobile_initialise_colpos($PAGE);
}
$usercol = (moobile_get_colpos() == 'on');

// Tinymce editor on or off.
moobile_initialise_editor($PAGE);
$usereditor = (moobile_get_editor() == 'on');

$renderer = $PAGE->get_renderer('theme_moobile');

echo $OUTPUT->doctype()
?>
<html id="moobile" <?php echo $OUTPUT->htmlattributes() ?>>
    <head>
        <!-- empty metas with info for the jQuery to use -->
        <meta name="wwwroot" wwwroot="<?php p($CFG->wwwroot); ?>" />
        <meta name="datatheme" datatheme="<?php echo $dtheme; ?>" />
        <!-- end jQuery metas -->

        <title><?php echo $PAGE->title ?></title>
        <link rel="shortcut icon" href="<?php echo $OUTPUT->pix_url('favicon', 'theme') ?>" />
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?php echo $OUTPUT->pix_url('moo114', 'theme') ?>" />
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?php echo $OUTPUT->pix_url('moo72', 'theme') ?>" />
        <link rel="apple-touch-icon-precomposed" href="<?php echo $OUTPUT->pix_url('moo320_460', 'theme') ?>" />

        <meta name="description" content="<?php echo strip_tags(format_text($SITE->summary, FORMAT_HTML)) ?>" />
        <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1" />

        <?php echo $OUTPUT->standard_head_html() ?>
    </head>
    <body id="<?php p($PAGE->bodyid) ?>" class="<?php p($PAGE->bodyclasses . ' ' . join(' ', $bodyclasses)) ?>" data-theme="<?php echo $dtheme; ?>">
        <?php echo $OUTPUT->standard_top_of_body_html() ?>
        <div id="<?php p($PAGE->bodyid) ?>PAGE" data-role="page" class="generalpage <?php echo 'ajaxedclass ';
        p($PAGE->bodyclasses . ' ' . join(' ', $bodyclasses)); ?> <?php if ($hasmyblocks && $usercol) {
            echo 'has-myblocks';
        } ?> " data-theme="<?php echo $dtheme; ?>" data-title="<?php p($SITE->shortname) ?>">
            <!-- start header -->
            <div data-role="header" data-theme="<?php echo $dtheme; ?>" class="moobileheader"> <!-- Implemented MDL-33934-2 as appropriate. -->
                <h1><?php echo $PAGE->heading ?></h1>
                <?php if (isloggedin() && $mypagetype != 'site-index') { ?>
                    <a class="ui-btn-right" data-icon="home" href="<?php p($CFG->wwwroot) ?>" data-iconpos="notext" data-ajax="false"><?php p(get_string('home')); ?></a>
<?php
} else if (!isloggedin()) {
    echo $OUTPUT->login_info();
}
?>
                <!-- start navbar -->
                <div data-role="navbar">
                    <ul>
                        <?php if (!$gowide && !$hasmyblocks && !$toblock && $mypagetype == "mod-quiz-attempt" || !$gowide && !$hasmyblocks && !$toblock && $mylayoutype != "incourse") { ?>
                            <li><a data-theme="<?php echo $dtheme; ?>" class="blockload" href="<?php echo $urlblocks->out(); ?>"><?php p(get_string('blocks')); ?></a></li>
                        <?php } ?>
                        <?php if (!$toset) { ?>
                            <li><a data-theme="<?php echo $dtheme; ?>" href="<?php echo $urlsettings->out(); ?>"><?php p(get_string('settings')); ?></a></li>
                        <?php } ?>
                        <?php if ($jumptocurrent == 'true' && !$toblock && !$toset) { ?>
                            <li><a data-theme="<?php echo $dtheme; ?>" class="jumptocurrent" href="#"><?php p(get_string('jump')); ?></a></li>
<?php } ?>
<?php if (isloggedin() && $hasnavbar) { ?>
                            <li><?php echo $OUTPUT->navbar(); ?></li>
<?php } ?>
                    </ul>
                </div>
                <!-- end navbar -->
            </div>
            <div id="page-header"><!-- empty page-header needed by moodle yui --></div>
            <!-- end header -->

            <!-- main content -->
            <div data-role="content" class="moobilecontent" data-theme="<?php echo $dtheme; ?>">
                <?php if ($toset) {  // If we get the true, that means load/show settings only. ?>
                    <h2 class="jsets"><?php p(get_string('settings')); ?></h2>
    <?php
    // Load lang menu if available.
    echo $OUTPUT->lang_menu();
    ?>
                    <?php if (!$gowide) { ?>
                        <label for="mooeditor"><?php p(get_string('editortoggle', 'theme_moobile')); ?>:</label>
                        <select name="mooeditor" id="mooeditor" class="mooeditor notwide" data-role="slider" data-track-theme="<?php echo $dtheme; ?>">
                            <option value="on" >On</option>
                            <option value="off" <?php if (!$usereditor) { ?>selected="selected"<?php } ?>>Off</option>
                        </select>
                    <?php } ?>
                    <ul data-role="listview" data-theme="<?php echo $dtheme; ?>" data-dividertheme="<?php echo $dtheme; ?>" data-inset="true" class="settingsul">
    <?php echo $renderer->settings_tree($PAGE->settingsnav); ?>
                    </ul>
                            <?php echo $OUTPUT->login_info(); ?>
                        <?php } ?>

                <div class="content-primary">
                    <div class="region-content <?php if ($toblock) {
                            echo 'mobile_blocksonly';
                        } ?>" id="themains">
                        <?php
                        // Only show main content if we are not showing anything else.
                        if (!$toblock && !$toset) {
                            ?>
                    <?php if ($hasshowmobileintro && $mypagetype == 'site-index') { ?>
                        <?php echo $PAGE->theme->settings->showmobileintro; ?>
    <?php } ?>
    <?php echo $OUTPUT->main_content(); ?>
<?php } ?>
                    </div>
                </div>

                    <?php if ($gowide && $hasmyblocks && !$toset) {
                        // If we get the true, that means load/show blocks only for tablet views only. 
                        ?>
                    <div class="content-secondary">
                        <div class="tablets">
                            <h1><?php echo $PAGE->heading ?></h1>
                            <span><?php echo $PAGE->course->summary; ?></span>
                        </div>

    <?php if ($hasmyblocks) { ?>
                            <div data-role="collapsible-set" data-theme="<?php echo $dtheme; ?>">
                                        <?php echo $OUTPUT->blocks_for_region('myblocks') ?>
                            </div>
    <?php } ?>

    <?php if ($gowide && isloggedin() && !isguestuser()) { ?>

                            <div data-role="collapsible" data-collapsed="false" data-theme="<?php echo $dtheme; ?>" data-content-theme="<?php echo $dtheme; ?>" id="profcol">
                                <h3><?php p('' . $USER->firstname . ' ' . $USER->lastname . ''); ?></h3>
                                <div class="ui-grid-a">
                                    <div class="ui-block-<?php echo $dtheme; ?>">
        <?php echo html_writer::tag('div', $OUTPUT->user_picture($USER, array('size' => 80)), array('class' => 'userimg')); ?>
                                    </div>
                                    <div class="ui-block-<?php echo $dtheme; ?>">
                                        <a data-role="button" data-icon="home" href="<?php p($CFG->wwwroot) ?>/my/"><?php p(get_string('myhome')); ?></a>
                                        <a data-role="button" data-icon="info" href="<?php p($CFG->wwwroot) ?>/user/profile.php"><?php p(get_string('myprofile')); ?></a>
                                        <a data-role="button" data-icon="back" data-ajax="false" href="<?php p($CFG->wwwroot) ?>/login/logout.php"><?php p(get_string('logout')); ?></a>
                                    </div>
                                </div>
                            </div>

                            <div data-role="fieldcontain" id="sliderdiv">
                                <label for="slider"><?php p(get_string('mtoggle', 'theme_moobile')); ?>:</label>
                                <select name="slider" class="slider" data-role="slider">
                                    <option value="on">On</option>
                                    <option value="off">Off</option>
                                </select>
                                <div class="clearfix">
                                    <label for="mooeditor2"><?php p(get_string('editortoggle', 'theme_moobile')); ?>:</label>
                                    <select name="mooeditor2" id="mooeditor" class="mooeditor" data-role="slider" data-track-theme="<?php echo $dtheme; ?>">
                                        <option value="on" >On</option>
                                        <option value="off" <?php if (!$usereditor) { ?>selected="selected"<?php } ?>>Off</option>
                                    </select>
                                </div>
                            </div>

                    <?php } else if (!isloggedin() || isguestuser()) { ?>
                            <a data-role="button" data-theme="<?php echo $dtheme; ?>" data-ajax="false" href="<?php p($CFG->wwwroot) ?>/login/index.php"><?php p(get_string('login')); ?></a>
    <?php } ?>
                    </div>
                <?php } ?>

                <?php
                if ($toblock && !$gowide) {
                    // Regular block load for phones + handhelds.
                    if ($hasmyblocks) {
                        ?><div class="headingwrap ui-bar-<?php echo $dtheme; ?> ui-footer jsetsbar">
                            <h2 class="jsets ui-title"><?php p(get_string('blocks')); ?></h2>
                        </div>
                        <div data-role="collapsible-set"><?php echo $OUTPUT->blocks_for_region('myblocks') ?></div><?php
                    }
                }
                ?>
            </div>
            <!-- end main content -->

            <!-- start footer -->
            <div data-role="footer" class="mobilefooter" data-theme="<?php echo $dtheme; ?>">
                <div data-role="navbar" class="jnav" >
                    <ul>
                        <li><a id="mycal" class="callink" href="<?php p($CFG->wwwroot) ?>/calendar/view.php" data-icon="info" data-iconpos="top" ><?php p(get_string('calendar', 'calendar')); ?></a></li>
<?php if (!empty($CFG->messaging)) { ?>
                            <li><a id="mymess" href="<?php p($CFG->wwwroot) ?>/message/index.php" data-iconpos="top" data-icon="mymessage" ><?php p(get_string('messages', 'message')); ?></a></li>
                <?php } ?>
                <?php if ($mypagetype != 'site-index') { ?>
                            <li><a href="#" data-inline="true" data-role="button" data-iconpos="top" data-icon="arrow-u" id="uptotop"><?php p(get_string('up')); ?></a></li>
                <?php } ?>
                    </ul>
                </div>
            </div>
            <!-- end footer -->

            <div id="underfooter">
<?php
echo $OUTPUT->login_info_footer();
echo '<div class="noajax">';
echo $OUTPUT->standard_footer_html();
echo '</div>';
?>
            </div>

            <!-- empty divs with info for the jQuery to use -->
            <div id="<?php echo sesskey(); ?>" class="mobilesession"></div>
            <div id="<?php p($CFG->wwwroot); ?>" class="mobilesiteurl"></div>
            <div id="<?php echo $dtheme; ?>" class="datatheme"></div>
            <!-- end jQuery divs -->

            <div id="page-footer"><!-- empty page footer needed by moodle yui for embeds --></div>

<?php echo $OUTPUT->standard_end_of_body_html() ?>
        </div><!-- ends page -->
    </body>
</html>