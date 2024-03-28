import axios from "axios"

const setAuthToken = tokenData => {
    if (tokenData) {
        axios.defaults.withCredentials = true
        axios.defaults.headers.common["Authorization"] = tokenData.token
        axios.defaults.headers.common["User_id"] = tokenData.userId
    } else {
        axios.defaults.withCredentials = false
        delete axios.defaults.headers.common["Authorization"]
        delete axios.defaults.headers.common["User_id"]
    }
}

export default setAuthToken
