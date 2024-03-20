import React, { useState } from "react"
import "./MainLayout.css"
import { Layout } from "antd"
import Nav from "./Nav"
import SideMenu from "./SideMenu"
import { Outlet } from "react-router-dom"

function MainLayout() {
    const [currentSelected, setCurrentSelected] = useState("")

    const setCurrent = currentKey => {
        setCurrentSelected(currentKey)
    }

    return (
        <Layout className="Layout">
            <Nav/>
            <Layout style={{"height": "93vh"}}>
                <SideMenu setCurrent={setCurrent}/>
                <Outlet context={[ currentSelected ]}/>
            </Layout>
        </Layout>
    )
}

export default MainLayout

