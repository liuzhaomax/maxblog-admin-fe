import React from "react"
import "./Article.css"
import { ARTICLE } from "../../../config/module"

function ArticleTags() {
    return (
        <div id={ARTICLE.FUNCTIONS.ARTICLE_TAGS.KEY} className={ARTICLE.FUNCTIONS.ARTICLE_TAGS.KEY}>
            I am Article Tags
        </div>
    )
}

export default ArticleTags