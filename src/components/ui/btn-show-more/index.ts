const updatesList = document.getElementById("updates-list");
const showMoreBtn = document.querySelector(
    ".btn-show-more"
) as HTMLButtonElement;
const listItems = updatesList?.getElementsByTagName("li");

const initiallyVisibleItems = 2;

const showMoreItems = () => {
    for (let i = initiallyVisibleItems; i < listItems?.length; i++) {
        listItems[i].classList.remove("li-hidden");
    }
    showMoreBtn?.classList.add("hidden");
};

const hideExtraItems = () => {
    for (let i = initiallyVisibleItems; i < listItems?.length; i++) {
        listItems[i].classList.add("li-hidden");
    }
};
hideExtraItems();

showMoreBtn?.addEventListener("click", showMoreItems);
