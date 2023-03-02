const audioFiles = ['Havana.m4a', 'Benzo.m4a', 'Romantic.m4a'];
let currentAudioIndex = 0;
let audio = new Audio(audioFiles[currentAudioIndex]);
// audio1.src = document.getElementById("audio"); 
 
const container = document.getElementById("container");
const canvas = document.getElementById("canvas");
const playPauseButton = document.getElementById("play-pause");
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');
const seekBar = document.getElementById('seek');
const dropDown = document.getElementById('dropdown');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 

const ctx = canvas.getContext("2d");

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let audioSource = null;
let analyser = null;

function playPause() {
  if (audio.paused) {
    audio.play();
    playPauseButton.innerHTML = "Pause";
  } else {
    audio.pause();
    playPauseButton.innerHTML = "Play";
  }
}

function playNext() {
  currentAudioIndex++;
  if (currentAudioIndex >= audioFiles.length) {
    currentAudioIndex = 0;
  }
  audio.src = audioFiles[currentAudioIndex];
  audio.play();
}

function playPrevious() {
  currentAudioIndex--; 
  if (currentAudioIndex < 0) {
    currentAudioIndex = audioFiles.length - 1;
  }
  audio.src = audioFiles[currentAudioIndex];
  audio.play();
}

function changeVisual() {
  if (dropDown.value == "1") {
    animate()
  }else if (dropDown.value == "2") {
    animate2()
  }
}

playPauseButton.addEventListener("click", playPause);
nextButton.addEventListener("click", playNext);
previousButton.addEventListener("click", playPrevious);
dropDown.addEventListener('change', changeVisual);

 
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

audioSource = audioCtx.createMediaElementSource(audio);
analyser = audioCtx.createAnalyser();
audioSource.connect(analyser);
analyser.connect(audioCtx.destination);

analyser.fftSize = 128;
const bufferLength = analyser.frequencyBinCount; // half of fftSize
const dataArray = new Uint8Array(bufferLength);
const barWidth = canvas.width / bufferLength;

// draw a cirlce
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 100; 
// ctx.fillStyle = 'blue';
// ctx.beginPath(); 
// ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
// ctx.fill();
// ctx.stroke();

// Draw the rectangle
const rectWidth = 20;
const rectHeight = 20;
const angleStep = 2 * Math.PI / bufferLength;
function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  analyser.getByteFrequencyData(dataArray);
  for (let i = 0; i < bufferLength; i++) {
    const angle = i * angleStep;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    barHeight = dataArray[i]; 
    const red = (i * barHeight) / 10;
    const green = i * 4;
    const blue = barHeight / 4 - 12;
    ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`; 
    ctx.save(); // save origin context (0,0)
    ctx.translate(x, y); // make this point on the circumference the new origin
    ctx.rotate(angle);
    // ctx.fillRect( -rectWidth / 2, canvas.height - barHeight*3, 70, canvas.height);

    ctx.fillRect( -rectWidth / 2 , -rectHeight / 2, barHeight, rectWidth );
    ctx.restore(); 
  }
  requestAnimationFrame(animate); 
}


let x = 0;
let barHeight;
function animate2() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    for (let i = 0; i < bufferLength; i++) { 
        barHeight = dataArray[i];
        const red = (i * barHeight) / 10;
        const green = i * 4;
        const blue = barHeight / 4 - 12;
        ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`; 
        ctx.fillRect(x, canvas.height - barHeight*2, barWidth, canvas.height);
        x += barWidth;
    }

    requestAnimationFrame(animate2);   
}

// animate();