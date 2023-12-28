import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const axiosPrivate = axios.create({
    baseURL: API_BASE_URL,
    timeout: 6000
});

export const axiosPublic = axios.create({
    baseUrl: API_BASE_URL,
    timeout: 6000
});

export const setPrivateHeaders = () => {
    axiosPrivate.defaults.headers.common['authorization'] = localStorage.getItem("accessToken");
}