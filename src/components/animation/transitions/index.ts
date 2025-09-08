// Создаем наблюдатель
const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Добавляем класс активной анимации, когда элемент видим
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Отключаем наблюдение после срабатывания
            }
        });
    },
    {
        threshold: 0.5, // Срабатывание при 50% видимости элемента
    }
);

// Выбираем все элементы, которые содержат класс анимации
const animateBlocks = document.querySelectorAll("[class*='animate-']");

// Наблюдаем за каждым элементом
animateBlocks.forEach((block) => {
    observer.observe(block);
});
