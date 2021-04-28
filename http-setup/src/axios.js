import axios from "axios";

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorisation'] = 'Instance Auth Token';

instance.interceptors.request.use(request => {
    console.log('[axios.js] request ', request)
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

export default instance;