/**
 *   MenuModifier is responsible of ...
 */
function MenuModifier(athleteId, highLightStravistiXFeature, appResources) {
    this.athleteId_ = athleteId;
    this.appResources_ = appResources;
    this.highLightStravistiXFeature_ = highLightStravistiXFeature;
}

/**
 * Define prototype
 */
MenuModifier.prototype = {

    modify: function modify() {

        // Add kom-map to global navigation
        var globalNav = $(".global-nav");
        var stravaMenuHtml = "<li class='drop-down-menu' height='auto'>";

        var menuStyle = null;
        var menuIcon;

        if (this.highLightStravistiXFeature_) {
            menuStyle = "style='font-size:20px; background-color: #fc4c02; color: white;'"; //TODO Globalize colors
            menuIcon = this.appResources_.menuIconBlack;
        } else {
            menuStyle = "style='font-size:20px; background-color: white; color: #fc4c02;'"; //TODO Globalize colors
            menuIcon = this.appResources_.menuIconOrange;
        }

        var styleSideRight = 'display: inline; float: right; border-top: 1px solid #DDD; border-left: 1px solid #DDD; width: 50%;';
        var styleSideLeft = 'border-top: 1px solid #DDD; width: 50%;';

        var twitterTweetLink = "https://twitter.com/intent/tweet?text=As%20%23strava%20user,%20you%20should%20try%20%23stravistix%20web%20extension%20by%20%40champagnethomas.%20Get%20it%20here%20%20bitly.com/stravistix.%20%23cycling%20%23running%20%23geek";

        stravaMenuHtml += "<a href='#' class='selection' " + menuStyle + "><img style='vertical-align:middle' src='" + menuIcon + "'/></a>";
        stravaMenuHtml += "<ul class='options' height='' style='width: 300px; max-height: 650px !important; overflow:hidden;'>";
        stravaMenuHtml += "<li><a target='_blank' href='" + this.appResources_.settingsLink + "'><img style='vertical-align:middle' src='" + this.appResources_.settingsIcon + "'/> <span>Common Settings</span></a></li>";
        stravaMenuHtml += "<li><a target='_blank' href='" + this.appResources_.settingsLink + "#/healthSettings'><img style='vertical-align:middle' src='" + this.appResources_.heartIcon + "'> <span>Health Settings</span></a></li>";
        stravaMenuHtml += "<li><a target='_blank' href='" + this.appResources_.settingsLink + "#/zonesSettings'><img style='vertical-align:middle' src='" + this.appResources_.zonesIcon + "'> <span>Zones Settings</span></a></li>";
        stravaMenuHtml += "<li><a href='http://labs.strava.com/achievement-map/' target='_blank'><img style='vertical-align:middle' src='" + this.appResources_.komMapIcon + "'/> <span>KOM/CR Map</span></a></li>";
        stravaMenuHtml += "<li id='splus_menu_heatmap'><a href='#' target='_blank'><img style='vertical-align:middle' src='" + this.appResources_.heatmapIcon + "'/> <span>Heat Map</span></a></li>";
        // stravaMenuHtml += "<li><a href='http://veloviewer.com/athlete/" + this.athleteId_ + "/summary' target='_blank'><img style='vertical-align:middle' src='" + this.appResources_.veloviewerDashboardIcon + "'/> <span>Dashboard <i>VeloViewer</i></span></a></li>";
        // stravaMenuHtml += "<li><a href='http://veloviewer.com/athlete/" + this.athleteId_ + "/challenges' target='_blank'><img style='vertical-align:middle' src='" + this.appResources_.veloviewerChallengesIcon + "'/> <span>Strava Challenges <i>VeloViewer</i></span></a></li>";
        stravaMenuHtml += "<li style='border-top: 1px solid #DDD;'><a style='font-style: italic;' href='" + this.appResources_.settingsLink + "#/releaseNotes' target='_blank'><img style='vertical-align:middle' src='" + this.appResources_.systemUpdatesIcon + "'/> <span><strong>v" + this.appResources_.extVersion + "</strong> release notes</span></a></li>";

        stravaMenuHtml += "<li style='" + styleSideRight + "'><a style='font-style: italic;' href='https://chrome.google.com/webstore/detail/stravistix/dhiaggccakkgdfcadnklkbljcgicpckn/reviews' target='_blank'><img style='vertical-align:middle' src='" + this.appResources_.rateIcon + "'/> <span>Rate</span></a></li>";
        stravaMenuHtml += "<li style='" + styleSideLeft + "' ><a  style='font-style: italic;' href='https://twitter.com/champagnethomas' style='font-style: italic;' target='_blank'><img style='vertical-align:middle' src='" + this.appResources_.twitterIcon + "'/> <span>What's next?</span></a></li>";

        stravaMenuHtml += "<li style='" + styleSideRight + "'><a style='font-style: italic;' href='" + this.appResources_.settingsLink + "#/donate' target='_blank'><img style='vertical-align:middle' src='" + this.appResources_.donateIcon + "'/> <span>Donate</span></a></li>";
        stravaMenuHtml += "<li style='" + styleSideLeft + "'><a style='font-style: italic;' href='http://thomaschampagne.github.io/' target='_blank'><img style='vertical-align:middle' src='" + this.appResources_.bikeIcon + "'/> <span> Author site</span></a></li>";
        stravaMenuHtml += "<li style='border-top: 1px solid #DDD;'><a target='_blank' href='" + twitterTweetLink + "'><img style='vertical-align:middle' src='" + this.appResources_.shareIcon + "'/> <span>Share this extension</span></a></li>";
        stravaMenuHtml += "</ul>";
        stravaMenuHtml += "</li>";

        // TODO Move geolocation permission ask out ?
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    $('#splus_menu_heatmap').find('a').attr('href', 'http://labs.strava.com/heatmap/#12/' + position.coords.longitude + '/' + position.coords.latitude + '/gray/both');
                },
                function(error) {
                    if (error != null) {
                        $('#splus_menu_heatmap').find('a').attr('href', '#');
                        $('#splus_menu_heatmap').find('a').attr('target', '_self');
                        $('#splus_menu_heatmap').find('a').attr('onclick', 'alert("Some Strava+ functions will not work without your location position. Please make sure you have allowed location tracking on this site. Click on the location icon placed on the right inside the chrome web address bar => Clear tracking setting => Refresh page > Allow tracking.")');
                    }
                }
            );
        }

        globalNav.children().first().before(stravaMenuHtml);

        // $.fancybox('<div><h1>Modal example :)</h1><p>Remove this by searching the pattern "5s874d45gfds4ds7s7dsdsq87a7q4s7f7d8ds7f" in code</p></div>');
    },
};
