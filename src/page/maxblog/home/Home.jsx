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
                localStorage.removeItem("MAXBLOG_TOKEN")
                localStorage.removeItem("MAXBLOG_USER_ID")
                openNotification()
                setTimeout(() => {
                    navigate(LOGIN.FULL_PATH)
                }, 3000)
            })
    }, [])
    const [notificationApi, contextHolderNotification] = notification.useNotification()
    const openNotification = () => {
        notificationApi.info({
            message: "登录状态验证失败，请重新登录",
            description: "页面将于3秒后跳转",
            icon: (<FrownOutlined style={{ color: "#ff4d4f" }} />),
            placement: "topRight",
        })
    }

    return (
        <div id={HOME.KEY} className={HOME.KEY}>
            I am Home {data ? data.msg : "loading"}
            {contextHolderNotification}
        </div>
    )
}

export default Home