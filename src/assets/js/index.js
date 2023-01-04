import {makeCarousel} from './components/carousel-max.js';
import {makeSideNav} from './components/nav_side.js';



let carousel__index_1 = {
    destinationData : 'index_1',
    //destinationClass : 'carousel_max',
    imgWidth : 600,
    imgGap : 15,
    bgMoveSpeed : 5, //moving without dragging, defaultSpeed, px/tick
    timeToBgMove : 5000, //time to start background movement after stop in ms
    inertiaSensivity : 10, //inetria turns on when moving speed is higher
    inertiaStep : 0.99, //currentInertiaSpeed = inertiaStep * currentInertiaSpeed every tick
    imagesPaths : [['./assets/img/1.jpg', 'First project of our organisation', 'http://twitter.com'],
                    ['./assets/img/2.jpg', 'Second project', 'http://yahoo.com'],
                    ['./assets/img/3.jpg', 'Project 3', 'http://mail.com'],
                    ['./assets/img/4.jpg', 'Project 4', 'http://hotmail.com'],
                    ['./assets/img/5.jpg', 'Project 5', 'http://p2sinc.com'],
                    ['./assets/img/6.jpg', 'Project 6', 'http://youtube.com']],
    expandPath : './assets/json/Plus_Widget.json',
    closePath : './assets/img/x.png',
    nodeForFullsize : 'content-container',
    expandIconWidth: 70,
    expandIconHeignt: 70,
    transitionTime: 1,
}

/*
let carousel__index_2 = {
  destinationData : 'index_2',
  //destinationClass : 'carousel_max',
  imgWidth : 600,
  imgGap : 15,
  bgMoveSpeed : 5, //moving without dragging, defaultSpeed, px/tick
  timeToBgMove : 5000, //time to start background movement after stop in ms
  inertiaSensivity : 10, //inetria turns on when moving speed is higher
  inertiaStep : 0.99, //currentInertiaSpeed = inertiaStep * currentInertiaSpeed every tick
  imagesPaths : [['./assets/img/1.jpg', 'First project of our organisation  &#8594', 'http://twitter.com'],
                  ['./assets/img/2.jpg', 'Second project &#8594', 'http://yahoo.com'],
                  ['./assets/img/3.jpg', 'Project 3 &#8594', 'http://mail.com'],
                  ['./assets/img/4.jpg', 'Project 4 &#8594', 'http://hotmail.com'],
                  ['./assets/img/5.jpg', 'Project 5 &#8594', 'http://p2sinc.com'],
                  ['./assets/img/6.jpg', 'Project 6 &#8594', 'http://youtube.com']],
  expandPath : './assets/json/Plus_Widget.json',
  closePath : './assets/img/x.png',
  nodeForFullsize : 'content-container',
  expandIconWidth: 70,
  expandIconHeignt: 70,
  transitionTime: 1
}*/

let carousel = makeCarousel(carousel__index_1);
//let carousel2 = makeCarousel(carousel__index_2);

makeSideNav();














  let iconMenu1 = document.querySelector('.our-divisions__logo_eng');
  let animationMenu1 = bodymovin.loadAnimation({
          container: iconMenu1,
          renderer: 'svg',
          loop: true,
          autoplay: false,
          path: "./assets/json/ENG_Widget.json",
          initialSegment: [34, 34],
  });
  
  iconMenu1.addEventListener('mouseenter', (e) => {
    animationMenu1.playSegments([0, 34], true);
  });
  iconMenu1.addEventListener('mouseleave', (e) => {
    animationMenu1.goToAndStop(34, 34)
  });





  let iconMenu2 = document.querySelector('.our-divisions__logo_cx');
  let animationMenu2 = bodymovin.loadAnimation({
          container: iconMenu2,
          renderer: 'svg',
          loop: true,
          autoplay: false,
          path: "./assets/json/Cx Widget.json",
          initialSegment: [54, 97],
  });
  
  iconMenu2.addEventListener('mouseenter', (e) => {
    animationMenu2.playSegments([0, 97], true);
  });

  iconMenu2.addEventListener('mouseleave', (e) => {
    animationMenu2.goToAndStop(54, 97)
  });






  let iconMenu3 = document.querySelector('.our-divisions__logo_cm');
  let animationMenu3 = bodymovin.loadAnimation({
          container: iconMenu3,
          renderer: 'svg',
          loop: true,
          autoplay: false,
          path: "./assets/json/CM_Widget.json",
          initialSegment: [34, 55],
  });
  
  iconMenu3.addEventListener('mouseenter', (e) => {
    animationMenu3.playSegments([0, 55], true);
  });

  iconMenu3.addEventListener('mouseleave', (e) => {
    animationMenu3.goToAndStop(34, 55)
  });




  
const splide_1 = {
  className: 'splide_index_1',
}


  document.addEventListener( 'DOMContentLoaded', function() {
    var splide = new Splide(`.${splide_1.className}`, {
        type: "loop",
        perPag: 1,
        clones:1, 
        arrows: false,
        drag: true,
        dragMinThreshold: {
            mouse: 0,
            touch: 10,
        },
        autoplay: true,
        interval: 4000,
        pauseOnHover: false,
        pauseOnFocus: false,
        cover: true,
        height: "520px",
        classes: {
            pagination: 'splide__pagination',
            //page      : 'splide__pagination__page your-class-page',
        },
    });
    splide.mount();
});


