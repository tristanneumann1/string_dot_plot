const splitChars = ['\\s', '\\t', '\\n', '\\r', '\\.', '?', '!', ',', '(', ')', '\\\'', '"', ':', ';', '-', '\\\\', '\\/', '`']
const canvasWidth = 700
const canvas = document.getElementById("canvas")
canvas.width = canvasWidth
canvas.height = canvasWidth
const ctx = canvas.getContext("2d")
let pixelWidth

function strToWords(string) {
  const regex = new RegExp('[' + splitChars.join('|') + ']')
  const words = string.split(regex).filter(word => word.length)
  pixelWidth = canvasWidth / words.length
  return words;
}

function draw(words) {
  for(let i = 0; i < words.length; i++) {
    for(let j = i; j < words.length; j++) {
      if(words[i] === words[j]) {
        drawCoordinates(i, j)
        drawCoordinates(j, i)
      }
    }
  }
}

function drawCoordinates(x,y){
  ctx.fillStyle = "#ff2626"; // Red color
  ctx.lineWidth = "1";
  ctx.beginPath();
  ctx.rect(x * pixelWidth, y * pixelWidth, pixelWidth, pixelWidth);
  ctx.fill();
}

draw(strToWords(text))