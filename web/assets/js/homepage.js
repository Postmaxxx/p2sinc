import {makeCarousel} from './components/carousel-max.js';
import {makeSlider} from './components/slider-max.js';
//import {Splide} from 'https://www.jsdelivr.com/package/npm/@splidejs/splide'
  

/*

document.addEventListener( 'DOMContentLoaded', function() {
    const splide = new Splide( '.splide' );
  splide.mount();
} );
*/

let carousel_prop = {
    destinationClass : 'homepage__hero__carousel',
    imgWidth : 600,
    imgGap : 50,
    bgMoveSpeed : 5, //moving without dragging, defaultSpeed, px/tick
    timeToBgMove : 5000, //time to start background movement after stop in ms
    inertiaSensivity : 10, //inetria turns on when moving speed is higher
    inertiaStep : 0.99, //currentInertiaSpeed = inertiaStep * currentInertiaSpeed every tick
    imagesPaths : [['./assets/img/1.jpg', 'First project of our organisation  &#8594', 'http://yandex.ru'],
                    ['./assets/img/2.jpg', 'Second project &#8594', 'http://yandex.ru'],
                    ['./assets/img/3.jpg', 'Project 3 &#8594', 'http://mail.ru'],
                    ['./assets/img/4.jpg', 'Project 4 &#8594', 'http://ya.ru'],
                    ['./assets/img/5.jpg', 'Project 5 &#8594', 'http://p2sinc.com'],
                    ['./assets/img/6.jpg', 'Project 6 &#8594', 'http://exler.ru']],
    expandPath : './assets/img/expand-icon.png',
    closePath : './assets/img/x.png',
    nodeForFullsize : 'content-container',
    expandIconWidth: 25,
    transitionTime: 1
}

let carousel = makeCarousel(carousel_prop);

//console.log(carousel);
//carousel.destroy()





























/*
window.addEventListener('resize',(e) => {
    //console.log(carousel);
    //carousel.destroy(); //?????
    let contentConteinerWidth = document.querySelector('.content-container');
    if (contentConteinerWidth.clientWidth < 1280) {
        carouselWidth = 850 + contentConteinerWidth.clientWidth - 1280;
    } 
    carousel();
})

*/

let slider_1 = {
    destinationClass : 'homepage__slider',
    carouselHeight : 600,
    carouselWidth: 1280,
    imgWidth : 1280,
    bgMoveSpeed : 5, //moving without dragging, defaultSpeed, px/tick
    //timeToBgMove : 5000, //time to start background movement after stop in ms
    //inertiaSensivity : 10, //inetria turns on when moving speed is higher
    //inertiaStep : 0.99, //currentInertiaSpeed = inertiaStep * currentInertiaSpeed every tick
    imagesPaths : ['./assets/img/1.jpg','./assets/img/2.jpg','./assets/img/3.jpg','./assets/img/4.jpg','./assets/img/5.jpg','./assets/img/6.jpg']
}

//makeSlider(slider_1);























/*
window.addEventListener('resize',(e) => {
    console.log(firstCarousel);
    firstCarousel.destroy(  )
})
*/


/*
let carousel_2 = {
    destinationClass : 'homepage__hero__carousel',
    carouselHeight : 600,
    carouselWidth: 500,
    imgWidth : 400,
    imgGap : 50,
    bgMoveSpeed : 5, //moving without dragging, defaultSpeed, px/tick
    timeToBgMove : 5000, //time to start background movement after stop in ms
    inertiaSensivity : 10, //inetria turns on when moving speed is higher
    inertiaStep : 0.99, //currentInertiaSpeed = inertiaStep * currentInertiaSpeed every tick
    imagesPaths : ['./assets/img/1.jpg','./assets/img/2.jpg','./assets/img/3.jpg','./assets/img/4.jpg','./assets/img/5.jpg','./assets/img/6.jpg']
}

let slider = makeCarousel(carousel_2);



*/  













/*
let slider_1 = {
    destinationClass : 'homepage__hero__carousel',
    carouselHeight : 800,
    carouselWidth: contentConteinerWidth.clientWidth,
    imgWidth : contentConteinerWidth.clientWidth,
    imgGap : 0,
    bgMoveSpeed : 5, //moving without dragging, defaultSpeed, px/tick
    timeToBgMove : 5000, //time to start background movement after stop in ms
    //inertiaSensivity : 10, //inetria turns on when moving speed is higher
    inertiaStep : 0.99, //currentInertiaSpeed = inertiaStep * currentInertiaSpeed every tick
    imagesPaths : ['./assets/img/1.jpg','./assets/img/2.jpg','./assets/img/3.jpg','./assets/img/4.jpg','./assets/img/5.jpg','./assets/img/6.jpg']
}

makeSlider(slider_1);*/
//# sourceMappingURL=homepage.js.map
