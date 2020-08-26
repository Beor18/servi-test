import axios from "axios";

const instance = axios.create({
  baseURL: "http://api.openweathermap.org/data/2.5/",
  responseType: "json",
});

instance.interceptors.request.use(
  config => {
    return {
      ...config,
      params: {
        ...config.params
      }
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance