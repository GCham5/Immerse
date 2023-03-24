import { playPause, playNext, playPrevious, changeVisual, currentAudioIndex } from "./controls";

let isDark = true;

const body = document.body;
const playPauseButton = document.getElementById("play-pause");
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');
const seekBar = document.getElementById('seek');
const visualOption = document.getElementById('visual-option');
const playPauseIcon = document.getElementById('play-pause-icon');
const lightToggleIcon = document.getElementById('light-toggle');
const title = document.getElementById('title');

playPauseButton.addEventListener("click", () => playPause());
nextButton.addEventListener("click", () => playNext());
previousButton.addEventListener("click", () => playPrevious());

document.addEventListener("DOMContentLoaded", function () {
  visualOption.addEventListener('change', () => changeVisual());
});


export const getAudioData = async () => {
  const data = await fetch('songs.json').then(response => response.json());
  const songs = data.songs.map(song => ({
    title: song.title,
    location: song.location,
  }));
  const audio = new Audio(songs[0].location);

  return { songs, audio };
};

export const { songs, audio } = await getAudioData();;

function updateSongTitle() {
  // prevent animation from occuring on play/pause of same song
  if (title.textContent !== songs[currentAudioIndex].title) {
    title.textContent = songs[currentAudioIndex].title;
    title.classList.add("animate");
    setTimeout(() => {
      title.classList.remove("animate");
    }, 1000);
  }
}

seekBar.addEventListener('change', () => {
  const seekTime = audio.duration * (seekBar.value / 100);
  audio.currentTime = seekTime;
});

audio.addEventListener('timeupdate', () => {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  const progress = (currentTime / duration) * 100;
  seekBar.value = progress;
  seekBar.style.background = `linear-gradient(to right, black 0%, black ${progress}%, white ${progress}%, white 100%)`;
});

audio.addEventListener('play', () => {
  playPauseIcon.classList.remove('fa-play');
  playPauseIcon.classList.add('fa-pause');
  updateSongTitle();

  // ensure animation plays
  changeVisual();
}); 

audio.addEventListener('pause', () => {
  playPauseIcon.classList.remove('fa-pause');
  playPauseIcon.classList.add('fa-play');
});


// dark and light mode toggle
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

