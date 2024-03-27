import axios from "axios"
import config from "./config"
import short from "short-uuid"

const initAxios = () => {
    axios.defaults.baseURL = config.beBaseUrl
    axios.defaults.headers.common["Content-Type"] = "application/json"
    axios.defaults.headers.common["Request_id"] = short().new()
    axios.defaults.headers.common["App_id"] = short().new()
    let token = localStorage.getItem("TOKEN")
    if (token) {
        axios.defaults.headers.common["Authorization"] = token
    }
}

export default initAxios
