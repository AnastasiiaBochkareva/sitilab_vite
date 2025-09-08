import "./slider.js";
// import "swiper/css";
// import "swiper/css/navigation";
import "@/sites/Analysis-result-search/components/Filter-result/Filter-result";
import "@/components/ui/Accordion/Accordion";
import { initModal } from "@/components/ui/MyModal/index";
import { setActiveStars } from "@/sites/Analysis-result-search/components/reviews-rating/index";
import { initAddressSelector } from "@/sites/Analysis-result-search/components/reviews-input/index";

// сайдбар
function setupAccordion(category: HTMLElement) {
    const head = category.querySelector(
        ".ars-sidebar-categories__head"
    ) as HTMLElement;
    const body = category.querySelector(
        ".ars-sidebar-categories__body"
    ) as HTMLElement;

    if (!head || !body) return;

    body.style.maxHeight = "0";
    body.style.overflow = "hidden";
    body.style.transition = "max-height 0.3s ease";

    head.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            openCategoriesModal();
            return;
        }

        const isActive = category.classList.contains("active");

        if (isActive) {
            category.classList.remove("active");
            body.style.maxHeight = "0";
        } else {
            category.classList.add("active");
            body.style.maxHeight = body.scrollHeight + "px";
        }
    });
}

function openCategoriesModal() {
    const modal = document.getElementById("categories");
    if (modal) {
        modal.classList.add("active");
    }
}

function setupModalClose() {
    const modal = document.getElementById("categories");
    const closeBtn = document.querySelector(".ars-categories-modal__close");

    if (modal && closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.classList.remove("active");
        });
    }
}

// аккордеон в категориях в сайдбаре
function setupCategoryItem(
    item: HTMLElement,
    allItems: NodeListOf<HTMLElement>
) {
    const head = item.querySelector(
        ".ars-sidebar-categories__item-head"
    ) as HTMLElement;
    const body = item.querySelector(
        ".ars-sidebar-categories__item-body"
    ) as HTMLElement;

    if (!head || !body) return;

    body.style.maxHeight = "0";
    body.style.overflow = "hidden";
    body.style.transition = "max-height 0.3s ease";

    head.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        // Закрыть все
        allItems.forEach((el) => {
            el.classList.remove("active");
            const elBody = el.querySelector(
                ".ars-sidebar-categories__item-body"
            ) as HTMLElement;
            if (elBody) elBody.style.maxHeight = "0";
        });

        // Открыть если не был активен
        if (!isActive) {
            item.classList.add("active");
            body.style.maxHeight = body.scrollHeight + "px";
        }
    });
}

function initCategoryItems() {
    const items = document.querySelectorAll<HTMLElement>(
        ".ars-sidebar-categories__item"
    );
    if (items.length === 0) return;

    items.forEach((item) => setupCategoryItem(item, items));
}

// клики на табах
function initTabs() {
    const tabs = document.querySelectorAll<HTMLAnchorElement>(
        ".ars-content-tabs__nav a"
    );
    const tabContents = document.querySelectorAll<HTMLElement>(
        ".ars-content-tabs__tab"
    );

    if (tabs.length === 0 || tabContents.length === 0) return;

    // Активируем первую вкладку
    tabs[0].classList.add("active");
    tabContents[0].classList.add("active");

    tabs.forEach((tab) => {
        tab.addEventListener("click", (event) => {
            event.preventDefault();

            // Удалить активные классы
            tabs.forEach((item) => item.classList.remove("active"));
            tabContents.forEach((content) =>
                content.classList.remove("active")
            );

            // Активировать текущую
            tab.classList.add("active");

            const selector = tab.getAttribute("href");
            if (!selector) return;

            const target = document.querySelector<HTMLElement>(selector);
            if (target) {
                target.classList.add("active");
            }
        });
    });
}

// Развернуть текст в табах
function initExpandableBlock(
    contentId: string,
    innerContentId: string,
    buttonId: string
) {
    const contentBlock = document.getElementById(contentId);
    const innerContent = document.getElementById(innerContentId);
    const expandButton = document.getElementById(buttonId);

    if (!contentBlock || !innerContent || !expandButton) return;

    expandButton.addEventListener("click", () => {
        const fullHeight = innerContent.scrollHeight;
        contentBlock.style.maxHeight = `${fullHeight}px`;

        contentBlock.addEventListener(
            "transitionend",
            () => {
                contentBlock.style.maxHeight = "none";
                expandButton.style.display = "none";
            },
            { once: true }
        );
    });
}

// Открыть закрыть фильтры
document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggle-filters");
    const filters = document.getElementById("filters");
    const closeButton = document.querySelector(".ars-filters-modal__close");
    const html = document.documentElement;

    if (toggleButton instanceof HTMLElement) {
        toggleButton.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (filters instanceof HTMLElement) {
                filters.classList.add("active");
                html.style.overflow = "hidden";
            }
        });
    }

    if (closeButton instanceof HTMLElement) {
        closeButton.addEventListener("click", () => {
            if (filters instanceof HTMLElement) {
                filters.classList.remove("active");
                html.style.overflow = "";
            }
        });
    }
});

// еще в сайдбаре
function initShowMore({
    containerSelector,
    itemSelector,
    buttonSelector,
    visibleCount,
}: {
    containerSelector: string;
    itemSelector: string;
    buttonSelector: string;
    visibleCount: number;
}) {
    const containers =
        document.querySelectorAll<HTMLElement>(containerSelector);

    containers.forEach((container) => {
        const items = container.querySelectorAll<HTMLElement>(itemSelector);
        const button =
            container.querySelector<HTMLButtonElement>(buttonSelector);

        if (!button || items.length <= visibleCount) {
            if (button) button.style.display = "none";
            return;
        }

        // Скрыть лишние
        items.forEach((item, index) => {
            if (index >= visibleCount) item.style.display = "none";
        });

        button.style.display = "inline-flex";

        button.addEventListener("click", () => {
            items.forEach((item) => (item.style.display = ""));
            button.style.display = "none";
        });
    });
}

// модалка слайдер
function openModal(modal: HTMLElement, html: HTMLElement) {
    modal.classList.add("active");
    html.style.overflow = "hidden";

    // Кастомное событие
    const event = new CustomEvent("modalOpened");
    document.dispatchEvent(event);
}

function closeModal(modal: HTMLElement, html: HTMLElement) {
    modal.classList.remove("active");
    html.style.overflow = "";
}

function setupModalEventListeners() {
    const notices = document.querySelectorAll<HTMLElement>(
        ".ars-content-card__notice"
    );
    const modal = document.querySelector<HTMLElement>(".modal-fixed");
    const modalClose = document.querySelector<HTMLElement>(
        ".modal-cheaper__close"
    );
    const html = document.documentElement;

    if (modal) {
        notices.forEach((notice) => {
            notice.addEventListener("click", () => openModal(modal, html));
        });

        if (modalClose) {
            modalClose.addEventListener("click", () => closeModal(modal, html));
        }

        document.addEventListener("click", (e) => {
            const target = e.target as HTMLElement;
            if (modal.classList.contains("active") && target === modal) {
                closeModal(modal, html);
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const categories = document.querySelectorAll<HTMLElement>(
        ".ars-sidebar-closet"
    );
    categories.forEach(setupAccordion);

    setupModalClose();
    initCategoryItems();
    initModal();
    initAddressSelector();
    setActiveStars();
    initTabs();
    initExpandableBlock("content-block", "inner-content", "expand-button");
    // Чекбоксы
    initShowMore({
        containerSelector: ".ars-sidebar__checkboxes",
        itemSelector: "label.ars-checkbox",
        buttonSelector: ".ars-sidebar__showmore",
        visibleCount: 4,
    });

    // Популярное
    initShowMore({
        containerSelector: ".ars-sidebar-popular",
        itemSelector: "ul > li",
        buttonSelector: "#showmore-popular",
        visibleCount: 7,
    });
    setupModalEventListeners();
});
