import axios from 'axios'
import axiosRetry from 'axios-retry';

export const RELAY = process.env.REACT_APP_RELAY_URL

export const http = axios.create({
    timeout: 20000,
    baseURL: `${RELAY}/rtb-refactored`,
    withCredentials: true,
    headers: {
        'Accept': "application/json",
        "Content-Type": "application/json",
    },
});

axiosRetry(http, {
    retries: 3, // number of retries
    retryDelay: (retryCount) => {
        console.log(`retry attempt: ${retryCount}`);
        return retryCount * 20000; // time interval between retries
    },
});

// http.interceptors.request.use(
//     (config) =>{
//
//     },
//     (error) => {
//
//     }
// );
//
http.interceptors.response.use(
    response => {

        return response;
    },
    error => {

        return Promise.reject(error);
    }
);
