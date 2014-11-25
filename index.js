var fs = require("fs");
var Handlebars = require("handlebars");

var profileIcon = {
    "twitter": "fa-twitter-square",
    "facebook": "fa-facebook-square",
    "github": "fa-github-square",
    "google-plus": "fa-google-plus-square",
    "g+": "fa-google-plus-square",
    "youtube": "fa-youtube-square",
    "vimeo": "fa-vimeo-square",
    "linkedin": "fa-linkedin-square",
    "pinterest": "fa-pinterest-square",
    "angellist": "fa-angellist",
    "flickr": "fa-flickr",
    "behance": "fa-behance-square",
    "codepen": "fa-codepen",
    "blog": "fa-rss-square"
};

function render(resume) {
    var css = fs.readFileSync(__dirname + "/style.css", "utf-8");
    var template = fs.readFileSync(__dirname + "/resume.template", "utf-8");
    
    if (resume.basics.profiles) {
        resume.basics.profiles.forEach(function(profile){
            profile.network = profile.network.toLowerCase();

            // find associated font-awesome icon to profile(s)
            if (profileIcon[profile.network]) {
                profile.icon = profileIcon[profile.network];
            }

            // define url if not defined in json
            if (profile.network == 'twitter' && profile.url == '' && profile.username != '') {
                profile.url = "https://twitter.com/" + profile.username;
            }
            if (profile.network == 'facebook' && profile.url == '' && profile.username != '') {
                profile.url = "https://facebook.com/" + profile.username;
            }
            if (profile.network == 'linkedin' && profile.url == '' && profile.username != '') {
                profile.url = "https://linkedin.com/in/" + profile.username;
            }
            if (profile.network == 'github' && profile.url == '' && profile.username != '') {
                profile.url = "https://github.com/" + profile.username;
            }
            if (profile.network == 'skype' && profile.url == '' && profile.username != '') {
                profile.url = "skype:" + profile.username + "?call";
            }
        });
    }

    // renders
    return Handlebars.compile(template)({
        css: css,
        resume: resume
    });
}

module.exports = {
    render: render
};
