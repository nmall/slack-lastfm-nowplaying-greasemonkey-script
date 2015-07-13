// ==UserScript==
// @name       Last.fm Slack now playing thing
// @namespace  http://nope/
// @version    0.1
// @description  gets your last.fm now playing info and puts it in slack's chat pane
// @match      https://*.slack.com/messages/*/
// @copyright  2014+, nathan
// ==/UserScript==


///////////////////////////////////////////////////////////////
/// CHANGE THESE

var username = "your lastfm username";
var apiKey = "your lastfm api key";

///////////////////////////////////////////////////////////////

console.log('Starting LFM NP 3');

var messageInput = $('#message-input');

var npButton = $('#primary_file_button').clone().attr('id', 'now_playing_button').removeClass('file_upload_btn');
//var buttonCss = {'line-height': '36px', 'padding': '0 .5rem', 'border': '2px solid #e0e0e0', 'text-align': 'center', 'font-size': '1.5rem', 'text-shadow': '0 1px 1px white', 'width': '46px', 'height': '41px', 'background-clip': 'padding-box', 'border-top-right-radius': '0', 'border-bottom-right-radius': '0', 'border-bottom-left-radius': '.2rem', 'border-top-left-radius': '.2rem', 'position': 'absolute', 'bottom': '22px', 'left': '62px','background-color': 'rgba(0, 0, 0, 0)', 'background-image': '-webkit-gradient(linear, 0% 100%, 0% 0%, from(rgb(239, 239, 239)), to(rgb(255, 255, 255)))', 'background-origin': 'padding-box', 'background-size': 'auto', 'background-attachment': 'scroll', '-webkit-background-origin': 'padding-box', '-webkit-background-size': 'auto' } ;
var buttonCss = {
    '-webkit-font-smoothing': 'antialiased',
    '-webkit-user-select': 'none',
    'background-image': 'url("https://cdn0.iconfinder.com/data/icons/yooicons_set01_socialbookmarks/512/social_lastfm_box_red.png")',
    'background-repeat': 'no-repeat',
    'background-position': 'center',
    'background-size': 'contain !important',
    'bottom': '0px',
    'box-sizing': 'border-box',
    'color': 'rgba(0, 0, 0, 0.34902)',
    'cursor': 'pointer',
    'display': 'block',
    'font-family': 'Emoji Passthrough',
    'font-size': '23.9999980926514px',
    'height': '41.9965286254883px',
    'left': '-86px',
    'line-height': '42px',
    'max-height': '160px',
    'min-height': '42px',
    'padding-bottom': '0px',
    'padding-left': '0px',
    'padding-right': '0px',
    'padding-top': '0px',
    'position': 'absolute',
    'text-align': 'center',
    'text-decoration': 'none',
    'text-shadow': 'none',
    'transition-delay': '0s, 0s, 0s',
    'transition-duration': '0.1s, 0.1s, 0.1s',
    'transition-property': 'background, border-color, color',
    'transition-timing-function': 'ease, ease, ease',
    'width': '43.9930572509766px'
};
npButton.css(buttonCss);
npButton.find('i').removeClass('ts_icon ts_icon_plus_thick');
npButton.css('background-size', 'contain')

var lfmApiUrl = "https://ws.audioscrobbler.com/2.0/";


var trackData = {method: 'user.getrecenttracks', user: username, api_key: apiKey, limit:1, format:'json'}
var artistData = {method: 'artist.gettoptags', api_key: apiKey, limit:3, format:'json'}

$('#footer #messages-input-container').css('left', '108px');



var makePost = function(name, album, artist, genre, url, imgUrl){
	return '[ *' + name + '* ] _by_ [ *' + artist + '* ] _on_ [ *' + album + '* ] [_' + genre + '_]- ' + imgUrl; 
};

var randomToken = function(){
	return Math.random().toString(36).substring(7);
}

var npButtonClick = function(e) {
    $.get(lfmApiUrl, trackData, function( responseData ) {
        var track = responseData.recenttracks.track;
        
        //could return an array despite the limit
        if(track.length) {
        	track = track[0];
        }
        
		var album = track.album['#text'];
		var name = track.name;
        var artist = track.artist['#text']
        var url = track.url;
        var imgUrl = track.image[2]['#text'] + "?t=" + randomToken();
        
        artistData.artist = artist;
        $.get(lfmApiUrl, artistData, function( responseData ) {
            var tag1 = responseData.toptags.tag[0].name;
            var tag2 = responseData.toptags.tag[1].name;
            var tag3 = responseData.toptags.tag[2].name;
         
            var genre = tag1 + ", " + tag2 + ", " + tag3;
            messageInput.val(makePost(name, album, artist, genre, url, imgUrl));
        	messageInput.submit();
        });
    });
	
};

$( document ).ready(function(){
    npButton.prependTo('#footer');
	npButton.click(npButtonClick);
});





