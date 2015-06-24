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
//var npButton = $('<a onclick="return false;" id="now_playing_button" style="line-height: 36px; padding: 0px 0.5rem; border: 2px solid rgb(224, 224, 224); text-align: center; font-size: 1.5rem; text-shadow: white 0px 1px 1px; width: 44px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0.2rem; border-top-left-radius: 0.2rem; position: absolute; bottom: 22px; left: 63px; background-clip: padding-box;"><i class="fa fa-music"></i></a>');
var npButton = $('#primary_file_button').clone().attr('id', 'now_playing_button').removeClass('file_upload_btn');
var buttonCss = {'line-height': '36px', 'padding': '0 .5rem', 'border': '2px solid #e0e0e0', 'text-align': 'center', 'font-size': '1.5rem', 'text-shadow': '0 1px 1px white', 'width': '46px', 'height': '41px', 'background-clip': 'padding-box', 'border-top-right-radius': '0', 'border-bottom-right-radius': '0', 'border-bottom-left-radius': '.2rem', 'border-top-left-radius': '.2rem', 'position': 'absolute', 'bottom': '22px', 'left': '62px','background-color': 'rgba(0, 0, 0, 0)', 'background-image': '-webkit-gradient(linear, 0% 100%, 0% 0%, from(rgb(239, 239, 239)), to(rgb(255, 255, 255)))', 'background-origin': 'padding-box', 'background-size': 'auto', 'background-attachment': 'scroll', '-webkit-background-origin': 'padding-box', '-webkit-background-size': 'auto' } ;
npButton.css(buttonCss);
npButton.find('i').removeClass('fa-arrow-circle-o-up').addClass('fa-music')

var lfmApiUrl = "https://ws.audioscrobbler.com/2.0/";


var trackData = {method: 'user.getrecenttracks', user: username, api_key: apiKey, limit:1, format:'json'}
var artistData = {method: 'artist.gettoptags', api_key: apiKey, limit:3, format:'json'}

$('#footer #messages-input-container').css('left', '108px');



var makePost = function(name, album, artist, genre, url, imgUrl){
	return '[ *' + name + '* ] _by_ [ *' + artist + '* ] _on_ [ *' + album + '* ] [_' + genre + '_]- ' + imgUrl; 
};

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
        var imgUrl = track.image[2]['#text'];
        
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





