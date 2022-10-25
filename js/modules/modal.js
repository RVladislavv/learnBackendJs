function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    //modal.classList.toggle('show'); - тогда надо будет убрать класс hide у modal
    document.body.style.overflow = 'hidden';
    //если пользователь сам открыл - то убираем открытие через время
    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    //modal.classList.toggle('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);
    //обработчик событий не повесится на элементы созданные динамически
    //нужно использовать делегирование событий

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
        //стрелочная функция, чтоб передать аргумент, но не вызов функции
    });

    //реализация закрытия модуля, при клике вне модуля
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    //закрытие модального окна по клавише Escape
    document.addEventListener('keydown', (e) => {
        //закрытие будет при нажатии клавиши эскейпт и при открытом модальном окне
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    //открытие модального окна через время
    //временно отключил

    function showModalByScroll() {
        //проверка, что долистал до конца страницы
        //прокрученная часть + видимая часть(в данный момент) >= высоты всего сайта - 1px(чтоб наверняка)
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalTimerId);
            //удаляем обработчик событий, чтоб не открывалось модульное окно при каждом прокруте до конца страницы
            window.removeEventListener('scroll', showModalByScroll);
        }
    }



    //открытие мод окна, когда пользователь долистал до конца
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export { closeModal };//по сути можно объединить с нижним
export { openModal };