import React from "react"
import "./Article.css"
import { ARTICLE } from "../../../config/module"

function ArticleList() {
    return (
        <div id={ARTICLE.FUNCTIONS.ARTICLE_LIST.KEY} className={ARTICLE.FUNCTIONS.ARTICLE_LIST.KEY}>
            I am Article List
        </div>
    )
}

export default ArticleList