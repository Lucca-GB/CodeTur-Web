import http from '../utils/http-axios';

const listar = () => {
    //'https://192.168.15.15:5001/v1/'
    return http.get('package', {
        headers : {
            'authorization' : `Bearer ${localStorage.getItem('token-codetur')}`
        }
    });
}

const cadastrar = dados => {
    return http.post(`package`, dados, {
        headers : {
            'authorization' : `Bearer ${localStorage.getItem('token-codetur')}`
        }
    })
}

export default {
    listar,
    cadastrar
}