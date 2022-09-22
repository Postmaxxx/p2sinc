import {makeCarousel} from './components/carousel-max.js';
import {makeSideNav} from './components/nav_side.js';


let carousel_prop = {
  destinationData : 'projects_1',
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

let carousel = makeCarousel(carousel_prop);


makeSideNav();
