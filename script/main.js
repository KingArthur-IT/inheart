document.addEventListener('DOMContentLoaded', () => {
    // Mask for dates
    const inputElement = document.querySelectorAll('input[data-type="date"] ').forEach((element) => {
        IMask(
            element,
            {
              mask: Date,
              min: new Date(1990, 0, 1),
              max: new Date(2050, 0, 1),
              lazy: false
            });
    });

    //Compas modal
    //open modal
    document.querySelector('.creation-find__help').addEventListener('click', () => {
      document.querySelector('.modal').classList.add('modal-display');
      setTimeout(() => {
        document.querySelector('.modal').classList.add('modal-visible');
      }, 100);
    });
    //close modal
    document.querySelector('.modal__btn').addEventListener('click', () => {
      document.querySelector('.modal').classList.remove('modal-visible');
      setTimeout(() => {
        document.querySelector('.modal').classList.remove('modal-display');
      }, 300);
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