const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if (urlParams.has('theme')){
  document.querySelector('body').classList.add(urlParams.get('theme'))
}

// Carousel on choose color temlate for tablet and mobile
$(document).ready(function(){
  //bibliography
  const biographyOwl = $('.page-biography__carousel').owlCarousel({
    loop: true,
    slideTransition: 'linear',
    autoplayTimeout: 2000,
    autoplaySpeed: 2000,
    nav: false,
    dots: false,
    items: 4,
    center: true,
    responsive:{
      0:{
        items: 1.5
      },
      768:{
        items: 2.5
      },
      1024:{
        items: 3.5
      }, 
    }
  });

  $('.biography-left-btn').click(function() {
    biographyOwl.trigger('prev.owl.carousel');
  })
  $('.biography-right-btn').click(function() {
    biographyOwl.trigger('next.owl.carousel');
  })

  //media
  $('.media-mobile-carousel').owlCarousel({
    loop: false,
    slideTransition: 'linear',
    autoplayTimeout: 2000,
    autoplaySpeed: 2000,
    nav: false,
    dots: false,
    center: true,
    items: 1.2
  });
});