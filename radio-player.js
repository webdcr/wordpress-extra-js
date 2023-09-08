playing = 0;
// custom audio player settings:

// variables:
var radioURL = 'https://playerservices.streamtheworld.com/api/livestream-redirect/DC_RADIO.mp3';
var playImage = 'https://webdcr.com/wp-content/uploads/icons-09.png';
var pauseImage = 'https://webdcr.com/wp-content/uploads/icons-16.png';
var loadingImage = 'https://webdcr.com/wp-content/uploads/icons-11.png';

var playing = 0 // track state of audio player (0=paused,1=loading,2=playing)
var radioAud; // initializing an audio object (to be filled when audio player starts)

function radioClick() {
	if (radioAud === undefined) {
		radioAud = new Audio(radioURL);
		radioAud.addEventListener("waiting", radioLoadingActions);	
		radioAud.addEventListener("playing", radioPlayActions);
		radioAud.addEventListener("pause", radioPauseActions);
	}
	if (playing == 2 || playing == 1) {
		radioAud.pause()
	} else {
		radioAud.load(); // update to latest music
		radioAud.play() // play it!
	}
}

function radioLoadingActions() {
	playing = 1;
	$( ".radioPlayer" ).attr("src",loadingImage);
	$( ".radioPlayer" ).css("animation","spin 2s linear infinite");
}

function radioPlayActions() {
	playing = 2;
	$( ".radioPlayer" ).attr("src",pauseImage);
	$( ".radioPlayer" ).css("animation","")
}

function radioPauseActions() {
	playing = 0;
	$( ".radioPlayer" ).attr("src",playImage);
	$( ".radioPlayer" ).css("animation","");
}

function radioCheck() {
	if (radioChecked == false) {
		if (playing == 0) {radioPauseActions()}
		if (playing == 1) {radioLoadingActions()}
		if (playing == 2) {radioPlayActions()}	
		radioChecked = true;
	}
}
