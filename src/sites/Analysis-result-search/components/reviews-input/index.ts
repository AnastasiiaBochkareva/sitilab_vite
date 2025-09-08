// document.addEventListener("DOMContentLoaded", () => {
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
// });

function initAddressSelector() {
    const wrapper = document.querySelector(
        ".address__input_wrapper"
    ) as HTMLElement | null;
    if (!wrapper) return;

    const input = wrapper.querySelector("input") as HTMLInputElement;
    const toggleBtn = wrapper.querySelector(
        ".address__toggle"
    ) as HTMLButtonElement;

    const list = document.querySelector(".address__list") as HTMLUListElement;
    const listItems = list.querySelectorAll("li");

    function openList() {
        wrapper.dataset.open = "true";
    }

    function closeList() {
        wrapper.dataset.open = "false";
    }

    function selectAddress(address: string) {
        input.value = address;
        wrapper.dataset.selected = "true";
        closeList();
    }

    function clearSelection() {
        input.value = "";
        delete wrapper.dataset.selected;
        closeList();
    }

    function toggle() {
        if (wrapper.dataset.selected === "true") {
            clearSelection();
        } else {
            const isOpen = wrapper.dataset.open === "true";
            wrapper.dataset.open = isOpen ? "false" : "true";
        }
    }

    input.addEventListener("click", () => {
        const isOpen = wrapper.dataset.open === "true";
        if (isOpen) {
            closeList();
        } else {
            openList();
        }
    });

    toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggle();
    });

    listItems.forEach((li) => {
        li.addEventListener("click", (e) => {
            e.stopPropagation();
            const address = li.getAttribute("data-address");
            if (address) {
                selectAddress(address);
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
}

export { initAddressSelector };
