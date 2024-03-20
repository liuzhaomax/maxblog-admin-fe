import axios from "axios"

const setAuthToken = token => {
    if (token) {
        axios.defaults.withCredentials = true
        axios.defaults.headers.common["Authorization"] = token
    } else {
        axios.defaults.withCredentials = false
        delete axios.defaults.headers.common["Authorization"]
    }
}

export default setAuthToken