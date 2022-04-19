import {makeCarousel} from './components/carousel-max.js';
import {makeSideNav} from './components/nav_side.js';



let carousel_prop = {
    destinationClass : 'homepage__hero__carousel',
    imgWidth : 600,
    imgGap : 20,
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
    expandPath : './assets/img/expand-icon.png',
    closePath : './assets/img/x.png',
    nodeForFullsize : 'content-container',
    expandIconWidth: 25,
    transitionTime: 1
}
let carousel = makeCarousel(carousel_prop);

makeSideNav();





//# sourceMappingURL=homepage.js.map
