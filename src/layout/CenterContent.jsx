import React, { useEffect, useState } from "react"
import "./CenterContent.css"
import { Outlet, useOutletContext } from "react-router-dom"
import { Breadcrumb, Layout } from "antd"
import { MAXBLOG } from "../config/module"

const { Content } = Layout

function CenterContent() {
    const [breadcrumbItems, setBreadcrumbItems] = useState([])
    const [currentSelected] = useOutletContext()

    useEffect(() => {
        loadBreadcrumbItems(MAXBLOG, MAXBLOG.MODULE_MAXBLOG)
    }, [currentSelected])

    const getPath = modules => {
        let names
        for (let k in modules) {
            if (modules[k].FUNCTIONS) {
                names = getPath(modules[k].FUNCTIONS)
                if (names) {
                    names = [modules[k].NAME, ...names]
                    return names
                }
            }
            if (location.pathname === modules[k].FULL_PATH) {
                return [modules[k].NAME]
            }
        }
    }

    const loadBreadcrumbItems = (website, modules) => {
        let names = getPath(modules)
        names = [website.NAME, ...names]
        let items = names.map((name, index) => {
            return { title: names[index] }
        })
        setBreadcrumbItems(items)
    }

    return (
        <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb
                id="breadcrumb"
                style={{ margin: "16px 0" }}
                items={breadcrumbItems}>
            </Breadcrumb>
            <Content className="content">
                <Outlet />
            </Content>
        </Layout>
    )
}

export default CenterContent