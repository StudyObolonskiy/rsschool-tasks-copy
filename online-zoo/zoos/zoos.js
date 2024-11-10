const spoiler = document.querySelector('.spoiler'),
  spoilerBtn = document.querySelector('.info__btn'),
  mainFrame = document.querySelector('.animal-cam__player iframe'),
  sliderFrame = document.querySelector('.slider__dummy');
let spoilerHeight = spoiler.offsetHeight;
spoilerBtn.addEventListener('click', () => {
  if (spoilerBtn.classList.contains('info__btn_active')) {
    spoiler.style.height = spoilerHeight + 'px';  
    spoilerBtn.classList.remove('info__btn_active');
    spoilerBtn.textContent = 'Read Less';
  } else {
    spoilerBtn.classList.add('info__btn_active');
    spoiler.style.height = (spoilerHeight *  0.1) + 'px';
    spoilerBtn.textContent = 'Read More';
  }
});
sliderFrame.addEventListener('click', (event) => {
  if (event.target.matches('.animal-cam__slider__item')) {
    let mainSrc = mainFrame.src;
    let curentFrame = event.target.querySelector('iframe');
    mainFrame.src = curentFrame.src;
    curentFrame.src = mainSrc;
  }
})