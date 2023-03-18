import { audio, audioFiles } from './main';
import { audioCtx, animate, animate2 } from './animate';

let currentAudioIndex = 0;

export function playPause() {
    checkAudioCtxState();
    if (audio.paused) {
        audio.play();
    } else { 
        audio.pause();
    }
}

export function playNext() {
    checkAudioCtxState();
    currentAudioIndex++; 
    if (currentAudioIndex >= audioFiles.length) {
        currentAudioIndex = 0;
    }
    audio.src = audioFiles[currentAudioIndex];
    audio.play();
} 

export function playPrevious() {
    checkAudioCtxState();
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

function checkAudioCtxState() {
    // checking if audioCtx is suspended, i.e not activated by gesture
    // this will mostly occur on page refresh (first time clicking play, hence also call changeVisual())
    if (audioCtx.state === "suspended") {
        audioCtx.resume();
        changeVisual();
      }
}