const splitChars = ['\\s', '\\t', '\\n', '\\r', '\\.', '?', '!', ',', '(', ')', '\\\'', '"', ':', ';', '-', '\\\\', '\\/', '`', '\\[', '\\]']
const canvasWidth = 700
let canvas = document.getElementById("canvas")
canvas.width = canvasWidth
canvas.height = canvasWidth
let ctx = canvas.getContext("2d")
let pixelWidth

function resetCtx() {
  ctx.fillStyle = 'darkgray'
  ctx.fillRect(0, 0, canvasWidth, canvasWidth)
}

resetCtx()

let notableWord = '';

function strToWords(string) {
  const regex = new RegExp('[' + splitChars.join('|') + ']')
  const words = string.split(regex).filter(word => word.length)
  console.log(words)
  pixelWidth = canvasWidth / words.length
  return words;
}

function draw(words) {
  for(let i = 0; i < words.length; i++) {
    for(let j = i; j < words.length; j++) {
      if(words[i].toLowerCase() === words[j].toLowerCase()) {
        drawCoordinates(i, j, words[i].toLowerCase() === notableWord.toLowerCase())
        drawCoordinates(j, i, words[i].toLowerCase() === notableWord.toLowerCase())
      }
    }
  }
}

function drawCoordinates(x,y, notable){
  ctx.fillStyle = notable? 'yellow' : '#640064';
  ctx.lineWidth = '1';
  ctx.beginPath();
  let width = pixelWidth * (notable? 1 : 1)
  // console.log('pixel: ', width)
  ctx.rect(x * pixelWidth, y * pixelWidth, width, width);
  ctx.fill();
}

document.getElementById('draw-button').onclick = (e) => {
  e.preventDefault()

  // Use the identity matrix while clearing the canvas
  resetCtx()

  text = document.getElementById('text-input').value
  draw(strToWords(text));
}


document.getElementById('find-notable').onclick = (e) => {
  e.preventDefault()

  // Use the identity matrix while clearing the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  notableWord = document.getElementById('notable').value
  draw(strToWords(text));
}

draw(strToWords(text))