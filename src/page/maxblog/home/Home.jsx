import React, { useEffect, useState } from "react"
import "./Home.css"
import { HOME, LOGIN } from "../../../config/module"
import { getPageData } from "./handlers"
import { notification } from "antd"
import { FrownOutlined } from "@ant-design/icons"
import setAuthToken from "../../../utils/setAuthToken"
import { setToken, toggleAuth } from "../../../state/reducers/auth"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

function Home() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [data, setData] = useState(null)

    useEffect(() => {
        getPageData(HOME.FULL_PATH)
            .then(res => {
                setData(res.data.data)
            })
            .catch(() => {
                dispatch(toggleAuth())
                dispatch(setToken(""))
                setAuthToken()
                localStorage.removeItem("TOKEN")
                notification.open({
                    message: "需要登录",
                    description: "验证失败，请重新登录",
                    icon: <FrownOutlined style={{ color: "#ff4d4f" }} />,
                })
                navigate(LOGIN.FULL_PATH)
            })
    }, [])

    return (
        <div id={HOME.KEY} className={HOME.KEY}>
            I am Home {data ? data.msg : "loading"}
        </div>
    )
}

export default Home