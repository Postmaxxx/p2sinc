import {makeCarousel} from './components/carousel-max.js';
import {makeSideNav} from './components/nav_side.js';


makeSideNav();


document.addEventListener( 'DOMContentLoaded', function() {
  var splideAboutUs_1 = new Splide('.splide_about-us_1', {
      type: "loop",
      perPage: 1,
      clones:1, 
      arrows: false,
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
      padding: { right: "15%"},
      arrows: true,
      classes: {
          pagination: 'splide__pagination_text',
          page      : 'splide__pagination_text__pagination',
      },
  });

  const splideLabels = Array.from(document.querySelector(".splide_about-us_1").querySelectorAll("[data-descr]"))
    .map(slide => slide.dataset.descr)

  
  splideAboutUs_1.on( 'pagination:mounted', data => {
  // `items` contains all dot items
      data.items.forEach((item, index) => {
          item.button.textContent = String( splideLabels[index] );
      } );
  } );


  splideAboutUs_1.mount();

    //move pagination between arrows
    document.querySelector(".splide_about-us_1").querySelector(".splide__arrows").firstElementChild
    .after(document.querySelector(".splide_about-us_1").querySelector(".splide__pagination_text"))
});