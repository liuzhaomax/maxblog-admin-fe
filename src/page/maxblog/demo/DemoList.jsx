import React from "react"
import "./Demo.css"
import { DEMO } from "../../../config/module"

function DemoList() {
    return (
        <div id={DEMO.FUNCTIONS.DEMO_LIST.KEY} className={DEMO.FUNCTIONS.DEMO_LIST.KEY}>
            I am Demo List
        </div>
    )
}

export default DemoList