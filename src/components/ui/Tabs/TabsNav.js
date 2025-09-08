/* eslint-disable */
import { animate } from '@/js/utils';

function moveCar(tabBtn, tabsNav) {
  if (!tabBtn && !tabsNav) return;

  if (document.documentElement.clientWidth <= 1250) return;
  const btnLeft = tabBtn.offsetLeft;
  const tabsNavLeft = tabsNav.offsetLeft;
  const math = btnLeft - tabsNavLeft;
  const tabsNavWidth = tabsNav.getBoundingClientRect().width;
  const tabCar = document.querySelector('#car');
  if (tabCar) tabCar.style.left = `${math}px`;
  const widthCar = tabCar?.offsetWidth;
  const widthTabBtn = tabBtn.offsetWidth;
  const space = widthTabBtn - widthCar;
  const separate = space / 2;
  if (tabCar) tabCar.style.marginLeft = `${separate}px`;
}

(function TabsNav() {
  const clickHandler = async (e) => {
    const tabBtn = e.target.closest('.tabs-nav__btn');
    if (!tabBtn) return;

    const tabsNav = tabBtn.parentElement;
    const beforeActiveBtn = tabsNav.querySelector('.tabs-nav__btn.active');
    beforeActiveBtn?.classList.remove('active');
    tabBtn.classList.add('active');
    tabsNav.classList.add('blocked');

    moveCar(tabBtn, tabsNav);

    // hide
    const activeTab = document.getElementById(
      beforeActiveBtn?.dataset.tabTarget
    );
    const activeTab1 = document.querySelector(
      `[data-tab-id="${beforeActiveBtn?.dataset.tabTarget}"]`
    );
    if (activeTab) {
      await animate({
        draw(progress) {
          activeTab.style.opacity = 1 - progress;
          if (activeTab1) activeTab1.style.opacity = 1 - progress;
        },
      });
      activeTab.style.display = 'none';
      if (activeTab1) activeTab1.style.display = 'none';
      activeTab.style.opacity = null;
      if (activeTab1) activeTab1.style.opacity = null;
    }

    // show
    const targetTab = document.getElementById(tabBtn.dataset.tabTarget);
    const targetTab1 = document.querySelector(
      `[data-tab-id="${tabBtn?.dataset.tabTarget}"]`
    );
    if (targetTab) {
      targetTab.style.opacity = 0;
      if (targetTab1) targetTab1.style.opacity = 0;
      targetTab.style.display = null;
      if (targetTab1) targetTab1.style.display = null;
      const aInnerContainer = document.querySelector('.a-inner-container');
      if (aInnerContainer) {
        aInnerContainer.scrollTop = 0;
      }
      await animate({
        draw(progress) {
          targetTab.style.opacity = progress;
          if (targetTab1) targetTab1.style.opacity = progress;
        },
      });
      targetTab.style.opacity = null;
      if (targetTab1) targetTab1.style.opacity = null;
    }

    setTimeout(() => {
      tabsNav.classList.remove('blocked');
    }, 100);
  };

  document.addEventListener('click', (e) => {
    const tabBtn = e.target.closest('.tabs-nav__btn');
    if (!tabBtn) return;

    const tabsNav = tabBtn.parentElement;
    if (tabsNav.classList.contains('blocked')) return;
    clickHandler(e);
  });
  document.addEventListener('DOMContentLoaded', () => {
    const var1 = document.querySelector(
      '.visit-home__tabs-full .tabs-nav__btn'
    );
    const var2 = document.querySelector('.visit-home__tabs-full .tabs-nav');
    moveCar(var1, var2);
  });

  function generateLineDotted(block) {
    // написать цикл по массвиву и 50 эл-в и кажд итерац доб в эл-т блок див
    for (let i = 0; i < 151; i++) {
      const div = '<div></div>';
      block.innerHTML += div;
    }
  }
  const allElements = document.querySelectorAll('#dotted');
  allElements?.forEach((element) => {
    generateLineDotted(element);
  });
})();
