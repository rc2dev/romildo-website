const isIE = window.document.documentMode;

if (isIE) {
  // Header doesn't render properly
  document.querySelector('.header').style.display = 'none';
}
