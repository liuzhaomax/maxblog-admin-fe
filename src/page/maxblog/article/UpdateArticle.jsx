import "./UpdateArticle.css"
import React, { useState, useEffect } from "react"
import { getArticleArticle } from "./handlers"
import { ARTICLE } from "../../../config/module"
import { Button, Input } from "antd"
import { useNavigate } from "react-router-dom"

const UpdateArticle = () => {
    const navigate = useNavigate()

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

    const onClickBack = () => {
        navigate(ARTICLE.FUNCTIONS.ARTICLE_LIST.FULL_PATH)
    }

    const onClickConfirm = () => {
        // TODO 发送请求更新文章
        navigate(ARTICLE.FUNCTIONS.ARTICLE_LIST.FULL_PATH)
    }

    return (
        <div id={ARTICLE.FUNCTIONS.ARTICLE_LIST.FUNCTIONS.UPDATE_ARTICLE.KEY} className={ARTICLE.FUNCTIONS.ARTICLE_LIST.FUNCTIONS.UPDATE_ARTICLE.KEY}>
            <div className="article-article-container">
                <div className="article-article-input-wrap">
                    <div className="article-article-input-header">文章标题：</div>
                    <Input className="article-article-input" placeholder="title" value={articleRes ? articleRes.title : ""} />
                </div>
                <div className="article-article-input-wrap">
                    <div className="article-article-input-header">文章作者：</div>
                    <Input className="article-article-input" placeholder="author" value={articleRes ? articleRes.author : ""} />
                </div>
                <div className="article-article-input-wrap">
                    <div className="article-article-input-header">参考资料：</div>
                    <Input className="article-article-input" placeholder="reference" value={articleRes ? articleRes.reference : ""} />
                </div>
                <div className="article-article-input-wrap">
                    <div className="article-article-input-header">转载链接：</div>
                    <Input className="article-article-input" placeholder="link" value={articleRes ? articleRes.link : ""} />
                </div>
                <div className="article-article-input-wrap">
                    <div className="article-article-input-header">封面图片：</div>
                    <Input className="article-article-input" placeholder="cover" value={articleRes ? articleRes.cover : ""} />
                </div>
                <div className="article-article-input-wrap">
                    <div className="article-article-input-header">文章内容：</div>
                    <Input className="article-article-input" placeholder="content" value={articleRes ? articleRes.content : ""} />
                </div>
                <div className="article-article-button-wrap">
                    <Button className="article-article-button" onClick={onClickBack}>返回</Button>
                    <Button className="article-article-button" onClick={onClickConfirm} type="primary">确认</Button>
                </div>
            </div>
        </div>
    )
}

export default UpdateArticle
