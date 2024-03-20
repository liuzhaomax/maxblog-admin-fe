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
    const [mobile, setMobile] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const encrypt = () => {
        let rsa = new JsEncrypt()
        rsa.setPublicKey(sessionStorage.getItem("puk"))
        return {
            "mobile": rsa.encrypt(mobile),
            "password": rsa.encrypt(password)
        }
    }

    const submit = () => {
        setIsLoading(true)
        postLogin(encrypt())
            .then(res => {
                setIsLoading(false)
                dispatch(toggleAuth())
                dispatch(setToken(res.data.data))
                setAuthToken(res.data.data)
                localStorage.setItem("TOKEN", res.data.data)
                message.success("登录成功")
                navigate(STATS.FULL_PATH)
            })
            .catch(() => {
                setIsLoading(false)
                message.error("登录失败")
                notification.open({
                    message: "登录失败",
                    description: "请检查输入的用户名与密码",
                    icon: <FrownOutlined style={{ color: "#ff4d4f" }} />,
                })
            })
    }

    const onMobileChange = e => {
        setMobile(e.target.value)
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
                    name="mobile"
                    placeholder="请输入用户名"
                    value={ mobile }
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
        </div>
    )
}

export default LoginBox