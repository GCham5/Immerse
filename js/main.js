import { playPause, playNext, playPrevious, changeVisual } from "./controls";

export const audioFiles = ['./music/Havana.m4a', './music/Benzo.m4a', './music/Romantic.m4a', './music/Praise.m4a', './music/LastTime.m4a', './music/DontYouKnow.m4a'];

export let audio = new Audio(audioFiles[0]);
let isDark = true;

const body = document.body;
const controls =  document.getElementById('controls');
const playPauseButton = document.getElementById("play-pause");
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');
const seekBar = document.getElementById('seek'); 
const visualOption = document.getElementById('visual-option'); 
const playPauseIcon = document.getElementById('play-pause-icon');  
const lightToggleIcon = document.getElementById('light-toggle');


playPauseButton.addEventListener("click", () => playPause(playPauseIcon));
nextButton.addEventListener("click", playNext);
previousButton.addEventListener("click", playPrevious);
document.addEventListener("DOMContentLoaded", function() {
  visualOption.addEventListener('change', () => changeVisual()); 
}); 

 
seekBar.addEventListener('change', () => {
  const seekTime = audio.duration * (seekBar.value / 100);
  audio.currentTime = seekTime;  
});

audio.addEventListener('timeupdate', () =>  {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  const progress = (currentTime / duration) * 100;
  seekBar.value = progress;
  seekBar.style.background = `linear-gradient(to right, black 0%, black ${progress}%, white ${progress}%, white 100%)`;
});

lightToggleIcon.addEventListener('click', () => {
  if (isDark) {
    body.style.backgroundColor = 'white';
    lightToggleIcon.classList.remove('fa-sun');
    lightToggleIcon.classList.add('fa-moon');
    isDark = false;
  } else {
    body.style.backgroundColor = 'black';
    lightToggleIcon.classList.remove('fa-moon');
    lightToggleIcon.classList.add('fa-sun');
    isDark = true;
  }
});

