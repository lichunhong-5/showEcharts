const axios = require('axios');

let baseURL = '';
if (process.env.NODE_ENV === 'production') {
    baseURL = ''
} else {
    baseURL = '/dev'
}

const http = axios.create({
    baseURL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },

})

const post = (url, params) => {
    params = '_request_data=' + encodeURIComponent(JSON.stringify({
        parameter: params,
    }));
    return new Promise((resolve, reject) => {
        http.post(url, params).then(response => {          
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}
const get = (url, params) => {
    return new Promise((resolve, reject) => {
        http.get(url, { params: params }).then(response => {   
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}


// 添加请求拦截器
const requestInterceptors = http.interceptors.request.use(config => {
    config.headers.Authorization = window.localStorage.auth;
    return config
}, error => {
        return Promise.reject(error)
    }
)

// 添加响应拦截器
const responseInterceptors = http.interceptors.response.use(config => {
    if (config.data.code == '418') {
        return  Promise.reject(config.data.msg)
    } else {
        if (config.data.token) {
            window.localStorage.auth = config.data.token;
        }
    }
    return config.data
}, error => {
        if (error.status === 404) {
            return Promise.reject(error)
        }
})


const $http = {
    get,
    post,
    requestInterceptors,
    responseInterceptors
}


export default $http;