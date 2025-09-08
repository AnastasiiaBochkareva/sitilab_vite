/*eslint-disable*/
const containers = document.querySelectorAll('.filter-result__img-container');
containers?.forEach((container) => {
    const img = container.querySelector('img');
    const altTextElement = container.querySelector('.alt-text');

    container?.addEventListener('mouseenter', () => {
        console.log('mouseenter', container);
        altTextElement.textContent = img.alt;
        altTextElement.style.display = 'block';
        adjustTextWidth(altTextElement);
    });

    container?.addEventListener('mouseleave', () => {
        altTextElement.style.display = 'none';
    });
});

function adjustTextWidth(element) {
    const screenWidth = window.innerWidth;

    const maxWidth = screenWidth < 370 ? 100 : 176;

    element.style.width = 'auto';
    element.style.whiteSpace = 'nowrap';

    let currentWidth = element.offsetWidth;

    if (currentWidth > maxWidth) {
        element.style.width = `${maxWidth}px`;
        element.style.whiteSpace = 'normal';
    } else {
        element.style.width = 'auto';
        element.style.whiteSpace = 'nowrap';
    }
}

window.addEventListener('resize', () => {
    containers?.forEach((container) => {
        const altTextElement = container.querySelector('.alt-text');
        adjustTextWidth(altTextElement);
    });
});
