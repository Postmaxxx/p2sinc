export function makeSideNav() {
    const sideMenu = document.querySelector("#nav");

    const sidemenuItems = sideMenu.querySelectorAll(".sidemenu__nav__item");
    let sidemenuItemsLinked = [];

    sidemenuItems.forEach((el) => {
        console.log('el=', el.dataset.block);
        sidemenuItemsLinked.push(
            {
                sidemenuItem: el,
                sidemenuLinkedBlock: document.querySelector(`#${el.dataset.block}`)
            }
        )
    })
    

    function changeSideMenu(e) {
        console.log(sidemenuItemsLinked);

        sidemenuItemsLinked.forEach((item, index) => {
            let blockY = item.sidemenuLinkedBlock.getBoundingClientRect().top + window.pageYOffset;
            let windowHeight = window.innerHeight
            let currentScrollY = window.pageYOffset;
            let blockYNext;

            if (index < sidemenuItemsLinked.length-1) {
                blockYNext = sidemenuItemsLinked[index+1]?.sidemenuLinkedBlock?.getBoundingClientRect().top + window.pageYOffset;
            } else {
                blockYNext =  currentScrollY + window.pageYOffset;
            }
            
            if (currentScrollY < document.body.clientHeight - windowHeight - 50) {
                if (currentScrollY + windowHeight/2 >= blockY && (currentScrollY + windowHeight/2) < (blockYNext)) {
                    item.sidemenuItem.classList.add("sidemenu__nav__item_current")
                } else {
                    item.sidemenuItem.classList.remove("sidemenu__nav__item_current")
                }
            } else {
                if (index === sidemenuItemsLinked.length -1) {
                    sidemenuItemsLinked[index-1].sidemenuItem.classList.remove("sidemenu__nav__item_current")
                    item.sidemenuItem.classList.add("sidemenu__nav__item_current")
                }
            }
            
        })

    }



    document.addEventListener('scroll', e => changeSideMenu(e));

    changeSideMenu();

}