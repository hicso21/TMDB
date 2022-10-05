import axios from 'axios'

const fetchAPI = axios.create({
    baseURL:'http://localhost:3001',
    headers:{
        Accept:'application/json',
    },
    withCredentials:true,
    credentials:'include'
});

export default fetchAPI