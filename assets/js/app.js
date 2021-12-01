const player = document.querySelector(".player-wrapper");
const playBtn = document.querySelector(".play-pause .ellipse");
const reverseImg = document.querySelector(".play-pause .ellipse img")
const prevBtn = document.querySelector(".reminds");
const nextBtn = document.querySelector(".minds");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById('progress-container');
const songName = document.querySelector(".song-name");
const songerName = document.querySelector(".songer-neme");
const currTime = document.querySelector('#currTime');
const currentTimes = document.querySelector("#currentTime");
const durations = document.querySelector('#duration');
const audioTime = document.querySelector('.audio-timer');
const songerNameSet = document.querySelector(".songer-neme");

document.getElementById("set-audio").innerHTML = `
<audio src="/assets/music/SKRILLEX - Bangarang feat. Sirah [Official Music Video].mp3" id="audio"></audio>
<audio src="/assets/music/Melek Mosso   Ne faydası var  İbrahim Tatlıses cover.mp3" id="audio"></audio>
<audio src="/assets/music/Murat Boz - Sevgilim.mp3" id="audio"></audio>`;
const audio = document.getElementById("audio");
let songIndex = 0;
let songerIndex = 0;
const songs = ['SKRILLEX - Bangarang feat. Sirah [Official Music Video]', 'Melek Mosso   Ne faydası var  İbrahim Tatlıses cover', 'Murat Boz - Sevgilim'];
const songers = ['Skrillex', 'Melek Mosso', 'Murat Boz'];
loadSong(songs[songIndex], songers[songerIndex]);
function loadSong(song, songer) {
    if(songerIndex == "0"){
        prevBtn.style.opacity = ".3";
        prevBtn.removeEventListener('click',prevSong);
    }else{
        prevBtn.style.display = "block"
        prevBtn.style.opacity = "1";
        prevBtn.addEventListener('click', prevSong);
    }
    songerName.innerText = songer;
    songName.innerText = song;
    audio.src = `assets/music/${song}.mp3`;
}
playBtn.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});
function playSong() {
    player.classList.add('play');
    reverseImg.src = "assets/icons/pause.svg";
    audio.play();
}
function pauseSong() {
    player.classList.remove('play');
    reverseImg.src = "assets/icons/play-icon.svg";
    audio.pause();
}
function prevSong() {
    songIndex--;
    songerIndex--;
    if (songIndex, songerIndex < 0) {
        songIndex = songs.length - 1;
        songerIndex = songs.length - 1;
    }
    loadSong(songs[songIndex], songers[songerIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    songerIndex++;
    if (songIndex, songerIndex > songs.length - 1) {
        songIndex = 0;
        songerIndex = 0;
    }
    loadSong(songs[songIndex], songers[songerIndex]);
    playSong();
}
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
function updateProgress(e) {

    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    currentTimes.innerHTML = formatSecondsAsTime(currentTime)
    if (isNaN(duration)) {
        durations.innerHTML = '00:00';
    }
    else {
        durations.innerHTML = formatSecondsAsTime(duration);
    }
}

progressContainer.addEventListener('click', setProgress);
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}
function formatSecondsAsTime(secs) {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600)) / 60);
    var sec = Math.floor(secs - (hr * 3600) - (min * 60));

    if (min < 10) {
        min = "0"+ min;
    }
    if (sec < 10) {
        sec = "0"+ sec;
    }

    return min + ':' + sec;
    
}





audio.addEventListener('ended', nextSong);