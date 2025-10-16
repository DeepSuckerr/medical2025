import axios from 'axios'
import vue from 'vue'

const $axios = axios.create({

    baseURL: 'http://localhost:8080',

})


$axios.interceptors.request.use(function (config) {

    // //先获取token值
    // var user = JSON.parse(localStorage.getItem("LoginUser"));
    // if (user.token === null) {
    //     //跳转到登录
    //     this.$router.replace('/login');
    //     return ;
    // }
    // //添加请求头
    // config.headers.token = user.token;


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