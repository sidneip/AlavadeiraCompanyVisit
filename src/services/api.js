import axios from 'axios';
import { AsyncStorage } from 'react-native'

const api = axios.create({
  // baseURL: 'http://192.0.0.16:3000/public_api/v2',
  baseURL: 'https://www.alavadeira.com/public_api/v2',
});

getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@driver/token');
    if (value !== null) {
      return value
    }
  } catch (error) {
      console.log(error);
    // Error retrieving data
  }
};

api.interceptors.request.use(async config => {
  config.headers['X-API-TOKEN'] = await getToken()
  return config;
});

export default api;
