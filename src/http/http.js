import axios from 'axios'

const $axios = axios.create({

    baseURL: '/api',
})


$axios.interceptors.request.use(function (config) {

    return config;
},(error)=>{
    return Promise.reject(error);
})


$axios.interceptors.response.use(function (res) {
    return res.data;
},(error)=>{
    return Promise.reject(error);
})

export default $axios;