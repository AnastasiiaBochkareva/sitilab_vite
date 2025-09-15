function validateFormFields(): boolean {
    const fields = [
        {
            input: document.getElementById(
                "reviews-username"
            ) as HTMLInputElement,
            validator: (v: string) => !!v.trim(),
        },
        {
            input: document.getElementById("reviews-phone") as HTMLInputElement,
            validator: (v: string) => v.replace(/\D/g, "").length >= 10,
        },
        {
            input: document.getElementById("reviews-email") as HTMLInputElement,
            validator: (v: string) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
        },
        {
            input: document.getElementById(
                "reviews-message"
            ) as HTMLTextAreaElement,
            validator: (v: string) => !!v.trim(),
        },
    ];

    const form = document.getElementById("reviews-form") as HTMLElement | null;
    const checkbox = form?.querySelector(
        "input[type='checkbox']"
    ) as HTMLInputElement | null;

    let isValid = true;

    fields.forEach(({ input, validator }) => {
        const wrapper = input.closest(".form__input");
        if (!wrapper) return;

        if (input.value) {
            if (!validator(input.value)) {
                wrapper.classList.add("error");
                isValid = false;
            } else {
                wrapper.classList.remove("error");
            }
        } else {
            wrapper.classList.remove("error");
            isValid = false;
        }
    });

    if (!checkbox?.checked) isValid = false;

    return isValid;
}

const inputs = document.querySelectorAll<
    HTMLInputElement | HTMLTextAreaElement
>("#reviews-form input, #reviews-form textarea");
inputs.forEach((input) => {
    input.addEventListener("input", () => validateFormFields());
});

function initPhoneValidation() {
    const phoneInput = document.getElementById(
        "reviews-phone"
    ) as HTMLInputElement;
    if (!phoneInput) return;

    const wrapper = phoneInput.closest(".form__input") as HTMLElement;
    if (!wrapper) return;

    const maskTemplate = "+7 (XXX) XXX XX XX";
    const prefixLength = 4;

    phoneInput.addEventListener("focus", () => {
        if (!phoneInput.value) {
            phoneInput.value = "+7 (";
        }
        setCursorToEnd();
    });

    phoneInput.addEventListener("input", (e) => {
        let digits = phoneInput.value.replace(/\D/g, "");
        digits = digits.slice(1);

        let formatted = "+7 (";
        if (digits.length > 0) formatted += digits.slice(0, 3);
        if (digits.length > 3) formatted += ") " + digits.slice(3, 6);
        if (digits.length > 6) formatted += " " + digits.slice(6, 8);
        if (digits.length > 8) formatted += " " + digits.slice(8, 10);

        phoneInput.value = formatted;

        setCursorToEnd();

        if (digits.length < 10) {
            wrapper.classList.add("error");
        } else {
            wrapper.classList.remove("error");
        }
    });

    function setCursorToEnd() {
        const pos = phoneInput.value.length;
        phoneInput.setSelectionRange(pos, pos);
    }

    phoneInput.addEventListener("keydown", (e) => {
        if (
            (e.key === "Backspace" || e.key === "Delete") &&
            phoneInput.selectionStart! <= prefixLength
        ) {
            e.preventDefault();
        }
    });

    phoneInput.addEventListener("blur", () => {
        const digits = phoneInput.value.replace(/\D/g, "").slice(1);
        if (!digits.length) phoneInput.value = "";
    });
}

export { validateFormFields };
export { initPhoneValidation };
