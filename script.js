let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'img/img1.jpg',
        name : 'Lost Stars',
        artist : 'Adam Levine',
        music : 'music/song1.mp3'
    },
    {
        img : 'img/img2.jpg',
        name : 'Strawberries and Cigarettes',
        artist : 'Troye Sivan',
        music : 'music/song2.mp3'
    },
    {
        img : 'img/img3.jpg',
        name : 'Life Goes On',
        artist : 'BTS',
        music : 'music/song3.mp3'
    },
    {
        img : 'img/img4.jpg',
        name : 'Epiphany',
        artist : 'Kim Seokjin',
        music : 'music/song4.mp3'
    },
    {
        img : 'img/img5.jpg',
        name : 'Cardigan',
        artist : 'Taylor Swift',
        music : 'music/song5.mp3'
    },
    {
        img : 'img/img6.jpg',
        name : 'Easy On Me',
        artist : 'Adele',
        music : 'music/song6.mp3'
    },
    {
        img : 'img/img7.jpg',
        name : 'People Watching',
        artist : 'Conan Gray',
        music : 'music/song7.mp3'
    },
    {
        img : 'img/img8.jpg',
        name : 'As It Was',
        artist : 'Harry Styles',
        music : 'music/song8.mp3'
    },
    {
        img : 'img/img9.jpg',
        name : 'Take Me Home,Country Roads',
        artist : 'John Denver',
        music : 'music/song9.mp3'
    },
    {
        img : 'img/img10.jpg',
        name : 'Childism',
        artist : 'Kian',
        music : 'music/song10.mp3'
    },
    {
        img : 'img/img11.jpg',
        name : 'Malibu Nights',
        artist : 'Lany',
        music : 'music/song11.mp3'
    },
    {
        img : 'img/img12.jpg',
        name : 'Never Be Alone',
        artist : 'Shawn Mendes',
        music : 'music/song12.mp3'
    },
    {
        img : 'img/img13.jpg',
        name : 'Zombie',
        artist : 'The Cranberries',
        music : 'music/song13.mp3'
    },
    {
        img : 'img/img14.jpg',
        name : 'Slump',
        artist : 'Stray Kids',
        music : 'music/song14.mp3'
    },
    {
        img : 'img/img15.jpg',
        name : 'Unstoppable',
        artist : 'Sia',
        music : 'music/song15.mp3'
    }
 
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Track " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
   
}



function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    volume_show.innerHTML = volume_slider.value;
    curr_track.volume = volume_slider.value / 100;

}
function mute_sound(){
    curr_track.volume = 0;
    volume_slider.value = 0;
    volume_show.innerHTML = 0;
}

function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationMinutes;
    }
}