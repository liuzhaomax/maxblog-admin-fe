import React from "react"
import "./App.css"
import {BrowserRouter as Router} from "react-router-dom"
import routes from "./routes"
import { useDispatch } from "react-redux"
import { toggleAuth, setToken } from "../state/reducers/auth"
import { ConfigProvider } from "antd"

function App() {
    const dispatch = useDispatch()
    let token = localStorage.getItem("MAXBLOG_TOKEN")
    if (token) {
        dispatch(toggleAuth())
        dispatch(setToken(token))
    }
    return (
        <div id="App" className="App">
            <ConfigProvider theme={{ token: { colorPrimary: "#338e6c" } }}>
                <Router>{ routes }</Router>
            </ConfigProvider>
        </div>
    )
}

export default App
