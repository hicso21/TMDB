import axios from 'axios'

const fetchAPI = axios.create({
    baseURL:'https://jnqqh7-3001.preview.csb.app',
    headers:{
        Accept:'application/json',
    },
    withCredentials:true,
    credentials:'include'
});

export default fetchAPI