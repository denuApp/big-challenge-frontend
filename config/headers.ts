import axios from 'axios';
import { config } from 'process';



const bigApi =  () => {

  const axiosInstance = axios.create({
    baseURL: 'http://big.test/api/',
    headers: {'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')},
  });

  axiosInstance.interceptors.request.use(
    config => {
      return config;
    }
  );

  return axiosInstance;
}

export default bigApi;