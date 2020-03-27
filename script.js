const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const volume = document.querySelector(".volume");
const timestamp = document.getElementById("timestamp");
video.currentTime = 0;
document.querySelector(".volume-control").style.display = "none";
function toggleVolume() {
	if (volume.value == 0) {
		volume.value = 100;
		document.getElementById("speaker").className = `fas fa-volume-up`;
		handleVolume();
	} else {
		volume.value = 0;
		document.getElementById("speaker").className = `fas fa-volume-mute`;
		handleVolume();
	}
}
function toggleButton() {
	if (video.paused) {
		play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
	} else {
		play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
	}
}

function toggleVideoPlay() {
	document.querySelector(".volume-control").style.display = "block";

	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
	toggleButton();
}
function stopVideo() {
	video.currentTime = 0;
	video.pause();
	toggleButton();
}
function updateProgress() {
	progress.value = (video.currentTime / video.duration) * 100;

	let mins = Math.floor(video.currentTime / 60);
	if (mins < 10) {
		mins = "0" + String(mins);
	}

	let secs = Math.floor(video.currentTime % 60);
	if (secs < 10) {
		secs = "0" + String(secs);
	}

	timestamp.innerHTML = `${mins}:${secs}`;
	toggleButton();
}
function updateChange() {
	video.currentTime = (+progress.value * video.duration) / 100;
	toggleButton();
}
function handleVolume() {
	video.volume = +volume.value / 100;
}
video.addEventListener("click", toggleVideoPlay);
stop.addEventListener("click", stopVideo);
video.addEventListener("timeupdate", updateProgress);
progress.addEventListener("change", updateChange);
volume.addEventListener("change", handleVolume);
play.addEventListener("click", toggleVideoPlay);
document.getElementById("speaker").addEventListener("click", toggleVolume);
document.querySelector(".fa-pause").addEventListener("click", toggleVideoPlay);
