import axios from "axios"
import { URL } from "../../config/url"

export const getPuk = () => {
    return axios.get(URL.INNER.Login)
}

export const postLogin = data => {
    let credential = false
    if (process.env.NODE_ENV === "production") {
        credential = true
    }
    return axios.post(URL.INNER.Login, data, {withCredentials: credential})
}