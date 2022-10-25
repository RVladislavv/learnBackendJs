import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindData(item);
    });

    function bindData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); //отменяем стандартное поведение, чтоб страница не перезагрузилась

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);//расположит спиннер под формой

            //собираем данные из формы, а дальше с помощью фетча их все отправим на сервер
            const formData = new FormData(form);

            //formData - собирает все данные с формы
            //дальше мы привращаем её в массив массивов formdData.entries()
            //дальше мы их превращаем в классический объект
            //дальше мы их превращаем в JSON
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            //превращает объект в массив массивов
            //обратно можно через Object.fromEntries

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data); //data - это данные, которые возвращаются из промиса(те, которые вернул сервер)
                    showThanksModal(message.success); //выводим сообщение
                    statusMessage.remove();  //удаляем всё
                }).catch(() => {  //в случае ошибки
                    showThanksModal(message.failure); //сообщение об ошибке
                }).finally(() => {
                    form.reset();             //очищаем форму
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }

    
    


    //FetchAPI
    //API - готовые методы и свойства для работы одной программы с другой
    //пример работы с https://jsonplaceholder.typicode.com/ - даёт фейковый JSON API
    //fetch - использует промисы, возвращает промис, от того далее можно обработать, например через then
    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //      //встроеный метод в фетч, который данные json превратить в обычный объект JS
    //     .then(response => response.json())  
    //     //команда выше тоже вернёт промис по итогу
    //     .then(json => console.log(json));

    //фетч с изменением метода на пост
    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: "POST",
    //     body: JSON.stringify({name: 'Alex'}),
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // })
    //     .then(response => response.json())
    //     .then(json => console.log(json));


    /* fetch('db.json')  //подключаемся к нашей базе данных
        .then(data => data.json())  //переводим json формат в обычный объект JS
        .then(res => console.log(res));  //выводим в консоль */

}

export default forms;