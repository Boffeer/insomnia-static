import { copyToClipboard } from "../../helpers.b/action-helpers.js";

const copyNotificationText = "Скопировано ✓";

const NESTED_TO_COPY_NODES = [
  'button__text',
  'contact-item__text',
];

function initCopyclicker(copyClickItems) {
  copyClickItems.forEach((item) => {
    if (item.classList.contains('js_copyclicker--init')) return
      
    item.addEventListener("click", (e) => {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        // код для мобильных устройств
      } else {
        // код для обычных устройств
        e.preventDefault();

        let textNode = item;
        if (item.querySelector('svg')) {
          textNode = item.querySelector('span[class*="__text"]');
        }
        console.log(textNode)

        const copiedText = textNode.innerText;
        copyToClipboard(copiedText);
        item.dataset.text = copiedText;

        textNode.innerText = copyNotificationText;

        setTimeout(() => {
          textNode.innerText = item.dataset.text;
        }, 5000);
      }
    });

    item.classList.add('js_copyclicker--init')
  });
}

window.addEventListener('DOMContentLoaded', (event) => {
  const copyClickItems = document.querySelectorAll(".js_copyclicker");
  initCopyclicker(copyClickItems)
});
