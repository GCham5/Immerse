import { playPause, playNext, playPrevious, changeVisual } from "./controls";

export const audioFiles = ['Havana.m4a', 'Benzo.m4a', 'Romantic.m4a'];

export let audio = new Audio(audioFiles[0]);

 
const container = document.getElementById("container");
const playPauseButton = document.getElementById("play-pause");
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');
const seekBar = document.getElementById('seek');
const dropDown = document.getElementById('dropdown'); 
const playPauseIcon = document.getElementById('play-pause-icon');  


playPauseButton.addEventListener("click", () => playPause(playPauseIcon));
nextButton.addEventListener("click", playNext);
previousButton.addEventListener("click", playPrevious);
document.addEventListener("DOMContentLoaded", function() {
  dropDown.addEventListener('change', () => changeVisual(dropDown));
}); 

 
seekBar.addEventListener('change', function() {
  const seekTime = audio.duration * (seekBar.value / 100);
  audio.currentTime = seekTime;
});

audio.addEventListener('timeupdate', function() {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  const progress = (currentTime / duration) * 100;
  seekBar.value = progress;
});

