import axios from "axios"
import { URL } from "../config/url"

export const deleteLogin = () => {
    return axios.delete(URL.INNER.Logout, {withCredentials: true})
}
