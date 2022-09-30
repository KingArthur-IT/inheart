document.addEventListener('DOMContentLoaded', () => {

    const inputElement = document.querySelectorAll('input[data-type="date"] ').forEach((element) => {
        IMask(
            element,
            {
              mask: Date,
              min: new Date(1990, 0, 1),
              max: new Date(2050, 0, 1),
              lazy: false
            });
    }) 
})

// Carousel on choose color temlate for tablet and mobile
$(document).ready(function(){
  const templateOwl = $('.creation-template__carousel').owlCarousel({
    loop: true,
    slideTransition: 'linear',
    autoplayTimeout: 2000,
    autoplaySpeed: 2000,
    nav: false,
    dots: false,
    items: 3,
    responsive:{
      0:{
        items: 1
      },
      525:{
        items: 2
      },
      768:{
        items: 3
      },
    }
  });

  $('.template-left-btn').click(function() {
    templateOwl.trigger('prev.owl.carousel');
  })
  $('.template-right-btn').click(function() {
    templateOwl.trigger('next.owl.carousel');
  })

  // $('#template-mob-radio-1').prop('checked', true);
});