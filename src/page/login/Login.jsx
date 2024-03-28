import React, { useEffect } from "react"
import "./Login.css"
import bg from "../../asset/cover.jpg"
import LoginBox from "./LoginBox.jsx"
import { getPuk } from "./handlers"

function Login() {
    useEffect(() => {
        getPuk()
            .then(res => {
                window.sessionStorage.setItem("puk", res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div id="login" className="login" style={{backgroundImage:`url(${bg})`}}>
            <LoginBox />
        </div>
    )
}

export default Login


