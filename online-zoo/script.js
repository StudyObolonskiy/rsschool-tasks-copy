let menuBtn = document.querySelector('.menu-btn');
let headerWrapper = document.querySelector('.header__wrapper');
let logo = document.querySelector('.logo')
let logoImg = document.querySelector('.logo__img')
menuBtn.addEventListener('click', e => {
  let mobileNav = document.querySelector('.mobile__nav');
  if (mobileNav.style.display === 'flex') {
    mobileNav.style.display = 'none';
  } else {
    mobileNav.style.display = 'flex';
  }
  menuBtn.classList.toggle('active');
  headerWrapper.classList.toggle('header__mob');
  logo.classList.toggle('logo_active');
  logoImg.classList.toggle('logo__img_active');
});