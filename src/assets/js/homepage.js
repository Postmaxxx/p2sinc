import {makeCarousel} from './components/carousel-max.js';
import {makeSlider} from './components/slider-max.js';


let carouselWidth = 850;
let contentConteinerWidth = document.querySelector('.content-container');
console.log(contentConteinerWidth.clientWidth);
if (contentConteinerWidth.clientWidth < 1280) {
    carouselWidth = 850 + contentConteinerWidth.clientWidth - 1280;
} 
/*if (contentConteinerWidth.clientWidth < 1280) {
    carouselWidth = 900 + contentConteinerWidth.clientWidth - 1280;
} 
*/



let carousel_1 = {
    destinationClass : 'homepage__hero__carousel',
    carouselHeight : 600,
    carouselWidth: carouselWidth,
    imgWidth : 600,
    imgGap : 50,
    bgMoveSpeed : 5, //moving without dragging, defaultSpeed, px/tick
    timeToBgMove : 5000, //time to start background movement after stop in ms
    inertiaSensivity : 10, //inetria turns on when moving speed is higher
    inertiaStep : 0.99, //currentInertiaSpeed = inertiaStep * currentInertiaSpeed every tick
    imagesPaths : ['./assets/img/1.jpg','./assets/img/2.jpg','./assets/img/3.jpg','./assets/img/4.jpg','./assets/img/5.jpg','./assets/img/6.jpg'],
    
    expandPath : './assets/img/expand-icon.jpg',
    expandIconWidth: 25
}

let carousel = makeCarousel(carousel_1);





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