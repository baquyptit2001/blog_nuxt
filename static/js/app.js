$(document).ready(function () {
  $('#burger-side').click(function () {
    $(this).toggleClass('open');
  });
  let myOffcanvas = document.getElementById('offcanvasExample')
  myOffcanvas.addEventListener('hidden.bs.offcanvas', function () {
    $('#burger-side').removeClass('open');
  })
});
