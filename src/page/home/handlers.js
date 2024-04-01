import axios from "axios"
import setAuthToken from "../../utils/setAuthToken"

export const getPageData = path => {
    setAuthToken(localStorage.getItem("MAXBLOG_TOKEN"))
    setAuthToken(localStorage.getItem("MAXBLOG_USER_ID"))
    return axios.get(path)
}
