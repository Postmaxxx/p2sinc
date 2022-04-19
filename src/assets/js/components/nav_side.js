export function makeSideNav() {
    const sideMenu = document.querySelector("#nav");

    const sidemenuItem = sideMenu.querySelector(".sidemenu__nav__item");
    let sidenavShow = false;

    document.addEventListener('scroll', (e) => {
        if (window.pageYOffset > 200) {
            if (!sidenavShow) {
                sidenavShow = true;
                sidemenuItem.classList.add("sidemenu__nav__item_current")
            }
        } else {
            if (sidenavShow) {
                sidenavShow = false;
                sidemenuItem.classList.remove("sidemenu__nav__item_current")
            }
        }
    });


}