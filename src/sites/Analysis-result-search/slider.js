/* eslint-disable */
// core version + navigation, pagination modules:
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

let objectSliders = [];

const saleCards = document.querySelectorAll(".a-sale__cards");
if (saleCards) {
    saleCards.forEach((element, index) => {
        const btnPrev = element.querySelector(".slider-navigation_prev");
        const btnNext = element.querySelector(".slider-navigation_next");
        const saleSlider = element.querySelector(".a-sale__slider");
        const swiperParams = {
            modules: [Navigation],
            slidesPerView: "3",
            spaceBetween: 20,
            navigation: {
                prevEl: btnPrev,
                nextEl: btnNext,
            },
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            grabCursor: true,
            slideToClickedSlide: true,
            breakpoints: {
                1440: {
                    slidesPerView: "3",
                    spaceBetween: 20,
                },
                1000: {
                    slidesPerView: "3",
                },
                800: {
                    slidesPerView: "2.1",
                },
                375: {
                    slidesPerView: "1.5",
                    spaceBetween: 10,
                },
                300: {
                    slidesPerView: "1.1",
                    spaceBetween: 10,
                },
            },
        };
        if (saleSlider.classList.contains("a-main__slider")) {
            swiperParams.breakpoints = {
                1001: {
                    slidesPerView: "3",
                },
                768: {
                    slidesPerView: "2",
                },
                360: {
                    slidesPerView: "1.5",
                    spaceBetween: 10,
                },
                300: {
                    slidesPerView: "1",
                    spaceBetween: 10,
                },
            };
        }
        objectSliders[index] = new Swiper(saleSlider, swiperParams);
    });
}

const sliderWrapper = document.querySelector(".cart-order__slider");
if (sliderWrapper) {
    const cartOrderSlider = sliderWrapper.querySelector(
        ".cart-order__slider_container"
    );
    const btnPrev = sliderWrapper.querySelector(".slider-navigation_prev");
    const btnNext = sliderWrapper.querySelector(".slider-navigation_next");

    const swiperParams = {
        modules: [Navigation],
        slidesPerView: 1.2,
        spaceBetween: 20,
        navigation: {
            prevEl: btnPrev,
            nextEl: btnNext,
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        grabCursor: true,
        slideToClickedSlide: true,
    };

    objectSliders[0] = new Swiper(cartOrderSlider, swiperParams);
}

let orderSlider = null;

function initOrderSlider() {
    const element = document.querySelector(".order-tab-two__slider");
    if (!element) return;

    const screenWidth = window.screen.width;
    const isDesktop = screenWidth > 768;
    const shouldCreateSlider = isDesktop && !orderSlider;
    const shouldDestroySlider = !isDesktop && orderSlider;

    if (shouldCreateSlider) {
        const swiperParams = {
            modules: [],
            slidesPerView: 2.4,
            spaceBetween: 15,
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            grabCursor: true,
            slideToClickedSlide: true,
            breakpoints: {
                1440: {
                    slidesPerView: "2.4",
                    spaceBetween: 15,
                },
                900: {
                    slidesPerView: "2.1",
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: "1.1",
                    spaceBetween: 15,
                },
            },
        };
        orderSlider = new Swiper(element, swiperParams);
    } else if (shouldDestroySlider) {
        orderSlider.destroy();
        orderSlider = null;
    }
}

let labudaAnalysisSlider = null;

function initLabudaAnalysisSlider() {
    const element = document.querySelector(".labuda-analysis__slider");
    if (!element) return;

    const screenWidth = window.innerWidth;
    const isMobile = screenWidth < 769;
    const btnPrev = element.querySelector(".slider-navigation_prev");
    const btnNext = element.querySelector(".slider-navigation_next");
    const paginationEl = document.querySelector(".labuda-analysis__pagination");

    if (isMobile && !labudaAnalysisSlider) {
        labudaAnalysisSlider = new Swiper(element, {
            modules: [Navigation, Pagination],
            slidesPerView: 1.2,
            spaceBetween: 10,
            grabCursor: true,
            slideToClickedSlide: true,
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            navigation: {
                prevEl: btnPrev,
                nextEl: btnNext,
            },
            pagination: {
                el: paginationEl,
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1.2,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 1.2,
                    spaceBetween: 15,
                },
            },
        });
    } else if (!isMobile && labudaAnalysisSlider) {
        labudaAnalysisSlider.destroy();
        labudaAnalysisSlider = null;
    }
}

window.addEventListener("resize", () => {
    initOrderSlider();
    initLabudaAnalysisSlider();
});

initOrderSlider();
initLabudaAnalysisSlider();

function createSlider(element, navBlock) {
    const btnPrev = navBlock.querySelector(".slider-navigation_prev");
    const btnNext = navBlock.querySelector(".slider-navigation_next");
    const swiperParams = {
        modules: [Navigation],
        slidesPerView: "3",
        spaceBetween: 20,
        navigation: {
            prevEl: btnPrev,
            nextEl: btnNext,
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        grabCursor: true,
        slideToClickedSlide: true,
        breakpoints: {
            1440: {
                slidesPerView: "3",
                spaceBetween: 20,
            },
            800: {
                slidesPerView: "2.1",
            },
            450: {
                slidesPerView: "1.5",
                spaceBetween: 10,
            },
            300: {
                slidesPerView: "1.1",
                spaceBetween: 10,
            },
        },
    };
    return new Swiper(element, swiperParams);
}

const modalCheaper = document.querySelectorAll(".modal-cheaper__slider");
if (modalCheaper) {
    modalCheaper.forEach((element, index) => {
        const navBlock = element.previousElementSibling;
        if (!navBlock.classList.contains("modal-cheaper__navigation")) return;

        objectSliders[index] = createSlider(element, navBlock);
    });
}

document.addEventListener("createSlider", (event) => {
    if (!event || (event && !event.detail)) return;

    const element = document.querySelector(event?.detail?.sliderClass);
    const navBlock = document.querySelector(
        event?.detail?.sliderNavigationClass
    );

    if (!element || !navBlock) return;

    createSlider(element, navBlock);
});

const mainBannerElement = document.querySelector(".new-banner__slider");
if (mainBannerElement) {
    const newMainBannerSlider = new Swiper(mainBannerElement, {
        modules: [Pagination, Navigation, Autoplay],
        slidesPerView: 1,
        spaceBetween: 20,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        pagination: {
            el: ".main-banner-pagination",
            type: "bullets",
            clickable: true,
        },
        navigation: {
            prevEl: ".slider-navigation_prev",
            nextEl: ".slider-navigation_next",
        },
        noSwiping: false,
        grabCursor: true,
        slideToClickedSlide: false,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        loop: true,
        speed: 400,
        breakpoints: {
            300: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
        },
    });

    objectSliders.push(newMainBannerSlider);
}

// Пример диспатча exent для созадния слайдера
// setTimeout(() => {
//     const ourEvent = new CustomEvent("createSlider", {
//         detail: {
//             sliderClass: ".modal-cheaper__slider",
//             sliderNavigationClass: ".modal-cheaper__navigation",
//         },
//     });

//     document.dispatchEvent(ourEvent);
// }, 5000);
