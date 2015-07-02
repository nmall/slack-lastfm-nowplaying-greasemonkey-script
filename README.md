## Slack Now Playing Thing ##

So here's how to hack together a now playing button for Slack (until we can get some more integrations and do it a better way.

### Do this
* Use Slack in a browser  
    *This stuff depends on the use of browser plugins so it'd take more work for this to work in the app*
* Install a Greasemonkey plugin
    * Chrome - [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)
    * Safari - [GreaseKit](http://www.macupdate.com/app/mac/20718/greasekit)
    * Firefox - [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
    * IE - [This](https://www.google.com/chrome/browser/)
* Sign up for [Last.fm](https://secure.last.fm/join)
* Sign up for a Last.fm [API account](http://www.last.fm/api/account/create)
* Configure your music player to "scrobble" to your Last.fm account
    * [Dekstop stuff (iTunes, Spotify, etc)](http://www.last.fm/download)
    * Browser stuff (Google Play, Pandora, YouTube, etc)
        * [Chrome](https://chrome.google.com/webstore/detail/lastfm-scrobbler/hhinaapppaileiechjoiifaancjggfjm?hl=en)
        * [Safari (and Chrome)*](http://scroblr.fm/)
        * [Firefox*](https://addons.mozilla.org/en-us/firefox/addon/foxyscrobbler/)  
        * IE - *see above link*  
**Note: Haven't tried these so not quite sure which services they work with*
* Install the userscript.js from this repo
* Edit the userscript with your username and API key for last.fm

That should be it.. Now press the music button in Slack to paste your current / last scrobble song to the chat.  
I haven't tested this on anything but Chrome with Google Play so.. feel free to ask any questions or make changes to stuff.
