export function makeSlider(params) {

    const {destinationClass, imagesPaths, carouselWidth, carouselHeight, imgWidth, bgMoveSpeed, timeToBgMove, inertiaStep, inertiaSensivity } = params;
    const carousel = document.querySelector('.'+destinationClass)
    const totalImages = imagesPaths.length; 
    
    let mouseEnterPoint, dxMouse = 0; //mouseX - start amoun X of mouse when button pressed, dxMouse - the difference between mouseX and current mouse X position 
    let dxRibbon = -imgWidth*2 + (carouselWidth - imgWidth)/2; //offset of Ribbon
    let move = false; //is gallery moving now
    let picsArray = [1,2,3,4,5]; //the array length=5 for images to show
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
    carousel.style.maxWidth = carouselWidth + 'px';
    carousel.style.height = carouselHeight + 'px';
    carousel.style.position = 'relative';
    carousel.style.overflow = 'hidden';
    carousel.style.whiteSpace = 'nowrap';
    carousel.style.userSelect = 'none';
    carousel.style.boxSizing = 'border-box';
    
    let listeners = [] //all listeners
    
    carousel.innerHTML = `
        <div class="${destinationClass}-images-container">
            ${picsArray.map((el) => {
                return (`
                <div class="${destinationClass}-img-container">
                </div>
                `)
            }).join('')}
        </div>`
    
    const ribbonImages = document.querySelector(`.${destinationClass}-images-container`); //The container for all 5 images
    const imgContainerList = document.querySelectorAll(`.${destinationClass}-img-container`); //The list of all 5 containers
    
    
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
            margin-left: 0px; 
            margin-right: 0px;
            padding: 0;
            box-sizing: border-box;
            display: inline-block;
            overflow: hidden;
            pointer-events: none;
    
            border: 1px solid green;
            background-size: auto 100%;
            background-position: 50% center;
        `
    })
    
    
    
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
            el.style.backgroundImage = `url(${picsArray[index]}`;
        })
    
    }
    
    
    const changeImgOffset = (currentPos) => { //changing offset for all pictures
        imgContainerList.forEach((el, index) => {
                let centerDx = currentPos - carouselCenter - (imgWidth)*(2-index); //the offset between central position and current position
                let k = 50 + 50/((carouselWidth + imgWidth) / 2) * centerDx;
                el.style.backgroundPosition = `${k}% center`;
        })
    }
    
    
    const redrawCarousel = (dx) => { //changing the position of ribbonImages
        if (dx + dxRibbon > -(imgWidth - (carouselWidth-imgWidth)/2)) { //if the offset is more than 1 picture width
            dxRibbon = dxRibbon - imgWidth; 
            changePicsOrder('-');
    
        }
        if (dx + dxRibbon < -(imgWidth)*3 + (carouselWidth-imgWidth)/2  ) { //if the offset is more than 1 picture width
            dxRibbon = dxRibbon + imgWidth; 
            changePicsOrder('+');
        }
        
        ribbonImages.style.left = `${dx + dxRibbon}px`; //change ribbon position
        changeImgOffset(dx + dxRibbon); //change images offset
        
    }
    
    
    
    
    function mouseDownActions(e) {
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
    
    
    
    return function destroy() {
            carousel.removeEventListener('mousedown', e => mouseDownActions(e))
            carousel.removeEventListener('mousemove', e => mouseMoveActions(e))
            carousel.removeEventListener('mouseup', e => stopMove(e));
            carousel.removeEventListener('mouseout', e => stopMove(e));
    
            clearInterval(bgMoveCounter);
            clearInterval(carouselInertionTimer);
            clearInterval(inertiaCounter); 
            clearTimeout(bgMoveCoundown); 
            
            //console.log('destroyed');
    
        }
    
    
    
    
    
    }
    
    
    
    