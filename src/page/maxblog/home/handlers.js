import axios from "axios"
import setAuthToken from "../../../utils/setAuthToken"

export const getPageData = path => {
    setAuthToken(localStorage.getItem("TOKEN"))
    return axios.get(path)
}
