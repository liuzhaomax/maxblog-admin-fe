import React from "react"
import {Navigate} from "react-router-dom"
import { LOGIN, STATS } from "../../config/module"
import { useSelector } from "react-redux"

function Index() {
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

export default Index
