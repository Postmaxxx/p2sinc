import {makeCarousel} from './components/carousel-max.js';
import {makeSideNav} from './components/nav_side.js';


makeSideNav();

const splide_1 = {
  className: 'splide_about-us_1',
}

// creation splide type-2
document.addEventListener( 'DOMContentLoaded', function() {
  var splideAboutUs_1 = new Splide(`.${splide_1.className}`, {
      type: "loop",
      perPage: 1,
      clones:1, 
      drag: true,
      dragMinThreshold: {
          mouse: 0,
          touch: 10,
      },
      autoplay: false,
      interval: 4000,
      pauseOnHover: false,
      pauseOnFocus: false,
      cover: true,
      heightRatio: .5,
      gap: 20,
      padding: { 
        right: "15%"
      },
      classes: {
          pagination: 'splide__pagination_text',
          page      : 'splide__pagination_text__pagination',
      },
  });

  //lables capture from slides using data-descr
  const splideLabels = Array.from(document.querySelector(`.${splide_1.className}`).querySelectorAll("[data-descr]"))
    .map(slide => slide.dataset.descr)

  
    //set lables as pagination buttons text
  splideAboutUs_1.on( 'pagination:mounted', data => {
  // `items` contains all dot items
      data.items.forEach((item, index) => {
          item.button.textContent = String( splideLabels[index] );
      } );
  } );


  splideAboutUs_1.mount();

    //move pagination between splide arrows, otherwise click areas overlap
    document.querySelector(`.${splide_1.className}`).querySelector(".splide__arrows").firstElementChild
    .after(document.querySelector(`.${splide_1.className}`).querySelector(".splide__pagination_text"))
});