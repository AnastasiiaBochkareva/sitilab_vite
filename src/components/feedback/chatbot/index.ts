function toggleChat(): void {
    const chatbotWindow = document.getElementById("chatbotWindow");
    const chatbotIcon = document.querySelector(".chatbot-icon");

    if (!chatbotWindow || !chatbotIcon) return;

    const isWindowHidden = chatbotWindow.classList.contains("hidden");

    if (isWindowHidden) {
        chatbotWindow.classList.remove("hidden");
        chatbotIcon.classList.add("fixed");
    } else {
        chatbotWindow.classList.add("hidden");
        chatbotIcon.classList.remove("fixed");
    }
}

function closeChatIfClickedOutside(event: MouseEvent): void {
    const chatbotWindow = document.getElementById("chatbotWindow");
    const chatbotIcon = document.querySelector(".chatbot-icon");

    if (
        chatbotWindow &&
        chatbotIcon &&
        !chatbotWindow.contains(event.target as Node) &&
        !chatbotIcon.contains(event.target as Node)
    ) {
        chatbotWindow.classList.add("hidden");
        chatbotIcon.classList.remove("fixed");
    }
}

function closeChatIfClickedInsideBot(event: MouseEvent): void {
    const chatbotWindow = document.getElementById("chatbotWindow");
    const chatbotBody = document.querySelector(".chatbot-body");
    const target = event.target as Element;

    if (chatbotWindow && chatbotBody && !target.closest("a")) {
        chatbotWindow.classList.add("hidden");
        const chatbotIcon = document.querySelector(".chatbot-icon");
        if (chatbotIcon) {
            chatbotIcon.classList.remove("fixed");
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const chatbotIcon = document.querySelector(".chatbot-icon");
    if (chatbotIcon) {
        chatbotIcon.addEventListener("click", toggleChat);
    }

    document.addEventListener("click", closeChatIfClickedOutside);

    const chatbotWindow = document.getElementById("chatbotWindow");
    if (chatbotWindow) {
        chatbotWindow.addEventListener("click", closeChatIfClickedInsideBot);
    }
});
