import React from "react"
import "./SideMenu.css"
import { Layout } from "antd"
import Menu from "antd/lib/menu"
import { AreaChartOutlined, ExperimentOutlined, HomeOutlined, ProjectOutlined, ReadOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { ARTICLE, DEMO, HOME, MAXBLOG, PROJECT, STATS } from "../config/module"

const { Sider } = Layout
const { SubMenu } = Menu

function SideMenu(props) {
    const navigate = useNavigate()

    const jump = e => {
        props.setCurrent(e.key)
        switch (e.key) {
        case STATS.KEY:
            navigate(STATS.FULL_PATH)
            break
        case HOME.KEY:
            navigate(HOME.FULL_PATH)
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
            >
                <Menu.Item key={ STATS.KEY } icon={<AreaChartOutlined />} onClick={ jump }>{ STATS.NAME }</Menu.Item>
                <Menu.Item key={ HOME.KEY } icon={<HomeOutlined />} onClick={ jump }>{ HOME.NAME }</Menu.Item>
                <SubMenu key={ ARTICLE.KEY } icon={<ReadOutlined />} title={ ARTICLE.NAME }>
                    <Menu.Item key={ ARTICLE.FUNCTIONS.ARTICLE_LIST.KEY } onClick={ jump }>{ARTICLE.FUNCTIONS.ARTICLE_LIST.NAME}</Menu.Item>
                    <Menu.Item key={ ARTICLE.FUNCTIONS.ARTICLE_TAGS.KEY } onClick={ jump }>{ARTICLE.FUNCTIONS.ARTICLE_TAGS.NAME}</Menu.Item>
                </SubMenu>
                <SubMenu key={ DEMO.KEY } icon={<ExperimentOutlined />} title={ DEMO.NAME }>
                    <Menu.Item key={ DEMO.FUNCTIONS.DEMO_LIST.KEY } onClick={ jump }>{DEMO.FUNCTIONS.DEMO_LIST.NAME}</Menu.Item>
                </SubMenu>
                <SubMenu key={ PROJECT.KEY } icon={<ProjectOutlined />} title={ PROJECT.NAME }>
                    <Menu.Item key={ PROJECT.FUNCTIONS.PROJECT_LIST.KEY } onClick={ jump }>{PROJECT.FUNCTIONS.PROJECT_LIST.NAME}</Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    )
}

export default SideMenu