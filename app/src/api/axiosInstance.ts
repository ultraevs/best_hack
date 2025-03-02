import axios from "axios"; 
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL : 'https://shmyaks.ru/api/v1',
  
});

const getAccessToken = () => {
  return Cookies.get('token');
};

instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    console.log({ token })
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;