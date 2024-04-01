import React from "react"
import "./SideMenu.css"
import { Layout } from "antd"
import Menu from "antd/lib/menu"
import { useNavigate } from "react-router-dom"
import { ARTICLE, DEMO, HOME, MAXBLOG, PROJECT, STATS } from "../config/module"
import { SIDER_MENU_ITEMS } from "../config/menu"

const { Sider } = Layout

function SideMenu(props) {
    const navigate = useNavigate()

    const jump = e => {
        props.setCurrent(e.key)
        switch (e.key) {
        case HOME.KEY:
            navigate(HOME.FULL_PATH)
            break
        case STATS.KEY:
            navigate(STATS.FULL_PATH)
            break
        case ARTICLE.FUNCTIONS.ARTICLE_LIST.KEY:
            navigate(ARTICLE.FUNCTIONS.ARTICLE_LIST.FULL_PATH)
            break
        case ARTICLE.FUNCTIONS.ARTICLE_TAGS.KEY:
            navigate(ARTICLE.FUNCTIONS.ARTICLE_TAGS.FULL_PATH)
            break
        case DEMO.FUNCTIONS.DEMO_LIST.KEY:
            navigate(DEMO.FUNCTIONS.DEMO_LIST.FULL_PATH)
            break
        case PROJECT.FUNCTIONS.PROJECT_LIST.KEY:
            navigate(PROJECT.FUNCTIONS.PROJECT_LIST.FULL_PATH)
            break
        default:
            console.log("无效 Menu.Item key.")
        }
    }

    const getSelectedKey = modules => {
        let keys
        for (let k in modules) {
            if (modules[k].FUNCTIONS) {
                keys = getSelectedKey(modules[k].FUNCTIONS)
                if (keys) {
                    keys = [modules[k].KEY, ...keys]
                    return keys
                }
            }
            if (location.pathname === modules[k].FULL_PATH) {
                return [modules[k].KEY]
            }
        }
    }

    const getOpenKey = modules => {
        let keys
        for (let k in modules) {
            if (modules[k].FUNCTIONS) {
                keys = getOpenKey(modules[k].FUNCTIONS)
                if (keys) {
                    keys = [modules[k].KEY, ...keys]
                    return keys
                }
            }
            if (location.pathname === modules[k].FULL_PATH) {
                return []
            }
        }
    }
    
    return (
        <Sider width={200} className="sider">
            <Menu
                mode="inline"
                defaultSelectedKeys={getSelectedKey(MAXBLOG.MODULE_MAXBLOG)}
                defaultOpenKeys={getOpenKey(MAXBLOG.MODULE_MAXBLOG)}
                style={{ height: "100%", borderRight: 0 }}
                onClick={jump}
                items={SIDER_MENU_ITEMS}
            />
        </Sider>
    )
}

export default SideMenu