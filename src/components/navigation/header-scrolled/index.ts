document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header") as HTMLElement | null;
    const main = document.querySelector("main") as HTMLElement | null;

    if (!header || !main) return;

    const setMainPadding = () => {
        const headerHeight = header.offsetHeight;
        main.style.paddingTop = `${headerHeight}px`;
    };

    const toggleHeaderClass = () => {
        if (window.scrollY > 50) {
            header.classList.add("header-scrolled");
        } else {
            header.classList.remove("header-scrolled");
        }
    };

    setMainPadding();

    window.addEventListener("scroll", () => {
        toggleHeaderClass();
    });

    window.addEventListener("resize", () => {
        setMainPadding();
    });

    toggleHeaderClass();
});
