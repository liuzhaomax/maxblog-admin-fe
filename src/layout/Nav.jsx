import React from "react"
import "./Nav.css"
import { Layout, message } from "antd"
import Menu from "antd/lib/menu"
import { UserOutlined } from "@ant-design/icons"
import setAuthToken from "../utils/setAuthToken"
import { useNavigate } from "react-router-dom"
import { deleteLogin } from "./handlers"
import { LOGIN, MAXBLOG } from "../config/module"
import { useDispatch } from "react-redux"
import { setToken, toggleAuth } from "../state/reducers/auth"
import { MENU_ITEMS_WITHOUT_SUB } from "../config/menu"

const { Header } = Layout

function Nav() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [messageApi, contextHolderMessage] = message.useMessage()

    const logout = () => {
        deleteLogin()
            .then(() => {
                dispatch(toggleAuth())
                dispatch(setToken(""))
                setAuthToken()
                localStorage.removeItem("TOKEN")
                messageApi.success("登出成功")
                navigate(LOGIN.FULL_PATH)
            })
            .catch(() => {
                dispatch(toggleAuth())
                dispatch(setToken(""))
                setAuthToken()
                localStorage.removeItem("TOKEN")
                messageApi.error("登出失败")
                navigate(LOGIN.FULL_PATH)
            })
    }

    return (
        <Header className="header">
            <div className="logo"/>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={MAXBLOG.KEY}
                items={MENU_ITEMS_WITHOUT_SUB}
            />
            <div className="profile">
                <UserOutlined className="profile-icon"/>
            </div>
            <div className="logout" onClick={logout}>登出</div>
            {contextHolderMessage}
        </Header>
    )
}

export default Nav