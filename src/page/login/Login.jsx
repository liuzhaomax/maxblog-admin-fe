import React, { useEffect } from "react"
import "./Login.css"
import bg from "../../asset/cover.jpg"
import LoginBox from "./LoginBox.jsx"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getPuk } from "./handlers"
import { HOME } from "../../config/module"

function Login() {
    const auth = useSelector(state => state.auth)
    let navigate = useNavigate()

    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate(HOME.FULL_PATH)
        } else {
            getPuk()
                .then(res => {
                    window.sessionStorage.setItem("puk", res.data.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [])

    return (
        <div id="login" className="login" style={{backgroundImage:`url(${bg})`}}>
            <LoginBox />
        </div>
    )
}

export default Login


