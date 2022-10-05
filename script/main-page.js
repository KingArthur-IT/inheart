//set theme color
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const theme = urlParams.get('theme');

let themeHslColor = {h: 176, s: 93, l: 6}
switch (theme) {
  case 'black':
    themeHslColor = {h: 180, s: 3, l: 8}
    break;
  case 'red':
    themeHslColor = {h: 349, s: 85, l: 11}
    break;
  case 'blue':
    themeHslColor = {h: 220, s: 87, l: 17}
    break; 

  default:
    break;
}

if (urlParams.has('theme')){
  document.querySelector('body')?.classList.add(theme)
}

const headElement = document.querySelector('.page-head');
if (headElement){
  const winWidth = window.innerWidth;
  const winHeight = window.innerHeight;

  headElement.addEventListener('mousemove', (e) => {
    const xColorDisplacement = Math.round(20.0 * e.clientX / winWidth - 1.0);
    const yColorDisplacement = Math.round(4.0 * e.clientY / winHeight - 2.0);

    const xPhotoDisplacement = Math.round(5 * e.clientX / winWidth - 2.5);
    const yPhotoDisplacement = Math.round(5 * e.clientY / winHeight - 2.5);

    document.querySelector('body').style["background-color"] = `hsl(${themeHslColor.h + xColorDisplacement}, ${themeHslColor.s}%, ${themeHslColor.l + yColorDisplacement}%)`;
    document.querySelector('.page-head__thumbnail-label').style["background-color"] = `hsl(${themeHslColor.h + xColorDisplacement}, ${themeHslColor.s}%, ${themeHslColor.l + yColorDisplacement}%)`;

    document.querySelector('.page-head__photo img').style['transform'] = `translate(${xPhotoDisplacement}%, ${yPhotoDisplacement}%)`
  })
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