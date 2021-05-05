const mapImage = document.querySelector('.map');
const map = document.querySelector('.map__img');
const wrapper = document.querySelector('.map__wrapper');
const headerElem = document.querySelector('.header__wrapper');
const footerElem = document.querySelector('.footer__wrapper');
const zoomInButton = document.querySelector('.plus__btn');
const zoomOutButton = document.querySelector('.minus__btn');
const animals = document.querySelectorAll('.animal');
const areas = document.querySelectorAll('.area');
const animalMarkers = document.querySelectorAll('.animal-marker');

let count = 0;
let ww = mapImage.offsetWidth;

function zoomIn() {
  if (count > 3) {
    return;
  }
  /* let coef = 0.1;
  count = (+count + coef).toFixed(1); */
  count += 1
  mapImage.style.width = mapImage.offsetWidth * 1.1 + 'px';
  animals.forEach(animal => {
    /* animal.style.transform = `scale(${count})`; */
    animal.style.width = animal.offsetWidth * 1.1 + 'px';
  })
  areas.forEach(area => {
    /* area.style.transform = `scale(${count})`; */
    area.style.width = area.offsetWidth * 1.1 + 'px';
  })
  animalMarkers.forEach(marker => {
    /* marker.style.transform = `scale(${count})`; */
    marker.style.width = marker.offsetWidth * 1.1 + 'px'
  })
}
function zoomOut() {
  if (count < -3) {
    return;
  }
  /* let coef = 0.1;
  count = (count - coef).toFixed(1); */
  count -= 1
  mapImage.style.width = mapImage.offsetWidth / 1.1 + 'px';
  animals.forEach(animal => {
    /* animal.style.transform = `scale(${count})`; */
    animal.style.width = animal.offsetWidth / 1.1 + 'px';
  })
  /* areas.forEach(area => {
    //area.style.transform = `scale(${count})`; 
    area.style.width = area.offsetWidth / 1.1 + 'px';
  }) */
  animalMarkers.forEach(marker => {
    /* marker.style.transform = `scale(${count})`; */
    marker.style.width = marker.offsetWidth / 1.1 + 'px'
  })
}
function showTooltip(event) {
  animals.forEach(animal => {
    animal.classList.remove('animal_active')
  });
  if (event.target.matches('.animal')) {
    event.target.classList.add('animal_active');
  }
}

zoomInButton.addEventListener('click', zoomIn);
zoomOutButton.addEventListener('click', zoomOut);
mapImage.addEventListener('click', (event) => {
  showTooltip(event);
});
mapImage.addEventListener('mousedown', (event) => {
  const headerHeight = headerElem.offsetHeight;
  let shiftX = event.clientX - mapImage.getBoundingClientRect().left;
  let shiftY = event.clientY - mapImage.getBoundingClientRect().top;
  mapImage.style.position = 'absolute'; 
  moveAt(event.pageX, event.pageY);
  function moveAt(pageX, pageY) {
    mapImage.style.left = pageX - shiftX + 'px';
    mapImage.style.top = pageY - headerHeight - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }
  wrapper.addEventListener('mousemove', onMouseMove);
  mapImage.onmouseup = function() {
    wrapper.removeEventListener('mousemove', onMouseMove);
    mapImage.onmouseup = null;
  };

  mapImage.ondragstart = function() {
    return false;
  };
});
