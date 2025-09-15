// /*eslint-disable*/
// const openItem = (item) => {
//     if (!item) return;
//     item.classList.add("active");

//     const body = item.querySelector(".accordion__body");
//     body.style.maxHeight = `${body.scrollHeight}px`;
// };

// const closeItem = (item) => {
//     if (!item) return;
//     item.classList.remove("active");

//     const body = item.querySelector(".accordion__body");
//     body.style.maxHeight = null;
// };

// function fixScroll(activeItem, itemToScroll) {
//     if (!activeItem) return;
//     const body = activeItem.querySelector(".accordion__body");
//     // console.log(body.scrollHeight);
//     const viewportHeight = window.innerHeight;
//     // console.log(viewportHeight);
//     if (body.scrollHeight > viewportHeight) {
//         setTimeout(() => {
//             const header = document.querySelector(".header");
//             const offset = header ? header.scrollHeight : 100;
//             const rect = itemToScroll.getBoundingClientRect();
//             const offsetTop = window.pageYOffset + rect.top - offset;

//             window.scrollTo({
//                 top: offsetTop,
//                 behavior: "smooth",
//             });
//         }, 250);
//     }
// }

// const clickHandler = (e) => {
//     const accordionHead = e.target.closest(".accordion__head");
//     if (!accordionHead) return;
//     // console.log(e);
//     const accordion = e.target.closest(".accordion");

//     const isFooter = accordion.classList.contains("accordion--footer");

//     if (isFooter) {
//         if (window.innerWidth > 768) return;
//     }

//     const targetItem = e.target.closest(".accordion__item");
//     const activeItem = accordion.querySelector(".accordion__item.active");

//     if (targetItem !== activeItem) {
//         openItem(targetItem);
//         closeItem(activeItem);
//         fixScroll(activeItem, targetItem);
//     } else {
//         closeItem(targetItem);
//     }
// };

// window.addEventListener("resize", () => {
//     if (window.innerWidth > 768) {
//         document
//             .querySelectorAll(".accordion--footer .accordion__item")
//             .forEach((item) => {
//                 item.classList.remove("active");
//                 const body = item.querySelector(".accordion__body");
//                 body.style.maxHeight = null;
//             });
//     }
// });

// document.addEventListener("click", clickHandler);

(function () {
    const openItem = (item) => {
        if (!item) return;
        item.classList.add("active");
        const body = item.querySelector(".accordion__body");
        body.style.maxHeight = `${body.scrollHeight}px`;
    };

    const closeItem = (item) => {
        if (!item) return;
        item.classList.remove("active");
        const body = item.querySelector(".accordion__body");
        body.style.maxHeight = null;
    };

    const fixScroll = (activeItem, itemToScroll) => {
        if (!activeItem) return;
        const body = activeItem.querySelector(".accordion__body");
        const viewportHeight = window.innerHeight;
        if (body.scrollHeight > viewportHeight) {
            setTimeout(() => {
                const header = document.querySelector(".header");
                const offset = header ? header.scrollHeight : 100;
                const rect = itemToScroll.getBoundingClientRect();
                const offsetTop = window.pageYOffset + rect.top - offset;

                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth",
                });
            }, 250);
        }
    };

    const clickHandler = (e) => {
        const accordionHead = e.target.closest(".accordion__head");
        if (!accordionHead) return;

        const accordion = e.target.closest(".accordion");
        if (!accordion.classList.contains("footer__accordion")) return;

        if (window.innerWidth > 1220) return;

        const targetItem = e.target.closest(".accordion__item");
        const activeItem = accordion.querySelector(".accordion__item.active");

        if (targetItem !== activeItem) {
            openItem(targetItem);
            closeItem(activeItem);
            fixScroll(activeItem, targetItem);
        } else {
            closeItem(targetItem);
        }
    };

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1220) {
            document
                .querySelectorAll(".footer__accordion .accordion__item")
                .forEach((item) => {
                    item.classList.remove("active");
                    const body = item.querySelector(".accordion__body");
                    body.style.maxHeight = null;
                });
        }
    });

    document.addEventListener("click", clickHandler);
})();
