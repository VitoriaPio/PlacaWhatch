import axios from 'axios';

// export const API_BASE_URL = 'https://placa-whatch.vercel.app/api';
export const API_BASE_URL = 'http://localhost:8080/api';


export const axiosBaseConfig = axios.create({
  baseURL: API_BASE_URL,
});
