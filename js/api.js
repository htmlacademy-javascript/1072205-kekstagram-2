const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const fetchData = (route, method, body = null) => {
  fetch(`${BASE_URL}${route}`, { method, body }).then((response) => response.json());
};

const getData = () => fetchData(Route.GET_DATA, Method.GET);

const sendData = (body) => fetchData(Route.SEND_DATA, Method.POST, body);

export { getData, sendData };
