import axios from "axios"
import { URL } from "../config/url"

export const deleteLogout = () => {
    return axios.delete(URL.INNER.Logout)
}
