import axios from 'axios'

export const HOME = "http://localHost:5000"

export const http = axios.create({
    timeout: 20000,
    baseURL: HOME,
});