import "./ArticleArticle.css"
import React, { useState, useEffect } from "react"
import { getArticleArticle } from "./handlers"
import { ARTICLE } from "../../../config/module"

const ArticleArticle = () => {
    const [articleRes, setArticleRes] = useState(null)
    useEffect(() => {
        loadArticle()
    }, [])
    const loadArticle = () => {
        const queryString = window.location.search
        const params = new URLSearchParams(queryString)
        const articleId = params.get("articleId")
        getArticleArticle(articleId)
            .then(res => {
                setArticleRes(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div id={ARTICLE.FUNCTIONS.ARTICLE_LIST.FUNCTIONS.ARTICLE.KEY} className={ARTICLE.FUNCTIONS.ARTICLE_LIST.FUNCTIONS.ARTICLE.KEY}>
            <div className="article-article-container">
            </div>
        </div>
    )
}

export default ArticleArticle
