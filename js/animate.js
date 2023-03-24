import { audio } from './main';

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let color = '#27C36A';

const ctx = canvas.getContext("2d");

export const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let audioSource = null;
let analyser = null;

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

// Draw the rectangle
const rectWidth = 20;
const rectHeight = 20;
const angleStep = 2 * Math.PI / bufferLength;
export function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  analyser.getByteFrequencyData(dataArray);
  for (let i = 0; i < bufferLength; i++) {
    const angle = i * angleStep;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    barHeight = dataArray[i];
    // const red = (i * barHeight) / 10;
    // const green = i * 4;
    // const blue = barHeight / 4 - 12;
    // ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;

    ctx.fillStyle = color;
    ctx.save(); // save origin context (0,0)
    ctx.translate(x, y); // make this point on the circumference the new origin
    ctx.rotate(angle);
    ctx.fillRect(-rectWidth / 2, -rectHeight / 2, barHeight, rectWidth);
    ctx.restore();
  }
  requestAnimationFrame(animate);
}


let x = 0;
let barHeight;
export function animate2() {
  x = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  analyser.getByteFrequencyData(dataArray);
  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];
    // const red = (i * barHeight) / 10;
    // const green = i * 4;
    // const blue = barHeight / 4 - 12;
    // ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
    ctx.fillStyle = color;
    ctx.fillRect(x, canvas.height - barHeight * 2, barWidth, canvas.height);
    x += barWidth;
  }

  requestAnimationFrame(animate2);
}

export function changeColor(colour) {
  color = colour;
}