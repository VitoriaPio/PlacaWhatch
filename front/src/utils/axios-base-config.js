import axios from 'axios';

export const API_BASE_URL = 'https://placa-whatch.vercel.app/api';

export const axiosBaseConfig = axios.create({
  baseURL: API_BASE_URL,
});
