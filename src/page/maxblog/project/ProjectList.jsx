import React from "react"
import "./Project.css"
import { PROJECT } from "../../../config/module"

function ProjectList() {
    return (
        <div id={PROJECT.FUNCTIONS.PROJECT_LIST.KEY} className={PROJECT.FUNCTIONS.PROJECT_LIST.KEY}>
            I am Project List
        </div>
    )
}

export default ProjectList