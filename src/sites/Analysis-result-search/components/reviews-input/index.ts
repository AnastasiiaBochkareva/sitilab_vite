function initAddressSelector() {
    const wrapper = document.querySelector(
        ".address__input_wrapper"
    ) as HTMLElement | null;
    if (!wrapper) return;

    const input = wrapper.querySelector("input") as HTMLInputElement;
    const list = document.querySelector(".address__list") as HTMLUListElement;
    const listItems = Array.from(list.querySelectorAll("li"));
    const ratingBlock = document.querySelector(".rating") as HTMLElement | null;

    const toggleBtn = wrapper.querySelector(
        ".address__toggle"
    ) as HTMLButtonElement;
    const iconArray = toggleBtn.querySelector(".list-array") as HTMLElement;
    const iconClose = toggleBtn.querySelector(".list-close") as HTMLElement;

    function updateIcons() {
        if (input.value.trim() !== "") {
            iconArray.style.display = "none";
            iconClose.style.display = "inline-block";
        } else {
            iconArray.style.display = "inline-block";
            iconClose.style.display = "none";
        }
    }

    function openList() {
        wrapper.dataset.open = "true";
        list.style.display = "block";
        updateIcons();
    }

    function closeList() {
        wrapper.dataset.open = "false";
        list.style.display = "none";
        updateIcons();
    }

    function selectAddress(address: string, id: string) {
        input.value = address;
        input.setAttribute("data-id", id);
        wrapper.dataset.selected = "true";
        closeList();
        toggleRatingVisibility(true);
    }

    function clearSelection() {
        input.value = "";
        input.removeAttribute("data-id");
        delete wrapper.dataset.selected;
        closeList();
        toggleRatingVisibility(false);
    }

    function toggleRatingVisibility(show: boolean) {
        if (!ratingBlock) return;
        ratingBlock.classList.toggle("active", show);
    }

    input.addEventListener("focus", () => {
        openList();
    });
    input.addEventListener("click", () => {
        openList();
    });

    input.addEventListener("input", () => {
        const query = input.value.toLowerCase().trim();
        let hasVisible = false;

        listItems.forEach((li) => {
            const address =
                li.getAttribute("data-address")?.toLowerCase() || "";
            if (address.includes(query)) {
                li.style.display = "block";
                hasVisible = true;
            } else {
                li.style.display = "none";
            }
        });

        if (query && hasVisible) {
            openList();
        } else {
            closeList();
        }
    });

    listItems.forEach((li) => {
        li.addEventListener("click", (e) => {
            e.stopPropagation();
            const address = li.getAttribute("data-address");
            const id = li.getAttribute("data-id");
            if (address && id) {
                selectAddress(address, id);
            }
        });
    });

    document.addEventListener("click", (e) => {
        if (
            !wrapper.contains(e.target as Node) &&
            !list.contains(e.target as Node)
        ) {
            closeList();
        }
    });

    toggleBtn.addEventListener("click", () => {
        if (input.value.trim() !== "") {
            clearSelection();
        } else {
            input.focus();
            openList();
        }
    });

    updateIcons();
}

// function initAddressSelector() {
//     const wrapper = document.querySelector(
//         ".address__input_wrapper"
//     ) as HTMLElement | null;
//     if (!wrapper) return;

//     const input = wrapper.querySelector("input") as HTMLInputElement;
//     const toggleBtn = wrapper.querySelector(
//         ".address__toggle"
//     ) as HTMLButtonElement;

//     const list = document.querySelector(".address__list") as HTMLUListElement;
//     const listItems = list.querySelectorAll("li");

//     function openList() {
//         wrapper.dataset.open = "true";
//     }

//     function closeList() {
//         wrapper.dataset.open = "false";
//     }

//     function selectAddress(address: string) {
//         input.value = address;
//         wrapper.dataset.selected = "true";
//         closeList();
//     }

//     function clearSelection() {
//         input.value = "";
//         delete wrapper.dataset.selected;
//         closeList();
//     }

//     function toggle() {
//         if (wrapper.dataset.selected === "true") {
//             clearSelection();
//         } else {
//             const isOpen = wrapper.dataset.open === "true";
//             wrapper.dataset.open = isOpen ? "false" : "true";
//         }
//     }

//     input.addEventListener("click", () => {
//         const isOpen = wrapper.dataset.open === "true";
//         if (isOpen) {
//             closeList();
//         } else {
//             openList();
//         }
//     });

//     toggleBtn.addEventListener("click", (e) => {
//         e.stopPropagation();
//         toggle();
//     });

//     listItems.forEach((li) => {
//         li.addEventListener("click", (e) => {
//             e.stopPropagation();
//             const address = li.getAttribute("data-address");
//             if (address) {
//                 selectAddress(address);
//             }
//         });
//     });

//     document.addEventListener("click", (e) => {
//         if (
//             !wrapper.contains(e.target as Node) &&
//             !list.contains(e.target as Node)
//         ) {
//             closeList();
//         }
//     });
// }

export { initAddressSelector };
