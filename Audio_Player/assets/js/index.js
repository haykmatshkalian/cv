const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');
const volStatus = document.getElementById('volStatus');
const volStatusImg = document.getElementById('volStatusImg');





// Song titles
const songs = [ 'Theme From New York, New York', 'Moon River', 'Yesterday', 'My Way', 'Blue Moon', 'Fly Me To The Moon', 'Strangers In The Night', 'Thats Life', 'I Love You Baby', 'I Love You', ];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `./assets/audio/${song}.mp3`;
  cover.src = `./assets/images/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	// change currentTime DOM
	// currTime.innerHTML = `${min}:${sec}`;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 

	// define seconds duration
	
	get_sec_d (duration);

	// change duration DOM
	// durTime.innerHTML = min_d +':'+ sec_d;
		
};

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
audio.addEventListener('timeupdate',DurTime);


// Time 
let minutes =  ''
let secounds =  ''
let minutes2 =  ''
let secounds2 = ''
////-------------------------------------------------------
let time1 = document.getElementById("time1")
let time2 = document.getElementById("time2")


setInterval(() => {
minutes = Math.floor(audio.currentTime/60) 
secounds = Math.floor(audio.currentTime - (minutes*60))
minutes2 = Math.floor(audio.duration/60) 
secounds2 = Math.floor(audio.duration - (minutes2*60))
    if(minutes<10 && secounds<10){
        time1.innerHTML = `0${minutes}:0${secounds}`
    }else if(minutes<10 && secounds>=10){
        time1.innerHTML = `0${minutes}:${secounds}`
    }else if (minutes>=10 && secounds<10){
        time1.innerHTML = `${minutes}:0${secounds}`
    }else {
        time1.innerHTML = `${minutes}:${secounds}`
    }
    minutes2<10 && secounds2<10 ? time2.innerHTML = `0${minutes2}:0${secounds2}` 
        :minutes2>=10 && secounds2<10 ? time2.innerHTML = `${minutes2}:0${secounds2}`
        :minutes2<10 && secounds2>=10?time2.innerHTML = `0${minutes2}:${secounds2}`
        :time2.innerHTML = `${minutes2}:${secounds2}` 
}, 0);


volStatus.classList.add("soundOn")

soundOn = () => {
  volStatus.classList.add("soundOn")
  volStatusImg.src = "./assets/images/volume.png"
  audio.volume = 1
}
soundOff=() =>{
  volStatus.classList.remove("soundOn")
  volStatusImg.src  = "./assets/images/mute.png"
  audio.volume = 0
}
volStatus.addEventListener("click", () =>{
  let isMute = volStatus.classList.contains("soundOn")
  isMute?soundOff():soundOn()
})



const volContainer = document.getElementById('volume_control_container');
const volProgress = document.getElementById('volume_control');


function setVolProgress(e){
  const heigthVol = this.clientHeight
  const clickY = e.offsetY
  const dbgb = clickY/heigthVol*100 + "%"
  volProgress.style.height = dbgb
}
volContainer.addEventListener("click", setVolProgress)



function changeVolProgress(e){
  const heigthVol = this.clientHeight
  const clickY = e.offsetY
  audio.volume = clickY/heigthVol

  volProgress.style.height = `(audio.volume*100)% `
}
volContainer.addEventListener("click", changeVolProgress)
// let volProgress = document.getElementById('')




//  lower text

const elts = {
  text1: document.getElementById("text1"),
  text2: document.getElementById("text2")
};

const texts = [
  "Hi!",
  "It's",
  "My",
  "Audio Player, ",
  "Music",
  "By",
  "Frank Sinatra,",
  "Project",
  "By",
  "Hayk Matshkalyan",
  ":)"
];

const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
  morph -= cooldown;
  cooldown = 0;

  let fraction = morph / morphTime;

  if (fraction > 1) {
      cooldown = cooldownTime;
      fraction = 1;
  }

  setMorph(fraction);
}

function setMorph(fraction) {
  elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  fraction = 1 - fraction;
  elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
  morph = 0;

  elts.text2.style.filter = "";
  elts.text2.style.opacity = "100%";

  elts.text1.style.filter = "";
  elts.text1.style.opacity = "0%";
}

function animate() {
  requestAnimationFrame(animate);

  let newTime = new Date();
  let shouldIncrementIndex = cooldown > 0;
  let dt = (newTime - time) / 1000;
  time = newTime;

  cooldown -= dt;

  if (cooldown <= 0) {
      if (shouldIncrementIndex) {
          textIndex++;
      }

      doMorph();
  } else {
      doCooldown();
  }
}

animate();