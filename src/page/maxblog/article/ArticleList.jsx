import React, { useEffect, useState } from "react"
import "./ArticleList.css"
import { ARTICLE } from "../../../config/module"
import { Button, List, Space } from "antd"
import { LikeOutlined, EyeOutlined, ClockCircleOutlined } from "@ant-design/icons"
import { getArticleList } from "./handlers"
import config from "../../../config/config"
import { URL } from "../../../config/url"

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
)

function ArticleList() {
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [data, setData] = useState([]) // list data

    useEffect(() => {
        loadArticleList()
    }, [])
    const loadArticleList = () => {
        let params = {
            pageNo: pageNo,
            pageSize: pageSize,
            tagName: "",
            search: "",
        }
        getArticleList(params)
            .then(res => {
                mapArticleListRes2Data(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const mapArticleListRes2Data = articleListRes => {
        let article
        let data = articleListRes.map(item => {
            article = {
                id: item.id,
                href: `${config.beBaseUrl}${ARTICLE.FUNCTIONS.ARTICLE_LIST.FUNCTIONS.ARTICLE.FULL_PATH}?articleId=${item.id}`,
                title: item.title,
                tags: "",
                preview: item.content.slice(0, 50) + " ...", // 前50个字符
                view: item.view,
                like: item.like,
                updatedAt: item.updatedAt.slice(0, 19), // 2024-10-05 15:12:11
                cover: `${config.beBaseUrl}${URL.INNER.Static}${URL.INNER.Maxblog}/${item.id}/${item.cover}`, // /www/maxblog/JC23dJhf3bMNZZZCYLjGBk/golang.png
            }
            let tagNameStr = ""
            for (let i = 0; i < item.tags.length; i++) {
                if (i === item.tags.length - 1) {
                    tagNameStr += `${item.tags[i]}`
                    break
                }
                tagNameStr += `${item.tags[i]}, `
            }
            article.tags = tagNameStr
            return article
        })
        setData(data)
    }

    const onClickListImage = (id) => {
        window.open(`${ARTICLE.FUNCTIONS.ARTICLE_LIST.FUNCTIONS.ARTICLE.FULL_PATH}?articleId=${id}`)
    }

    return (
        <div id={ARTICLE.FUNCTIONS.ARTICLE_LIST.KEY} className={ARTICLE.FUNCTIONS.ARTICLE_LIST.KEY}>
            <Button type="primary">创建文章</Button>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (pageNo, pageSize) => {
                        setPageNo(pageNo)
                        setPageSize(pageSize)
                    },
                    onShowSizeChange: (pageNo, pageSize) => {
                        setPageNo(pageNo)
                        setPageSize(pageSize)
                    },
                    pageSize: pageSize,
                    pageSizeOptions: ["5", "10", "20", "30"],
                    showQuickJumper: true,
                    showSizeChanger: true,
                    locale: {
                        items_per_page: "篇/页",
                        jump_to: "跳至",
                        page: "页"
                    },
                }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <IconText icon={EyeOutlined} text={item.view} key="list-vertical-view-o" />,
                            <IconText icon={LikeOutlined} text={item.like} key="list-vertical-like-o" />,
                            <IconText icon={ClockCircleOutlined} text={item.updatedAt} key="list-vertical-datetime" />,
                        ]}
                        extra={
                            <img
                                width={250}
                                alt="cover"
                                src={item.cover}
                                onClick={() => onClickListImage(item.id)}
                            />
                        }
                    >
                        <List.Item.Meta
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.tags}
                        />
                        {item.preview}
                    </List.Item>
                )}
            />
        </div>
    )
}

export default ArticleList