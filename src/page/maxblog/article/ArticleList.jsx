import React, { useEffect, useState } from "react"
import "./Article.css"
import { ARTICLE } from "../../../config/module"
import {Button, List, Avatar, Space, notification} from "antd"

function ArticleList() {
    const [data, setData] = useState(null)
    const [pageNum, setPageNum] = useState(1)
    const [getArticleListReqObj, setGetArticleListReqObj] = useState(null)

    useEffect(() => {
    }, [])



    return (
        <div id={ARTICLE.FUNCTIONS.ARTICLE_LIST.KEY} className={ARTICLE.FUNCTIONS.ARTICLE_LIST.KEY}>
            <Button type="primary">创建文章</Button>

        </div>
    )
}

export default ArticleList