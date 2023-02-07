import axios from 'axios';


const BACKEND = "localhost:3000"
interface JWToken {
    jsonWebToken: string;
}
export async function auth(ssoString: string) {
    const resp = await fetch(BACKEND + "/login", {
        method: "POST",
        body: JSON.stringify({ ssoString })
    })
    const data: JWToken = await resp.json()
    localStorage.setItem('loginData', data.jsonWebToken);

    const request = axios.create({
        baseURL: BACKEND,
        timeout: 5000
    })

    request.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('loginData')

            if (token) config.headers.Authorization = token;
            return config
        },
        (error) => Promise.reject(error)
    )

    const express = require('express')
    const router = express.Router()
    request.interceptors.response.use(
        (response) => {
            const { status, data } = response
            if (data.success) {
                return data
            } else {
                if (status === 401) {
                    router.push({ name: "Login" })
                }
                return Promise.reject(data.message)
            }
        },
        error => {
            return Promise.reject(error)
        }
    )

}