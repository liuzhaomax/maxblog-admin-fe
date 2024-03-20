import React from "react"
import {Navigate} from "react-router-dom"
import { STATS, LOGIN } from "../../../config/module"
import { useSelector } from "react-redux"

function MaxBlog() {
    const auth = useSelector(state => state.auth)
    return (
        <React.Fragment>
            {
                auth.isAuthenticated ?
                    <Navigate to={STATS.FULL_PATH} replace/> :
                    <Navigate to={LOGIN.FULL_PATH} replace/>
            }
        </React.Fragment>
    )
}

export default MaxBlog
