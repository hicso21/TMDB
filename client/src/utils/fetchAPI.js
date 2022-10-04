import axios from 'axios'

const fetchAPI = axios.create({
    baseURL:'http://localhost:3001',
    headers:{
        Accept:'application/json',
    },
    
});

export default fetchAPI