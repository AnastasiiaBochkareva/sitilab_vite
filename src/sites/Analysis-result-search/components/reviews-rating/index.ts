import { validateFormFields, initPhoneValidation } from "./validate";

function setActiveStars(): void {
    const stars = document.querySelectorAll<HTMLElement>(".star");
    const ratingContainer = document.querySelector(".rating");
    const ratingInput = document.getElementById(
        "rating-input"
    ) as HTMLInputElement | null;
    const formInputs = document.querySelector(
        ".form__inputs"
    ) as HTMLElement | null;
    const submitBtn = document.querySelector(
        "button.n-btn"
    ) as HTMLButtonElement | null;
    const phoneInput = document.getElementById(
        "reviews-phone"
    ) as HTMLInputElement | null;

    if (
        !ratingContainer ||
        !ratingInput ||
        !formInputs ||
        !submitBtn ||
        !phoneInput
    )
        return;

    phoneInput.addEventListener("input", () => {
        let value = phoneInput.value;
        if (value.startsWith("+")) {
            value = "+" + value.slice(1).replace(/\D/g, "");
        } else {
            value = value.replace(/\D/g, "");
        }
        phoneInput.value = value;
    });

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
            toggleFormInputs();
            validateForm();
        }
    });

    function updateStars(): void {
        stars.forEach((star) => {
            const value = parseInt(star.dataset.value || "0", 10);
            star.classList.toggle("active", value <= currentRating);
        });
    }

    function toggleFormInputs(): void {
        if (currentRating <= 3) {
            formInputs.classList.add("active");
        } else {
            formInputs.classList.remove("active");
        }
    }

    function validateForm(): void {
        if (currentRating >= 4) {
            submitBtn.disabled = false;
        } else if (currentRating >= 1 && currentRating <= 3) {
            submitBtn.disabled = !validateFormFields();
        } else {
            submitBtn.disabled = true;
        }
    }

    const inputs = document.querySelectorAll<
        HTMLInputElement | HTMLTextAreaElement
    >("#reviews-form input, #reviews-form textarea");
    inputs.forEach((input) => {
        input.addEventListener("input", validateForm);
    });

    initPhoneValidation();
}

export { setActiveStars };
