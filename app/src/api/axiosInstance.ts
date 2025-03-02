import axios from "axios"; 

const instance = axios.create({
  baseURL : 'https://shmyaks.ru/api/v1',
  
});

export default instance;