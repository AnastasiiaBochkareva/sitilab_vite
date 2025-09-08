// const registerBtn = document.getElementById(
//     "register-btn"
// ) as HTMLButtonElement;
// const loginBtn = document.getElementById("login-btn") as HTMLButtonElement;
// const logoutBtn = document.getElementById("logout-btn") as HTMLButtonElement;
// const userNameSpan = document.getElementById("user-name") as HTMLElement;
// const registerModal = document.getElementById(
//     "register-modal"
// ) as HTMLDivElement;
// const loginModal = document.getElementById("login-modal") as HTMLDivElement;
// const modalRegisterBtn = document.getElementById(
//     "modal-register-btn"
// ) as HTMLButtonElement;
// const modalLoginBtn = document.getElementById(
//     "modal-login-btn"
// ) as HTMLButtonElement;

// let isAuthenticate: boolean = JSON.parse(
//     localStorage.getItem("isAuthenticate") || "false"
// );
// let user: { name: string; phone: string; password: string } | null = JSON.parse(
//     localStorage.getItem("user") || "null"
// );

// function containsSpaces(value: string): boolean {
//     return /\s/.test(value);
// }

// function updateUI() {
//     if (isAuthenticate && user) {
//         if (userNameSpan) {
//             userNameSpan.innerText = user.name;
//         }

//         logoutBtn.classList.remove("hidden");
//         registerBtn.classList.add("hidden");
//         loginBtn.classList.add("hidden");
//     } else {
//         registerBtn?.classList.remove("hidden");
//         loginBtn?.classList.remove("hidden");
//         logoutBtn?.classList.add("hidden");
//     }
// }

// function openModal(modal: HTMLElement) {
//     document.documentElement.classList.add("no-scroll");
//     modal?.classList.add("active");
// }

// function closeModal(modal: HTMLElement) {
//     document.documentElement.classList.remove("no-scroll");
//     modal?.classList.remove("active");
// }

// modalRegisterBtn?.addEventListener("click", () => {
//     const name = (document.getElementById("name") as HTMLInputElement).value;
//     const phone = (document.getElementById("phone") as HTMLInputElement).value;
//     const password = (document.getElementById("password") as HTMLInputElement)
//         .value;
//     const confirmPassword = (
//         document.getElementById("confirm-password") as HTMLInputElement
//     ).value;

//     if (containsSpaces(password) || containsSpaces(phone)) {
//         alert("Phone and password must not contain spaces!");
//         return;
//     }

//     if (
//         name &&
//         phone &&
//         password &&
//         confirmPassword &&
//         password === confirmPassword
//     ) {
//         user = { name, phone, password };
//         localStorage.setItem("user", JSON.stringify(user));
//         isAuthenticate = true;
//         localStorage.setItem("isAuthenticate", JSON.stringify(isAuthenticate));

//         closeModal(registerModal);
//         updateUI();
//     } else {
//         alert("Please fill all fields correctly.");
//     }
// });

// modalLoginBtn?.addEventListener("click", () => {
//     const loginPhone = (
//         document.getElementById("login-phone") as HTMLInputElement
//     ).value;
//     const loginPassword = (
//         document.getElementById("login-password") as HTMLInputElement
//     ).value;

//     if (containsSpaces(loginPassword)) {
//         alert("Password must not contain spaces!");
//         return;
//     }

//     if (user && loginPhone === user.phone && loginPassword === user.password) {
//         isAuthenticate = true;
//         localStorage.setItem("isAuthenticate", JSON.stringify(isAuthenticate));

//         closeModal(loginModal);
//         updateUI();
//     } else {
//         alert("Invalid credentials");
//     }
// });

// logoutBtn?.addEventListener("click", () => {
//     isAuthenticate = false;
//     localStorage.setItem("isAuthenticate", JSON.stringify(isAuthenticate));
//     updateUI();
// });

// registerBtn?.addEventListener("click", () => openModal(registerModal));
// loginBtn?.addEventListener("click", () => openModal(loginModal));

// document.addEventListener("click", (event) => {
//     if (event.target === registerModal) closeModal(registerModal);
//     if (event.target === loginModal) closeModal(loginModal);

//     const target = event.target as HTMLElement;
//     if (target.classList.contains("btn-close")) {
//         const modal = target.closest(".modal");
//         if (modal) closeModal(modal as HTMLElement);
//     }
// });

// const learnMoreBtns = document.querySelectorAll(".learn-more-btn");

// learnMoreBtns?.forEach((btn) => {
//     btn.addEventListener("click", (event) => {
//         if (!user) {
//             event.preventDefault();
//             alert("Registration is required.");
//         } else if (!isAuthenticate) {
//             event.preventDefault();
//             alert("Please log in to continue.");
//         }
//     });
// });

// updateUI();
