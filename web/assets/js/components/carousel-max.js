export function makeCarousel(params) {

const {destinationClass, imagesPaths, imgWidth, imgGap, bgMoveSpeed, timeToBgMove, inertiaStep, inertiaSensivity, expandPath, expandIconWidth, nodeForFullsize, transitionTime, closePath } = params;
const carousel = document.querySelector('.'+destinationClass)

let carouselHeight = document.querySelector('.'+destinationClass).clientHeight;
let carouselWidth = document.querySelector('.'+destinationClass).clientWidth;

const totalImages = imagesPaths.length; 

let mouseEnterPoint, dxMouse = 0; //mouseX - start amoun X of mouse when button pressed, dxMouse - the difference between mouseX and current mouse X position 
let dxRibbon = - (imgWidth + imgGap)*2 + (carouselWidth - (imgWidth + imgGap))/2; //offset of Ribbon
let move = false; //is gallery moving now

let picsArray = [...imagesPaths]; //the array length=5 for images to show
picsArray = picsArray.slice(0, 5)
//console.log('picsArray', picsArray, 'imagesPaths    ', imagesPaths);

let basePic = totalImages - 2; //the order of the first picture in picsArray
const carouselCenter = dxRibbon;
//offsetMax = max offset of image (left or right)

let inertiaCurrentMouseX; //current mouse x coordinate
let inertiaPreviousMouseX; //last iteration mouse x coordinate
let inertiaSpeedX = 0; //speed of moving while inertia, decreasing by *inertiaStep
let inertiaCounter; //setinterval for declining speed while inertia
let carouselInertionTimer; //setinterva for calculating mouse speed


let bgMove; //moving without dragging, speed
let bgMoveCounter; //setinterval for background movement
let bgMoveCoundown; //setTimeout for background movement restore

//creation the carousel html and styles
carousel.style.maxWidth = '100%';
carousel.style.height = carouselHeight + 'px';
carousel.style.position = 'relative';
carousel.style.overflow = 'hidden';
carousel.style.whiteSpace = 'nowrap';
carousel.style.userSelect = 'none';
carousel.style.boxSizing = 'border-box';
carousel.style.transition = `${transitionTime}s`;


carousel.innerHTML = `
    <div class="${destinationClass}-images-container">
        ${picsArray.map((el, index) => {
            return (`
            <div class="${destinationClass}-img-container">
                <img class="${destinationClass}-expand-icon" src="${expandPath}">
            </div>`)
        }).join('')}
    </div>
    `

const ribbonImages = document.querySelector(`.${destinationClass}-images-container`); //The container for all 5 images
const imgContainerList = document.querySelectorAll(`.${destinationClass}-img-container`); //The list of all 5 containers
const imgExpandIconList = document.querySelectorAll(`.${destinationClass}-expand-icon`); //The list of all 5 containers


const sourceNode = document.querySelector(`.${nodeForFullsize}`);
sourceNode.insertAdjacentHTML('afterbegin', `
    <div class="${destinationClass}-full-screen-wrapper">
            <div class="${destinationClass}-full-screen-image"></div>
            <div class="${destinationClass}-full-screen-image-closer"></div>
            <div class="${destinationClass}-description">
                <a class="${destinationClass}-link" href="#"></a>
            </div>
    </div>`)
const imgFullScreenWrapper = document.querySelector(`.${destinationClass}-full-screen-wrapper`); //The container for fullscreen image
const imgFullScreenImage = document.querySelector(`.${destinationClass}-full-screen-image`); //The container for fullscreen image
const imgFullScreenCloser = document.querySelector(`.${destinationClass}-full-screen-image-closer`); //The container for fullscreen image
const imgDescr = document.querySelector(`.${destinationClass}-description`); 
const imgDescrLink = document.querySelector(`.${destinationClass}-link`); 



//styles injection
ribbonImages.style.cssText = `
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    position: relative;
    width: auto;
    display: inline-block;
    pointer-events: none;
    `

imgContainerList.forEach((el) => {
    el.style.cssText = `
        width: ${imgWidth}px;
        height: ${carouselHeight}px;
        margin-left: ${imgGap/2}px; 
        margin-right: ${imgGap/2 }px;
        padding: 0;
        box-sizing: border-box;
        display: inline-block;
        overflow: hidden;
        
        border: 1px solid green;
        background-size: auto 100%;
        background-position: 50% center;
        pointer-events: none;
        `
    })


imgExpandIconList.forEach((el, index) => {
    el.style.cssText = `
        width: ${expandIconWidth}px;
        height: $auto;
        position: relative;
        top: 85%;
        left: 10%;
        pointer-events: auto;
        cursor: pointer;

    `
})



function defaultFullScreenStyles() {
    imgFullScreenWrapper.style.cssText = `
        margin: 0;
        padding: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0px;
        height: 0px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        transition: ${transitionTime}s;
    `;

    imgFullScreenCloser.style.cssText = `
        height: 0px;
        width: 0px;
        border-radius: 50%;
        background-color: #404040;
        position: relative;
        bottom: 70px;
        align-self: flex-end;
        z-index: 2000;
        pointer-events: auto;
        cursor: pointer;
        margin-right: 30px;
        transition: ${transitionTime}s;
        background-image: url(${closePath});
        background-size: 60% 60%;
        background-position: center center;
        background-repeat: no-repeat;
    `;

    imgDescr.style.cssText = `
        top: ${carouselHeight-120}px;
        width: 0;
        height: 0;
        padding: 15px;
        background-color: #404040;
        border-radius: 20px;
        margin-right: 30px;
        align-items: center;
        justify-content: center;
        margin-left: auto;
        max-width: 300px;
        color: white;
        display: none;
        transition: ${transitionTime}s;
    `;

    imgDescrLink.style.pointerEvents = 'auto';
    imgDescrLink.style.textDecoration = 'underline';
    imgDescrLink.style.transition = `${transitionTime}s`

    carousel.style.opacity = '100%';
}

defaultFullScreenStyles();














const changePicsOrder = (direction) => { //change pictures to show in picsArray and show them. Filled from imagesPaths
    if (direction === '+') { //pictures offset when moving left
        (basePic > totalImages -1) ? basePic = 1 : basePic++
    }
    if (direction === '-') {//pictures offset when moving right
        (basePic < 1) ? basePic = totalImages-1 : basePic--
    }
    
    for (var index = 0; index < 5; index++) {
        picsArray[index] = (basePic+index < totalImages) ? imagesPaths[index+basePic] : imagesPaths[basePic+index - totalImages]
    }
    

    imgContainerList.forEach((el, index) => {  //change all 5 images to show in imagesList
        el.style.backgroundImage = `url(${picsArray[index][0]}`;
        el.childNodes[1].dataset.path = picsArray[index][0]; //changing path links for expanding images
        el.childNodes[1].dataset.descr = picsArray[index][1]; //changing path links for expanding images
        el.childNodes[1].dataset.link = picsArray[index][2]; //changing path links for expanding images
        //<a class="${destinationClass}-link" href="${imagesPaths[index][2]}">${imagesPaths[index][1]}</a>
    })

}


const changeImgOffset = (currentPos) => { //changing offset for all pictures
    imgContainerList.forEach((el, index) => {
            let centerDx = currentPos - carouselCenter - (imgWidth + imgGap)*(2-index); //the offset between central position and current position
            let k = 50 + 50/((carouselWidth + imgWidth) / 2) * centerDx;
            el.style.backgroundPosition = `${k}% center`;
    })
}


const redrawCarousel = (dx) => { //changing the position of ribbonImages
    if (dx + dxRibbon > -(imgWidth + imgGap - (carouselWidth-imgWidth -imgGap)/2)) { //if the offset is more than 1 picture width
        dxRibbon = dxRibbon - imgWidth - imgGap; 
        changePicsOrder('-');

    }
    if (dx + dxRibbon < -(imgWidth + imgGap)*3 + (carouselWidth-imgWidth -imgGap)/2  ) { //if the offset is more than 1 picture width
        dxRibbon = dxRibbon + imgWidth + imgGap; 
        changePicsOrder('+');
    }
    
    ribbonImages.style.left = `${dx + dxRibbon}px`; //change ribbon position
    changeImgOffset(dx + dxRibbon); //change images offset


    
}



function expandImage(path, descr, link) {
    imgFullScreenWrapper.style.top = `10px`;
    imgFullScreenWrapper.style.left = `1vw`;
    imgFullScreenWrapper.style.width = `98%`;
    imgFullScreenWrapper.style.height = `${carouselHeight}px`;
    imgFullScreenWrapper.style.border = `2px solid blue`;
    imgFullScreenWrapper.style.backgroundImage = `url(${path})`;
    imgFullScreenWrapper.style.backgroundSize = `100% auto`;
    imgFullScreenWrapper.style.backgroundRepeat = `no-repeat`;
    imgFullScreenWrapper.style.backgroundPosition = `50% 50%`;


    imgFullScreenImage.style.width = `100%`;
    imgFullScreenImage.style.height = `${carouselHeight}px`;

    imgDescr.style.position = `relative`;
    imgDescr.style.top = `-50px`;
    imgDescr.style.display = 'block'
    imgDescr.style.height = 'auto'
    imgDescr.style.width = 'auto'


    imgDescrLink.innerHTML = descr;
    imgDescrLink.href = link;

    imgFullScreenCloser.style.bottom = `${carouselHeight -130}px`;
    imgFullScreenCloser.style.height = `25px`;
    imgFullScreenCloser.style.width = `25px`;

    carousel.style.opacity = '50%'

}




function closeImage() {
    defaultFullScreenStyles();

}


imgFullScreenCloser.addEventListener('click', e => closeImage(e))



function mouseDownActions(e) {
    if (e.target.tagName === 'IMG') {
        expandImage(e.target.dataset.path,e.target.dataset.descr,e.target.dataset.link);
    }

    clearInterval(inertiaCounter); //stop the inertia
    clearTimeout(bgMoveCoundown); //stop the countdown
    bgMove = 0;
    move = true;
    mouseEnterPoint = e.offsetX;
    carousel.classList.add(`${destinationClass}_grabbed`);
}





































carousel.addEventListener('mousedown', e => mouseDownActions(e))

function mouseMoveActions(e) {
    if (move) {
        dxMouse = e.offsetX - mouseEnterPoint;
        redrawCarousel(dxMouse);
    }
}

carousel.addEventListener('mousemove', e => mouseMoveActions(e))




function inertiaMovement(dx) {
    clearInterval(inertiaCounter); //fix bug when some timers start simultaniously

    inertiaCounter = setInterval((e) => {
        dx = dx * inertiaStep;
        if (Math.abs(dx) <= 1) {
            inertiaSpeedX = 0;
            clearInterval(inertiaCounter);
        } else {
            dxRibbon = dxRibbon - dx/25;
            redrawCarousel(0);
        }
    }, 1);
}


function bgMovement(dx) {
    clearInterval(bgMoveCounter);
    bgMoveCounter = setInterval((e) => {
        if (bgMove === 0) {
            clearInterval(bgMoveCounter);
        } else {
            dxRibbon = dxRibbon - dx/25;
            redrawCarousel(0);
        }
    }, 1);
}


const stopMove = (e) => { //stop move the carousel
    move = false;
    dxRibbon = dxRibbon + dxMouse; //fixing the offset
    dxMouse = 0; 
 
    inertiaSpeedX = inertiaPreviousMouseX - inertiaCurrentMouseX ;
    if (Math.abs(inertiaSpeedX) > inertiaSensivity) { //has an inertion
        inertiaMovement(inertiaSpeedX);
    }
    carousel.classList.remove(`${destinationClass}_grabbed`)

    //timeToBgMove
    bgMoveCoundown = setTimeout((e) => {
        bgMove = bgMoveSpeed;
        bgMovement(bgMove);
    }, timeToBgMove);
}



carousel.addEventListener('mouseup', e => stopMove(e));
carousel.addEventListener('mouseout', e => stopMove(e));

carouselInertionTimer = setInterval((e) => { //check mouse speed every 100ms
    inertiaPreviousMouseX = inertiaCurrentMouseX;
    inertiaCurrentMouseX = dxMouse;
}, 100);

changePicsOrder(); //initial filling picsArray
redrawCarousel(0); //initial draw the carousel


bgMovement(bgMoveSpeed);




function destroy() {
    carousel.removeEventListener('mousedown', e => mouseDownActions(e))
    carousel.removeEventListener('mousemove', e => mouseMoveActions(e))
    carousel.removeEventListener('mouseup', e => stopMove(e));
    carousel.removeEventListener('mouseout', e => stopMove(e));
    imgFullScreenCloser.removeEventListener('click', e => closeImage())

    clearInterval(bgMoveCounter);
    clearInterval(carouselInertionTimer);
    clearInterval(inertiaCounter); 
    clearTimeout(bgMoveCoundown); 


}

return destroy
        

}



//# sourceMappingURL=carousel-max.js.map
