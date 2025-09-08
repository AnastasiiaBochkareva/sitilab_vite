const initializeSliderOneSlide = () => {
    const slider = document.querySelector(".slider") as HTMLElement | null;
    const slides = document.querySelectorAll(
        ".slide"
    ) as NodeListOf<HTMLElement>;
    const prevArrow = document.querySelector(
        ".prev-arrow"
    ) as HTMLElement | null;
    const nextArrow = document.querySelector(
        ".next-arrow"
    ) as HTMLElement | null;

    if (!slider || slides.length === 0 || !prevArrow || !nextArrow) {
        return;
    }

    let currentIndex = 0;
    const totalSlides = slides.length;

    const updateVisibleSlides = () => {
        slider.style.width = "100%";
        slides.forEach((slide) => {
            slide.style.flex = "0 0 100%";
        });
        moveToSlide(0);
    };

    const moveToSlide = (index: number) => {
        slider.style.transition = "transform 0.5s ease";
        slider.style.transform = `translateX(-${index * 100}%)`;
    };
    let autoplay = null;
    const restartAutoplay = () => {
        if (autoplay) {
            clearInterval(autoplay);
        }
        autoplay = setInterval(moveToNextSlide, 3000);
    };
    const moveToPrevSlide = () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        restartAutoplay();
        moveToSlide(currentIndex);
    };

    const moveToNextSlide = () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        restartAutoplay();
        moveToSlide(currentIndex);
    };

    restartAutoplay();

    prevArrow.addEventListener("click", moveToPrevSlide);
    nextArrow.addEventListener("click", moveToNextSlide);
    window.addEventListener("resize", updateVisibleSlides);

    updateVisibleSlides();
};

document.addEventListener("DOMContentLoaded", initializeSliderOneSlide);
