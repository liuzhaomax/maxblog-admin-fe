import axios from "axios"
import config from "./config"
import short from "short-uuid"

const initAxios = () => {
    axios.defaults.baseURL = config.beBaseUrl
    axios.defaults.headers.common["Content-Type"] = "application/json"
    axios.defaults.headers.common["Request_id"] = short().new()
    axios.defaults.headers.common["App_id"] = short().new()
    let token = localStorage.getItem("MAXBLOG_TOKEN")
    let userId = localStorage.getItem("MAXBLOG_USER_ID")
    if (token) {
        axios.defaults.headers.common["Authorization"] = token
        axios.defaults.headers.common["User_id"] = userId
    }
}

export default initAxios
