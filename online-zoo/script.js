let menuBtn = document.querySelector('.menu-btn');
menuBtn.addEventListener('click', e => {
  let mobileNav = document.querySelector('.mobile__nav');
  if (mobileNav.style.display === 'flex') {
    mobileNav.style.display = 'none';
  } else {
    mobileNav.style.display = 'flex';
  }
  menuBtn.classList.toggle('active');
});