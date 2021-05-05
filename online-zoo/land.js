//pets slider

const petWrapers = document.querySelectorAll('.pets__card__wrapper'),
  firstRowPets = petWrapers[0].querySelectorAll('.pets__card'),
  secondRowPets = petWrapers[1].querySelectorAll('.pets__card');
let currentTopCart = 0,
  next = 2,
  prev = 1,
  isEnable = true;

function changeCurrentCart(n) {
  currentTopCart = ((n * 3) + firstRowPets.length) % firstRowPets.length;
  next = ((currentTopCart + 1) + firstRowPets.length) % firstRowPets.length;
  prev = ((currentTopCart + 2) + firstRowPets.length) % firstRowPets.length;
}
function hideCart (direction) {
  isEnable = false;
  firstRowPets[currentTopCart].classList.add(direction);
  firstRowPets[currentTopCart].addEventListener('animationend', function() {
    this.classList.remove('pets__card_active', direction)
  })
  firstRowPets[next].classList.add(direction);
  firstRowPets[next].addEventListener('animationend', function() {
    this.classList.remove('pets__card_active', direction)
  })
  firstRowPets[prev].classList.add(direction);
  firstRowPets[prev].addEventListener('animationend', function() {
    this.classList.remove('pets__card_active', direction)
  })
  secondRowPets[currentTopCart].classList.add(direction);
  secondRowPets[currentTopCart].addEventListener('animationend', function() {
    this.classList.remove('pets__card_active', direction)
  })
  secondRowPets[next].classList.add(direction);
  secondRowPets[next].addEventListener('animationend', function() {
    this.classList.remove('pets__card_active', direction)
  })
  secondRowPets[prev].classList.add(direction);
  secondRowPets[prev].addEventListener('animationend', function() {
    this.classList.remove('pets__card_active', direction)
  })
}
function showCart (direction) {
  secondRowPets[currentTopCart].classList.add('pets__card_next', direction);
  secondRowPets[currentTopCart].addEventListener('animationend', function() {
    this.classList.remove('pets__card_next', direction);
    this.classList.add('pets__card_active');
  });
  secondRowPets[next].classList.add('pets__card_next', direction);
  secondRowPets[next].addEventListener('animationend', function() {
    this.classList.remove('pets__card_next', direction);
    this.classList.add('pets__card_active');
  });
  secondRowPets[prev].classList.add('pets__card_next', direction);
  secondRowPets[prev].addEventListener('animationend', function() {
    this.classList.remove('pets__card_next', direction);
    this.classList.add('pets__card_active');
  });
  firstRowPets[currentTopCart].classList.add('pets__card_next', direction);
  firstRowPets[currentTopCart].addEventListener('animationend', function() {
    this.classList.remove('pets__card_next', direction);
    this.classList.add('pets__card_active');;
  });
  firstRowPets[next].classList.add('pets__card_next', direction);
  firstRowPets[next].addEventListener('animationend', function() {
    this.classList.remove('pets__card_next', direction);
    this.classList.add('pets__card_active');;
  });
  firstRowPets[prev].classList.add('pets__card_next', direction);
  firstRowPets[prev].addEventListener('animationend', function() {
    this.classList.remove('pets__card_next', direction);
    this.classList.add('pets__card_active');
    isEnable = true;
  });
}
function previousCart(n) {
  hideCart('to-right');
  changeCurrentCart(n - 1);
  showCart('from-left')
}
function nextCart(n) {
  hideCart('to-left');
  changeCurrentCart(n + 1);
  showCart('from-right')
}
document.querySelector('.arrow-left__btn').addEventListener('click', function() {
  if (isEnable) {
    previousCart(currentTopCart);
  }
  console.log(currentTopCart, next, prev);
});
document.querySelector('.arrow-right__btn').addEventListener('click', function() {
  if (isEnable) {
    nextCart(currentTopCart);
  }
  console.log(currentTopCart, next, prev);
});

// Testimonials slider

const gap = 30;
const carousel = document.querySelector(".carusel"),
  content = document.querySelector(".testimonials__cards"),
  testimonialsCard = document.querySelector('.testimonials__card__bg'),
  testimonialsProgress = document.querySelector('.testimonials__progress');
let width = testimonialsCard.offsetWidth;

let autoSlideInterval = setInterval(autoSlider, 3000);
let autoSlideTimeout = null
function slider() {
  let inputValue = testimonialsProgress.value;
  content.style.transform = `translateX(-${(width + gap) * inputValue}px)`;
}

function autoSlider() {
  let newValue = +testimonialsProgress.value + 1;
  testimonialsProgress.value = newValue;
  if (newValue > 8) {
    testimonialsProgress.value = 0;
  }
  slider();
}
function delayAutoSlider() {
  clearTimeout(autoSlideTimeout);
  clearInterval(autoSlideInterval);
  autoSlideInterval = null
  autoSlideTimeout = setTimeout(() => {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(autoSlider, 3000);
  }, 7000);
}
testimonialsProgress.addEventListener('input', slider);
testimonialsProgress.addEventListener('input', delayAutoSlider);
carousel.addEventListener('click', delayAutoSlider);