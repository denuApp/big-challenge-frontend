import axios from 'axios';

const bigApi = axios.create({
    baseURL: 'http://big.test/api/',
    timeout: 1000,
    headers: {'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')}
  });

export default bigApi;