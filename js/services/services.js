//так же тут интересно можно наблюдать разный синтаксис для асинхронных функций

//отправляем данные на сервер
//asyns - означает, что код будет асинхронным
//await - ставится там, где нужно ждать ответа
const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });
    //тут так же нужен await, так как неизвестно сколько будет ответ в предыдущем коде, а значит
    //не известно - когда res получит значение промиса(а без него у res нет метода json)
    return await res.json(); //если без async/await это делать, то будет проблема с 
};

//функцию пишем для получения данных с сервера
async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
        //в случае ошибки выкидываем в консоль объект Ошибки
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}

export { postData };
export { getResource };