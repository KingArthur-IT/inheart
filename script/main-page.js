//set theme color
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const theme = urlParams.get('theme');

const winWidth = window.innerWidth;
const winHeight = window.innerHeight;

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
  document.querySelector('body')?.classList.remove('classic')
  document.querySelector('body')?.classList.add(theme)
  document.querySelector('body')?.classList.add('start')
};

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelector('body')?.classList.add('transition-3');
  
    //head animations
    const headElement = document.querySelector('.page-head');
    if (headElement){
      headElement.addEventListener('mousemove', (e) => {
        const xColorDisplacement = Math.round(20.0 * e.clientX / winWidth - 1.0);
        const yColorDisplacement = Math.round(4.0 * e.clientY / winHeight - 2.0);

        const xPhotoDisplacement = Math.round(5 * e.clientX / winWidth - 2.5);
        const yPhotoDisplacement = Math.round(5 * e.clientY / winHeight - 2.5);

        document.querySelector('body').style["background"] = `hsl(${themeHslColor.h + xColorDisplacement}, ${themeHslColor.s}%, ${themeHslColor.l + yColorDisplacement}%)`;
        
        document.querySelector('.page-head__photo img').style['transform'] = `translate(${xPhotoDisplacement}%, ${yPhotoDisplacement}%)`
      })
    }
  }, 3000);

  //change bg color on scroll
  document.addEventListener('scroll', (e) => {
    const sectionOffet = 300;
    const currentSectionTop = document.querySelector('.page-biography').getBoundingClientRect().top;

    if (currentSectionTop < sectionOffet)
      document.querySelector('body')?.classList.add('white')
    else document.querySelector('body')?.classList.remove('white')

    //footer animation
    const lastSection = document.querySelector('.page-rested');
    if (lastSection){
      const footerHeight = 10 + document.querySelector('footer').offsetHeight;
      const displacement = window.innerHeight + window.scrollY + footerHeight - document.body.offsetHeight;
      
      if (displacement > 0){
        document.querySelector('footer').classList.add('visible');
        document.querySelector('body')?.classList.add('scrolled-to-footer');

        if (displacement < footerHeight){
          const scaleValue = 1.0 - 0.03 * displacement / footerHeight;
          const borderR = 120.0 * displacement / footerHeight - 60.0;
          document.querySelector('main').style["transform"] = `translateY(${-displacement}px) scaleX(${scaleValue})`;
          document.querySelector('.page-rested').style["border-radius"] = `0 0 ${borderR}px ${borderR}px`
        } 
        if (displacement > footerHeight - 10)
          document.querySelector('footer').classList.add('onTop')
        else document.querySelector('footer').classList.remove('onTop');

      }
      else{
        document.querySelector('footer').classList.remove('visible');
        document.querySelector('body')?.classList.remove('scrolled-to-footer');
      }
    }
  })

  //media animations
  const mediaSection = document.querySelector('.page-biography__friends');
  if (mediaSection){
    mediaSection.addEventListener('mousemove', (e) => {
      const xPhotoDisplacement = Math.round(5 * e.clientX / winWidth - 2.5);
      const yPhotoDisplacement = Math.round(5 * e.clientY / winHeight - 2.5);

      document.querySelectorAll('.page-biography__img-wrapper img').forEach((img) => {
        img.style['transform'] = `translate(${xPhotoDisplacement}%, ${yPhotoDisplacement}%)`
      })
    })
  }


  //read more accordeon
  document.querySelectorAll('.read-more').forEach((el) => {
    el.addEventListener('click', () => {
      el.querySelector('span').style["display"] = "none";
      const height = el.querySelector('p').scrollHeight;
      el.querySelector('p').style["max-height"] = `${height}px`
    })
  })

})

// Carousel on choose color temlate for tablet and mobile
$(document).ready(function(){

  var speedVal = 1;
  const speedObj = {
    '1': 3000,
    '2': 1000,
    '3': 600,
    '4': 400
  }
  var s = 3000;
  const biographyOwl = $('.page-biography__carousel').owlCarousel({
    loop: true,
    slideTransition: 'linear',
    autoplay: true,
    autoplayTimeout: speedObj[speedVal],
    autoplaySpeed: speedObj[speedVal],
    smartSpeed: speedObj[speedVal],
    nav: false,
    dots: false,
    center: true,
    mouseDrag: false,
    touchDrag: false,
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
    },
  });

  document.querySelector('.page-biography__carousel').addEventListener('wheel', (e) => {
    e.preventDefault();
    console.log(s);
    const sign = e.wheelDeltaY < 0 ? -1 : 1;
    if ((sign === -1 && s > 400) || (sign === 1 && s <= 3000)){
      s += sign * 100;
      speedUpdate(s);
    }
  })

  $('.biography-left-btn').click(function() {
    speedVal = speedVal > 1 ? speedVal - 1 : speedVal
    speedUpdate(speedObj[speedVal])
  })
  $('.biography-right-btn').click(function() {
    speedVal = speedVal < 4 ? speedVal + 1 : speedVal
    speedUpdate(speedObj[speedVal])
  })

  biographyOwl.on("dragged.owl.carousel", function (event) {
    if (event.relatedTarget['_drag']['direction'] == 'left'){
      speedVal = speedVal < 4 ? speedVal + 1 : speedVal
      speedUpdate(speedObj[speedVal])
    }
    else{
      speedVal = speedVal > 1 ? speedVal - 1 : speedVal
      speedUpdate(speedObj[speedVal])
    }

  });

  function speedUpdate(speed){
    biographyOwl.data('owl.carousel').options.autoplaySpeed = speed;
    biographyOwl.data('owl.carousel').options.autoplayTimeout = speed;
    biographyOwl.data('owl.carousel').options.smartSpeed = speed;
    biographyOwl.trigger( 'refresh.owl.carousel' );
  }

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