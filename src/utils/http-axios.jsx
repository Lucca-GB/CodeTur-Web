import axios from 'axios';


export default axios.create({
    baseURL : 'https://192.168.15.15:5001/v1/',
    headers : {
        'content-type' : 'application/json'
    }
})