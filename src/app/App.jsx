import React from "react"
import "./App.css"
import {BrowserRouter as Router} from "react-router-dom"
import routes from "./routes"
import { useDispatch } from "react-redux"
import { toggleAuth, setToken } from "../state/reducers/auth"

function App() {
    const dispatch = useDispatch()
    let token = localStorage.getItem("TOKEN")
    if (token) {
        dispatch(toggleAuth())
        dispatch(setToken(token))
    }
    return (
        <div id="App" className="App">
            <Router>{ routes }</Router>
        </div>
    )
}

export default App
