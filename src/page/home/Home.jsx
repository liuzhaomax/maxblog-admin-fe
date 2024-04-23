import React from "react"
import { HOME } from "../../config/module"
import "./Home.css"
// import React, { useEffect, useState } from "react"
// import { HOME, LOGIN } from "../../config/module"
// import { getPageData } from "./handlers"
// import { notification } from "antd"
// import { FrownOutlined } from "@ant-design/icons"
// import setAuthToken from "../../utils/setAuthToken"
// import { setToken, toggleAuth } from "../../state/reducers/auth"
// import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"

function Home() {
    // const navigate = useNavigate()
    // const dispatch = useDispatch()
    // const [data, setData] = useState(null)
    //
    // useEffect(() => {
    //     fetchPageData()
    // }, [])
    // const fetchPageData = () => {
    //     getPageData(HOME.FULL_PATH)
    //         .then(res => {
    //             setData(res.data.data)
    //         })
    //         .catch(() => {
    //             cleanLogin()
    //             openNotification()
    //             setTimeout(() => {
    //                 navigate(LOGIN.FULL_PATH)
    //             }, 3000)
    //         })
    // }
    // const cleanLogin = () => {
    //     dispatch(toggleAuth())
    //     dispatch(setToken(""))
    //     setAuthToken()
    //     localStorage.removeItem("MAXBLOG_TOKEN")
    //     localStorage.removeItem("MAXBLOG_USER_ID")
    // }
    // const [notificationApi, contextHolderNotification] = notification.useNotification()
    // const openNotification = () => {
    //     notificationApi.info({
    //         message: "登录状态验证失败，请重新登录",
    //         description: "页面将于3秒后跳转",
    //         icon: (<FrownOutlined style={{ color: "#ff4d4f" }} />),
    //         placement: "topRight",
    //     })
    // }

    return (
        <div id={HOME.KEY} className={HOME.KEY}>
            <a href="https://jenkins.liuzhaomax.cn" target="_blank" rel="noreferrer">Jenkins</a>
            <a href="https://vault.liuzhaomax.cn" target="_blank" rel="noreferrer">Vault</a>
            <a href="https://consul.liuzhaomax.cn" target="_blank" rel="noreferrer">Consul</a>
            <a href="https://prometheus.liuzhaomax.cn" target="_blank" rel="noreferrer">Prometheus</a>
            <a href="https://grafana.liuzhaomax.cn" target="_blank" rel="noreferrer">Grafana</a>
            <a href="https://kibana.liuzhaomax.cn" target="_blank" rel="noreferrer">Kibana</a>
            <a href="https://jaeger.liuzhaomax.cn" target="_blank" rel="noreferrer">Jaeger</a>
            <a href="http://106.15.94.179:9877" target="_blank" rel="noreferrer">RocketMQ</a>
            {/*{contextHolderNotification}*/}
        </div>
    )
}

export default Home