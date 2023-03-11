import { audio, audioFiles } from './main';
import { animate, animate2 } from './animate';

let currentAudioIndex = 0;

export function playPause(playPauseIcon) {
    if (audio.paused) {
        audio.play();
        playPauseIcon.classList.remove('fa-play');
        playPauseIcon.classList.add('fa-pause');
    } else { 
        audio.pause();
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
    }
}

export function playNext() {
    currentAudioIndex++; 
    if (currentAudioIndex >= audioFiles.length) {
        currentAudioIndex = 0;
    }
    audio.src = audioFiles[currentAudioIndex];
    audio.play();
} 

export function playPrevious() {
    currentAudioIndex--;
    if (currentAudioIndex < 0) {
        currentAudioIndex = audioFiles.length - 1;
    }
    audio.src = audioFiles[currentAudioIndex];
    audio.play();
}

export function changeVisual() {
    const selectedOption = document.querySelector('input[name="option"]:checked').value;
    if (selectedOption == "circle") {
        animate();
    } else if (selectedOption == "bar") {
        animate2();
    }
}