// Carousel on choose color temlate for tablet and mobile
$(document).ready(function(){
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
        items: 1
      },
      525:{
        items: 2
      },
      768:{
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
});