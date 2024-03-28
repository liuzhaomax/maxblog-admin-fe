import React, { useState } from "react"
import "./Login.css"
import { Button, Input, message, notification } from "antd"
import { EyeInvisibleOutlined, EyeTwoTone, FrownOutlined } from "@ant-design/icons"
import JsEncrypt from "jsencrypt"
import setAuthToken from "../../utils/setAuthToken"
import { useNavigate } from "react-router-dom"
import { STATS } from "../../config/module"
import { postLogin } from "./handlers"
import { useDispatch } from "react-redux"
import { setToken, toggleAuth } from "../../state/reducers/auth"

function LoginBox() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const [messageApi, contextHolderMessage] = message.useMessage()
    const [notificationApi, contextHolderNotification] = notification.useNotification()
    const openNotification = (placement) => {
        notificationApi.info({
            message: "登录失败",
            description: "请检查输入的用户名与密码",
            icon: (<FrownOutlined style={{ color: "#ff4d4f" }} />),
            placement,
        })
    }

    const encrypt = () => {
        let rsa = new JsEncrypt()
        let publicKey = atob(sessionStorage.getItem("puk"))
        rsa.setPublicKey(publicKey)
        return {
            "username": rsa.encrypt(username),
            "password": rsa.encrypt(password),
        }
    }

    const submit = () => {
        setIsLoading(true)
        postLogin(encrypt())
            .then(res => {
                setIsLoading(false)
                dispatch(toggleAuth())
                dispatch(setToken(res.data.data.token))
                setAuthToken(res.data.data)
                localStorage.setItem("MAXBLOG_TOKEN", res.data.data.token)
                localStorage.setItem("MAXBLOG_USER_ID", res.data.data.userId)
                messageApi.success("登录成功")
                navigate(STATS.FULL_PATH)
            })
            .catch(() => {
                setIsLoading(false)
                messageApi.error("登录失败")
                openNotification("topRight")
            })
    }

    const onMobileChange = e => {
        setUsername(e.target.value)
    }

    const onPasswordChange = e => {
        setPassword(e.target.value)
    }

    const cancelBubble = e => {
        e.stopPropagation()
    }
    
    return (
        <div className="login-box" onClick={ cancelBubble }>
            <div className="login-box-content">
                <div id="login-box-first-line">
                    <h1>登录</h1>
                    <div id="login-logo"/>
                </div>
                <Input
                    id="login-user-name"
                    name="username"
                    placeholder="请输入用户名"
                    value={ username }
                    onPressEnter={ submit }
                    onChange={ onMobileChange }
                />
                <Input.Password
                    id="login-user-password"
                    name="password"
                    placeholder="请输入密码"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    value={ password }
                    onPressEnter={ submit }
                    onChange={ onPasswordChange }
                />
                <Button id="btn-login" type="primary" onClick={ submit } loading={ isLoading }>登录</Button>
            </div>
            {contextHolderMessage}
            {contextHolderNotification}
        </div>
    )
}

export default LoginBox