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
    const closeModal = () => {
      document.querySelector('.modal').classList.remove('modal-visible');
      setTimeout(() => {
        document.querySelector('.modal').classList.remove('modal-display');
      }, 300);
    }

    document.querySelector('.modal').addEventListener('click', () => closeModal());
    document.querySelector('.modal__hero').addEventListener('click', (e) => e.stopPropagation());

    //go to page
    [...document.getElementsByClassName("preview-btn")].forEach((el) => {
      el.addEventListener('click', () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        let theme = 'classic';

        if (urlParams.has('theme')){
          theme = urlParams.get('theme');
        }
        else{
          theme = document.querySelector('input[name="template-radio"]:checked').value;
        }
        window.location.href=`page.html?theme=${theme}`;
      })
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

  templateOwl.on('changed.owl.carousel', function (e) {
    const sliderValue = e.item.index > 4 ? e.item.index - 4 : e.item.index;
    let radioValue;

    switch (sliderValue) {
      case 1:
        radioValue = 'blue'
        break;
      case 2:
        radioValue = 'classic'
        break;
      case 3:
        radioValue = 'black'
        break;
      case 4:
        radioValue = 'red'
        break;
      default:
        radioValue = 'classic'
    }
    
    var queryParams = new URLSearchParams(window.location.search);
    queryParams.set("theme", radioValue);
    history.replaceState(null, null, "?" + queryParams.toString());
  })

  // $('#template-mob-radio-1').prop('checked', true);
});