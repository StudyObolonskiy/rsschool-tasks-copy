const filters = document.querySelector('.filters');
const resetBtn = document.querySelector('.btn-reset');
const btnContainer = document.querySelector('.btn-container');
const loadBtn = document.querySelector('.btn-load--input')
const fullscreen = document.querySelector('.fullscreen');
let imageNumber = 0; 

function cahangeValue(event) {  
  let outputs = document.querySelectorAll('output');
  if (event.target.matches('input[name=blur]')) {
    outputs[0].value = event.target.value;
  }
  if (event.target.matches('input[name=invert]')) {
    outputs[1].value = event.target.value;
  }
  if (event.target.matches('input[name=sepia]')) {
    outputs[2].value = event.target.value;
  }
  if (event.target.matches('input[name=saturate]')) {
    outputs[3].value = event.target.value;
  }
  if (event.target.matches('input[name=hue]')) {
    outputs[4].value = event.target.value;
  }
}
function changeFilters(event) {
  const img = document.querySelector('img');
  if (event.target.matches('input[type=range]')) {
    const measure = event.target.dataset.sizing;
    img.style.setProperty(`--${event.target.name}`, event.target.value + measure);
  }
}
function reset() {
  const inputs = document.querySelectorAll('input[type=range]');
  const outputs = document.querySelectorAll('output');
  const img = document.querySelector('img');
  inputs.forEach((input, i) => {
    input.value = 0;
    if (input.matches('input[name=saturate]')) {
      input.value = 100;
    }
    outputs[i].value = input.value;
    img.style = '';
  });
}
function viewImage(src) {
  const image = document.querySelector('img');
  const img = new Image();
  img.src = src;
  img.onload = () => {      
    image.src = `${src}`;
  };
}
function getTimeOfDay() {
  let date = new Date
  time = date.getHours()
  if (time >= 0 && time <= 5) {    
    return 'night'
  } else if (time >= 6 && time <= 11) {
    return 'morning'
  } else if (time >= 12 && time <= 17) {
    return 'day'
  } else {
    return 'evening'
  }
}
function getImages() { 
  const nextBtn = document.querySelector('.btn-next')
  const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
  const time = getTimeOfDay();
  const base = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
  const index = imageNumber % images.length;
  const imageSrc = base + time + '/' + images[index];
  viewImage(imageSrc);
  imageNumber++;
}
function loadImage() {
  const img = document.querySelector('img');
  const file = loadBtn.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    img.src = reader.result    
  }
  reader.readAsDataURL(file);
}
function drawImage() {
  let canvas = document.createElement('canvas')
  const image = document.querySelector('img');
  const outputs = document.querySelectorAll('output')
  const img = new Image();
  img.src = image.src;
  img.setAttribute('crossOrigin', 'anonymous');
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    let factor = (canvas.height / image.height).toFixed(2);
    const ctx = canvas.getContext("2d");        
    ctx.filter = `blur(${factor * outputs[0].value}px) invert(${outputs[1].value}%) sepia(${outputs[2].value}%) saturate(${outputs[3].value}%) hue-rotate(${outputs[4].value}deg)`;
    ctx.drawImage(img, 0, 0);
    saveImg(canvas);
  };
};
function saveImg(canvas) {
  let link = document.createElement('a');
  link.download = 'download.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
}
function fullscreenToggle() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } 
  if(document.fullscreenElement) {
    document.exitFullscreen();
  }
}
filters.addEventListener('input', cahangeValue);
filters.addEventListener('input', changeFilters);
btnContainer.addEventListener('click', (event) => {
  const editorBtns = document.querySelectorAll('.btn')
  editorBtns.forEach(btn => {
    if (btn.classList.contains('btn-active')) {
      btn.classList.remove('btn-active')
    }
  })
  if (event.target.matches('.btn-reset')) {
    event.target.classList.add('btn-active');
    reset();
  }
  if (event.target.matches('.btn-next')) {
    event.target.classList.add('btn-active');
    getImages();
  }
  if (event.target.matches('.btn-load--input')) {
    editorBtns[2].classList.add('btn-active');
  }
  if (event.target.matches('.btn-save')) {
    event.target.classList.add('btn-active');
    drawImage()
  }
});
loadBtn.addEventListener('change', () => {
  loadImage();
  loadBtn.value = '';
})
fullscreen.addEventListener('click', fullscreenToggle);