import axios from "axios"

const setAuthToken = tokenRes => {
    if (tokenRes) {
        axios.defaults.withCredentials = true
        axios.defaults.headers.common["Authorization"] = tokenRes.token
        axios.defaults.headers.common["User_id"] = tokenRes.userId
    } else {
        axios.defaults.withCredentials = false
        delete axios.defaults.headers.common["Authorization"]
        delete axios.defaults.headers.common["User_id"]
    }
}

export default setAuthToken
