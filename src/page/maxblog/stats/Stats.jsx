import React from "react"
import "./Stats.css"
import { STATS } from "../../../config/module"

function Stats() {
    return (
        <div id={STATS.KEY} className={STATS.KEY}>
            I am Stats
        </div>
    )
}

export default Stats