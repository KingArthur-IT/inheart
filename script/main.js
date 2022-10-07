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

    //modals
    const closeModal = (name) => {
      document.querySelector(`.${name}-modal`).classList.remove('modal-visible');
      setTimeout(() => {
        document.querySelector(`.${name}-modal`).classList.remove('modal-display');
      }, 300);
    }
    const openModal = (name) => {
      document.querySelector(`.${name}-modal`).classList.add('modal-display');
      setTimeout(() => {
        document.querySelector(`.${name}-modal`).classList.add('modal-visible');
      }, 100);
    }

    //compas modal
    document.querySelector('.creation-find__help')?.addEventListener('click', () => openModal('compas'));
    document.querySelector('.compas-modal')?.addEventListener('click', () => closeModal('compas'));
    document.querySelector('.crop-modal')?.addEventListener('click', () => closeModal('crop'));

    document.querySelectorAll('.modal__hero').forEach(el => {
      el.addEventListener('click', (e) => e.stopPropagation());
    }); 

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
    });


    //Crop modal
    var cropper;
    const fullImgInModal = document.querySelector('.crop-modal__img-wrapper img');

    document.querySelector('.creation-main__photo').addEventListener('click', () => {
      document.querySelector('.creation-main__file-input').click();
    });

    document.querySelector('.creation-main__file-input').addEventListener('change', (e) => {
      if (FileReader && e.target.files[0]) {
          var fr = new FileReader();
          fr.onload = () => {
            fullImgInModal.src = fr.result;
            if (cropper) cropper.destroy();
            cropper = new Cropper(fullImgInModal, {
              aspectRatio: 200/ 256,
              background: false,
              zoomable: false,
              guides: false,
              viewMode: 1,
              dragMode: 'none',
              center: false
            });
          }
          fr.readAsDataURL(e.target.files[0]);
          openModal('crop');
      }
    });

    document.querySelector('.crop-modal__save')?.addEventListener('click', () => {
      document.querySelector('.creation-main__photo-empty')?.classList.add('d-none');
      document.querySelector('.creation-main__cropped-photo')?.classList.remove('d-none');
      document.querySelector('.creation-main__cropped-photo').src = cropper.getCroppedCanvas().toDataURL('image/jpeg');
      closeModal('crop');
      cropper.destroy();
    });
    document.querySelector('.crop-modal__close')?.addEventListener('click', () => {
      closeModal('crop');
      cropper.destroy();
    });


    //dublicate items
    document.querySelector('.creation-refs__btn').addEventListener('click', () => {
      const cloneNode = document.querySelector('.creation-refs__parent').cloneNode(true);
      document.querySelector('.creation-refs__wrapper').appendChild(cloneNode);
    });

    document.querySelector('.creation-memories__btn').addEventListener('click', () => {
      const cloneNode = document.querySelector('.creation-memories__parent').cloneNode(true);
      document.querySelector('.creation-memories__wrapper').appendChild(cloneNode);
    });
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
