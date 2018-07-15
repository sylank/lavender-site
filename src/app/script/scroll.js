var navBar = $('#menu')

// Add navbar background on scroll
$(window).on('scroll', function () {
  if ($(this).scrollTop() >= 60) {
    navBar.addClass('menu-scroll')
  } else {
    navBar.removeClass('menu-scroll')
  }
})
