import axios from "axios"
import { URL } from "../../config/url"
import short from "short-uuid"

export const getPuk = () => {
    axios.defaults.headers.common["Request_id"] = short().new()
    return axios.get(URL.INNER.Login)
}

export const postLogin = data => {
    axios.defaults.headers.common["Request_id"] = short().new()
    return axios.post(URL.INNER.Login, data, {withCredentials: true})
}