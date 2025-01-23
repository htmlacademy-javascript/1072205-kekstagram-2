const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

// Выполнение запроса
const fetchData = (route, method, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => response.json());

// Получение данных
const getData = () => fetchData(Route.GET_DATA, Method.GET);

// Отправка данных
const sendData = (body) => fetchData(Route.SEND_DATA, Method.POST, body);

export { getData, sendData };
