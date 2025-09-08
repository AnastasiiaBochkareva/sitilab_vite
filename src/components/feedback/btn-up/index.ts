document.addEventListener("DOMContentLoaded", () => {
    const btnUp = document.querySelector(".btn-up") as HTMLElement | null;

    if (!btnUp) return;

    const toggleButtonVisibility = () => {
        if (window.innerWidth > 767 && window.scrollY > 100) {
            btnUp.classList.add("visible");
        } else {
            btnUp.classList.remove("visible");
        }
    };

    btnUp.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    window.addEventListener("scroll", toggleButtonVisibility);
    window.addEventListener("resize", toggleButtonVisibility);

    toggleButtonVisibility();
});
