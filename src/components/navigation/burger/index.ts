document.addEventListener("DOMContentLoaded", () => {
    function toggleMenu(): void {
        const menuContent = document.querySelector(
            ".menu-content"
        ) as HTMLElement | null;
        const menuOverlay = document.querySelector(
            ".menu-overlay"
        ) as HTMLElement | null;
        const html = document.documentElement; // изменено с document.body
        const burger = document.querySelector(".burger") as HTMLElement | null;

        if (menuContent && menuOverlay && burger) {
            menuContent.classList.toggle("active");
            menuOverlay.classList.toggle("active");
            burger.classList.toggle("active");
            html.classList.toggle("no-scroll"); // применяем к html
        }
    }

    function closeMenu(): void {
        const menuContent = document.querySelector(
            ".menu-content"
        ) as HTMLElement | null;
        const menuOverlay = document.querySelector(
            ".menu-overlay"
        ) as HTMLElement | null;
        const html = document.documentElement; // изменено с document.body
        const burger = document.querySelector(".burger") as HTMLElement | null;

        if (menuContent && menuOverlay && burger) {
            menuContent.classList.remove("active");
            menuOverlay.classList.remove("active");
            burger.classList.remove("active");

            html.classList.remove("no-scroll"); // применяем к html
        }
    }

    const burger = document.querySelector(".burger");
    if (burger) {
        burger.addEventListener("click", toggleMenu);
    }

    const menuOverlay = document.querySelector(".menu-overlay");
    if (menuOverlay) {
        menuOverlay.addEventListener("click", closeMenu);
    }

    const menuContent = document.querySelector(".menu-content");
    if (menuContent) {
        menuContent.addEventListener("click", closeMenu);
    }

    document.addEventListener("click", (e: MouseEvent) => {
        const menu = document.querySelector(
            ".menu-content"
        ) as HTMLElement | null;
        const burger = document.querySelector(".burger") as HTMLElement | null;

        if (menu && burger) {
            if (
                !(
                    menu.contains(e.target as Node) ||
                    burger.contains(e.target as Node)
                )
            ) {
                closeMenu();
            }
        }
    });
});
