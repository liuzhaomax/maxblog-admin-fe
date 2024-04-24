import React, { useEffect, useState } from "react"
import "./ArticleList.css"
import { ARTICLE } from "../../../config/module"
import { Button, List, Space, Input, Modal } from "antd"
import {
    LikeOutlined,
    EyeOutlined,
    ClockCircleOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons"
import { deleteArticleArticle, getArticleList } from "./handlers"
import config from "../../../config/config"
import { URL } from "../../../config/url"
import { useNavigate } from "react-router-dom"
import MarkdownIt from "markdown-it"

const { Search } = Input

const IconText = ({ icon, text, onClick }) => (
    <Space onClick={onClick}>
        {React.createElement(icon)}
        {text}
    </Space>
)

function ArticleList() {
    const navigate = useNavigate()

    // 搜索
    const [searchingStr, setSearchingStr] = useState("")
    const [searchLoading, setSearchLoading] = useState(false)
    const onSearch = (value) => {
        setSearchLoading(true)
        setSearchingStr(value)
        setSearchLoading(false)
    }

    // 获取文章列表
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [articleListRes, setArticleListRes] = useState([]) // list data

    useEffect(() => {
        loadArticleList()
    }, [searchingStr])
    const loadArticleList = () => {
        let params = {
            pageNo: pageNo,
            pageSize: pageSize,
            tagName: "",
            search: searchingStr,
        }
        getArticleList(params)
            .then(res => {
                mapArticleListRes2Data(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const mdParser = new MarkdownIt({ html: true })
    const mapArticleListRes2Data = articleListRes => {
        let article
        let data = articleListRes.map(item => {
            article = {
                id: item.id,
                title: item.title,
                tags: "",
                preview: mdParser.render(item.content.slice(0, 100) + " ..."), // 前100个字符
                view: item.view,
                like: item.like,
                updatedAt: item.updatedAt.slice(0, 19), // 2024-10-05 15:12:11
                cover: `${config.beBaseUrl}${URL.INNER.Static}${URL.INNER.Maxblog}${URL.INNER.Article}/${item.id}/${item.cover}`, // /www/maxblog/JC23dJhf3bMNZZZCYLjGBk/golang.png
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
        setArticleListRes(data)
    }

    const onClickListImage = (id) => {
        navigate(`${ARTICLE.FUNCTIONS.ARTICLE_LIST.FUNCTIONS.UPDATE_ARTICLE.FULL_PATH}?articleId=${id}`)
    }

    const onClickListTitle = (id) => {
        navigate(`${ARTICLE.FUNCTIONS.ARTICLE_LIST.FUNCTIONS.UPDATE_ARTICLE.FULL_PATH}?articleId=${id}`)
    }

    // 删除文章
    const handleDelete = (id, title) => {
        showBackModal(id, title)
    }
    const [modal, contextHolderModal] = Modal.useModal()
    const showBackModal = (id, title) => {
        modal.confirm({
            title: "确认删除？",
            icon: <ExclamationCircleOutlined />,
            content: (
                <>
                    <p>请确认是否删除文章：{title}</p>
                </>
            ),
            okText: "确认",
            cancelText: "取消",
            onOk: () => {
                deleteArticleArticle(id)
                    .then(() => {
                        loadArticleList()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
        })
    }

    // 新建文章
    const handleCreateArticle = () => {
        navigate(`${ARTICLE.FUNCTIONS.ARTICLE_LIST.FUNCTIONS.CREATE_ARTICLE.FULL_PATH}?articleId=`)
    }

    return (
        <div id={ARTICLE.FUNCTIONS.ARTICLE_LIST.KEY} className={ARTICLE.FUNCTIONS.ARTICLE_LIST.KEY}>
            <div className="article-list-tool-wrap">
                <Button type="primary" onClick={handleCreateArticle}>创建文章</Button>
                <Search
                    className="article-list-tool-search"
                    placeholder="搜索标题和正文"
                    onSearch={onSearch}
                    enterButton
                    loading={searchLoading}
                />
            </div>
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
                dataSource={articleListRes}
                renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <IconText icon={EyeOutlined} text={item.view} key="list-vertical-view-o" />,
                            <IconText icon={LikeOutlined} text={item.like} key="list-vertical-like-o" />,
                            <IconText icon={ClockCircleOutlined} text={item.updatedAt} key="list-vertical-datetime" />,
                            <IconText icon={DeleteOutlined} text="删除" key="list-vertical-delete" onClick={() => handleDelete(item.id, item.title)}/>,
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
                            title={<div className="article-list-title" onClick={() => onClickListTitle(item.id)} >{item.title}</div>}
                            description={item.tags}
                        />
                        <div dangerouslySetInnerHTML={{ __html: item.preview }}></div>
                    </List.Item>
                )}
            />
            {contextHolderModal}
        </div>
    )
}

export default ArticleList