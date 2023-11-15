/**
 * notificationOfCookie() - отображение уведомления об использовании cookie
 * Этот скрипт проверяет наличие куки accept_cookie и чтобы его значение было равно true.
 * Если это не так, то он создает новый элемент, с содержимым HTML, которое должно быть указано вместо <YOUR-HTML-CODE>. После чего, спустя время равное showTime присваивает ему класс show. При клике по крестику, уведомление будет закрываться и удаляться из DOM через время равное removeTime. В данном случае, removeTime равно времени продолжения анимации скрытия уведомления (transition).
 */

import Cookies from 'js-cookie';
window.b_cookies = Cookies;
function notificationOfCookie(showTime, removeTime) {
    const acceptCookie = Cookies.get('accept_cookie');

// console.log('un' ,acceptCookie != undefined )
// console.log('false', acceptCookie == false)
    if (acceptCookie != undefined || acceptCookie == false) { return }

    setTimeout(() => {
        cookie.classList.add('_show')
    }, showTime)

    const cookie = document.querySelector('.cookie');
    const acceptCookieElem = cookie.querySelector('.cookie-accept')
    acceptCookieElem.addEventListener('click', () => {
        cookie.classList.remove('_show')
        Cookies.set('accept_cookie', "true")

        setTimeout(() => {
          cookie.remove()
        }, removeTime)
    })


}
notificationOfCookie(300, 300);