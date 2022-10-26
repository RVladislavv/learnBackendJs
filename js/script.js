require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';
import {openModal} from './modules/modal';
//временно отключил автооткрытие модуля обратной связи
window.addEventListener('DOMContentLoaded', () => {
    //переменная, которая отвечает за таймер
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 300000);

    /* const tabs = require('./modules/tabs'); старый вариант */


    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2022-10-29');
    cards();
    calc();
    forms('form', modalTimerId);
    slider({
        container: '.offer__slide',
        slide: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
    });




    //json-server db.json - запуск json сервера
    //npx webpack - сборщик через вебпак
    //можно так же писать import {one, two} from './main';
    //можно так же сразу переименовывать {one as first}, 
    //где one - например переменная или скрипт
    //или импортировать всё: import * as data from './main';
    //а дальше использовать как методы или свойства
    //data.sayHi();
    //так как по сути импортируется объект, а название переменных - это деструктуризация

    //в модулях запись будет формата
    /*
        export let one = 1;
        let two;
        export {two};
        export function sayHi() {
            console.log('Hello');
        }
    */
    //экспорт по умолчанию - может быть только один
    /*
     export default function sayHi() {
             console.log('Hello');
         }
    */
    //уже в scropt.js будет запись для дефолтного
    //import sayHi from './main'; - не как именнованный экспорт(объект), а просто экспортируется
    //sayHi(); потом просто использовать
});