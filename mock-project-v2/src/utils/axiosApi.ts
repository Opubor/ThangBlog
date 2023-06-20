import axios, { CreateAxiosDefaults } from "axios"

const config: CreateAxiosDefaults = {
   baseURL: "http://localhost:5000/",
  //  baseURL: "https://api.realworld.io/api/",
   timeout: 10000
}

// if (localStorage.userToken) {
//    config.headers = {
//       "Authorization": `Bearer ${localStorage.userToken}`
//    }
// }

export const axiosApi = axios.create(config)

// Add a request interceptor
axiosApi.interceptors.request.use(function (config) {
   // Do something before request is sent
   // get token from redux
   const token = "anvf"

   config.headers.Authorization = token ? `Bearer ${token}` : undefined;
   return config;
 }, function (error) {
   // Do something with request error
   return Promise.reject(error);
 });
