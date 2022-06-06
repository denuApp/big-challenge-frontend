import axios from 'axios';
import { config } from 'process';


const bigNoTokenApi =  () => {

  const axiosInstance = axios.create({
    baseURL: 'http://big.test/api/',
    headers: {'Accept': 'application/json'}
  });

  axiosInstance.interceptors.request.use(
    config => {
      return config;
    }
  );

  return axiosInstance;
}

export default bigNoTokenApi;