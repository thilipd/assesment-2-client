import axios from 'axios';



const instance = axios.create({
    baseURL: 'https://assesment-2-server.herokuapp.com/',
    responseType: 'json',
    timeout: 10000,

    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    }
})

export default instance;