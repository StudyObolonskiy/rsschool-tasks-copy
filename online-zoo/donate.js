const amountBtns = document.querySelectorAll('.amount__btn'),
  anotherAmount = document.querySelector('.another-amount__field'),
  amountScale = document.querySelector('.amount__scale');
amountScale.addEventListener('input', (event) => {
  if (event.target.matches('.amount__btn')) {
    amountBtns.forEach(btn => {
      btn.classList.remove('amount__btn_checked')
    });
    event.target.classList.add('amount__btn_checked')
    anotherAmount.value = event.target.value
  }
});
anotherAmount.addEventListener('input', () => {
  amountBtns.forEach(btn => {
    btn.classList.remove('amount__btn_checked');
    if (anotherAmount.value == btn.value) {
      btn.classList.add('amount__btn_checked');
    }
  });
  if (anotherAmount.value > 9999) {
    anotherAmount.value = 9999;
  }
  if (anotherAmount.value <= 0) {
    anotherAmount.value = '';
  }
})