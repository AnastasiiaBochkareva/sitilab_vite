function setActiveStars(): void {
    const stars = document.querySelectorAll<HTMLElement>(".star");
    const ratingContainer = document.querySelector(".rating");
    const ratingInput = document.getElementById(
        "rating-input"
    ) as HTMLInputElement | null;

    if (!ratingContainer || !ratingInput) return;

    let currentRating = 0;

    ratingContainer.addEventListener("click", (e: MouseEvent) => {
        const target = (e.target as HTMLElement).closest(
            ".star"
        ) as HTMLElement | null;

        if (target) {
            const value = parseInt(target.dataset.value || "0", 10);
            currentRating = value;
            ratingInput.value = String(currentRating);
            updateStars();
        }
    });

    function updateStars(): void {
        stars.forEach((star) => {
            const value = parseInt(star.dataset.value || "0", 10);
            star.classList.toggle("active", value <= currentRating);
        });
    }
}

export { setActiveStars };
