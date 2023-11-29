window.addEventListener('DOMContentLoaded', (event) => {
  // #region tabs
  /**
   * @tabs
   *
   * Табы инициируются все
   * У какой кнопки таба есть класс из js переменной TAB_ACTIVE_CLASS, тот таб и будет активным сразу
   *
   */

  function initTabs() {
    const buttonLists = document.querySelectorAll(".tabs__button-list");
    const tabsPanels = document.querySelectorAll(".tabs__panel-list");
    const TAB_ACTIVE_CLASS = "active";
    const TAB_ANIMATED_CLASS = "tab--animated";
    const TABS_INIT_CLASS = 'tabs--init';

// Добавляем активное состояние для табов, чтоб инициализировать Swiper

    function setTabsPreactiveState() {
      buttonLists.forEach((tabsList) => {
        if (!tabsList.dataset.tabs) {
          console.log('you must set data-tabs to', tabsList)
          return;
        }
        tabsPanels.forEach((tabsPagesWrap) => {
          const tabPages = tabsPagesWrap.querySelectorAll(".tabs__panel");
          tabPages.forEach((tabPage) => {
            tabPage.classList.add(TAB_ACTIVE_CLASS);
          });
        });
      });
    }

    setTabsPreactiveState();

    function activateFirstButton() {
      buttonLists.forEach(buttonList => {
        if (buttonList.querySelector(`.${TAB_ACTIVE_CLASS}`)) return;

        buttonList.querySelector('.tabs__button').classList.add(TAB_ACTIVE_CLASS)
      })
    }

    activateFirstButton();


    function activateFirstPanel() {
      tabsPanels.forEach(wrap => {
        if (wrap.querySelector(`.${TAB_ACTIVE_CLASS}`)) return;

        wrap.querySelector('.tabs__panel').classList.add(TAB_ACTIVE_CLASS)
      })
    }

    activateFirstPanel();


// Задержка нужна, чтобы Swiper слайдеры не разъезжались
    setTimeout(() => {
      buttonLists.forEach((tabsBar) => {
        const tabBarButtons = tabsBar.querySelectorAll(".tabs__button");
        let clickedCount = 0;
        tabBarButtons.forEach((tabButton, buttonIndex) => {
          if (tabButton.parentElement.classList.contains(TABS_INIT_CLASS)) return;

          tabButton.addEventListener("click", () => {
            if (clickedCount != 0) {
              //
            } else {
              clickedCount++;
            }
            tabBarButtons.forEach((tab) => {
              tab.classList.remove(TAB_ACTIVE_CLASS);
            });
            tabButton.classList.add(TAB_ACTIVE_CLASS);

            if (tabsBar.dataset.tabs) {
              const tabPages = document
                .querySelector(`.tabs__panel-list[data-tabs="${tabsBar.dataset.tabs}"]`)
                .querySelectorAll(".tabs__panel");

              if (tabPages[buttonIndex]) {
                tabPages.forEach((tabPage, tabIndex) => {
                  if (tabIndex !== buttonIndex) {
                    tabPage.classList.remove(TAB_ANIMATED_CLASS);
                    tabPage.classList.remove(TAB_ACTIVE_CLASS);
                  }
                });
                tabPages[buttonIndex].classList.add(TAB_ACTIVE_CLASS);
                setTimeout(() => {
                  tabPages[buttonIndex].classList.add(TAB_ANIMATED_CLASS);
                }, 60);
              }
            }
          });
        });

        if (tabsBar.dataset.tabs) {
          tabBarButtons.forEach((tabButton) => {
            if (tabButton.classList.contains(TAB_ACTIVE_CLASS)) {
              tabButton.click();
            }
          });
        }
      });
    }, 150);
  }

  initTabs();
  window.barba.hooks.after((e) => {
    if (!e.next.url.path.includes('prices')) return;

    initTabs();
  });
});
