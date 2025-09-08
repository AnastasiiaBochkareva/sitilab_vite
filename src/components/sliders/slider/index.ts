const initializeSlider = () => {
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
    let visibleSlides = window.innerWidth > 767 ? 4 : 1;
    let adaptiveVisibleSlides =
        visibleSlides === 1 ? totalSlides - 1 : visibleSlides - 1;

    const updateVisibleSlides = () => {
        visibleSlides = window.innerWidth > 767 ? 4 : 1;
        adaptiveVisibleSlides =
            visibleSlides === 1 ? totalSlides - 1 : visibleSlides - 1;
        slider.style.width = `${(100 / visibleSlides) * totalSlides}%`;
        moveToSlide(0);
    };

    const moveToSlide = (index: number) => {
        slider.style.transition = "transform 0.5s ease";
        slider.style.transform = `translateX(-${
            (index * 100) / (visibleSlides === 1 ? totalSlides : visibleSlides)
        }%)`;
    };

    const moveToPrevSlide = () => {
        if (currentIndex === 0) {
            currentIndex = adaptiveVisibleSlides;
            moveToSlide(currentIndex);
        } else {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            moveToSlide(currentIndex);
        }
    };

    const moveToNextSlide = () => {
        if (currentIndex === adaptiveVisibleSlides) {
            currentIndex = 0;
            moveToSlide(currentIndex);
        } else {
            currentIndex = (currentIndex + 1) % totalSlides;
            moveToSlide(currentIndex);
        }
    };

    prevArrow.addEventListener("click", moveToPrevSlide);
    nextArrow.addEventListener("click", moveToNextSlide);
    window.addEventListener("resize", updateVisibleSlides);

    updateVisibleSlides();
};

document.addEventListener("DOMContentLoaded", initializeSlider);
