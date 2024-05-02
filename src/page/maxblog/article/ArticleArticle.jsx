import "./ArticleArticle.css"
import React, { useState, useEffect } from "react"
import { getArticleArticle, postArticleArticleCoverUpload, putArticleArticle, getArticleTags } from "./handlers"
import { ARTICLE } from "../../../config/module"
import { Button, Input, Image, Upload, notification, Modal, Tag } from "antd"
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { deepCopy } from "../../../utils/deepCopy"
import config from "../../../config/config"
import { URL } from "../../../config/url"
import Markdown from "./Markdown"

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })

const ArticleArticle = () => {
    const navigate = useNavigate()
    const queryString = window.location.search
    const params = new URLSearchParams(queryString)
    const articleId = params.get("articleId")

    const [articleRes, setArticleRes] = useState(
        {
            "id": articleId,
            "createdAt": "",
            "updatedAt": "",
            "deletedAt": "",
            "title": "",
            "author": "马克西",
            "reference": "",
            "link": "",
            "view": 0,
            "like": 0,
            "cover": "",
            "content": "",
            "tags": []
        }
    )
    useEffect(() => {
        loadArticle()
    }, [])
    const loadArticle = () => {
        // 判断是加载更新页还是新建页
        const path = window.location.pathname
        const pathArr = path.split("/")
        const pageName = pathArr[pathArr.length - 1]
        if (pageName === ARTICLE.FUNCTIONS.ARTICLE_LIST.FUNCTIONS.CREATE_ARTICLE.PATH) {
            return
        }
        // 更新页逻辑
        const queryString = window.location.search
        const params = new URLSearchParams(queryString)
        const articleId = params.get("articleId")
        getArticleArticle(articleId)
            .then(res => {
                setArticleRes(res.data.data)
                // 初始化封面图片
                const initialFileList = [
                    {
                        uid: res.data.data.id,
                        name: res.data.data.cover,
                        status: "done",
                        url: `${config.beBaseUrl}${URL.INNER.Static}${URL.INNER.Maxblog}${URL.INNER.Article}/${res.data.data.id}/${res.data.data.cover}`,
                    },
                ]
                // 读取文章原有图片
                setFileList(initialFileList)
                // 读取文章原有标签
                setSelectedTags(res.data.data.tags)
            })
            .catch(err => {
                console.log(err)
            })
    }

    // 文本框变化处理
    const handleTextChange = (e, key) => {
        let data = deepCopy(articleRes)
        data[key] = e.target.value
        if (key === "tags") {
            data[key] = data[key].split(",")
        }
        setArticleRes(data)
    }
    
    // 封面图片
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState("")
    const [fileList, setFileList] = useState([])
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setPreviewImage(file.url || file.preview)
        setPreviewOpen(true)
    }
    const handleImgChange = ({ fileList: newFileList }) => {
        setFileList(newFileList)
    }
    const uploadButton = (
        <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8, }} >上传</div>
        </button>
    )
    const uploadCoverImage = (opt) => {
        let formData = new FormData()
        formData.append("file", opt.file)
        postArticleArticleCoverUpload(articleRes.id, formData)
            .then(() => {
                opt.onSuccess()
                openCoverUploadSuccessNotification()
                let data = deepCopy(articleRes)
                data.cover = opt.file.name
                setArticleRes(data)
            })
            .catch(err => {
                openCoverUploadErrorNotification()
                opt.onError(err)
            })
    }
    const [notificationApi, contextHolderNotification] = notification.useNotification()
    const openCoverUploadSuccessNotification = () => {
        notificationApi["success"]({
            message: "封面图片上传成功",
            description: "点击“保存”按钮，才能生效",
            placement: "topRight",
        })
    }
    const openCoverUploadErrorNotification = () => {
        notificationApi["error"]({
            message: "封面图片上传失败",
            description: "请检查图片格式，尝试重新上传",
            placement: "topRight",
        })
    }

    // 标签
    const [tags, setTags] = useState([])
    useEffect(() => {
        loadTags()
    }, [])
    const loadTags = () => {
        getArticleTags()
            .then(res => {
                setTags(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const [selectedTags, setSelectedTags] = useState([])
    const handleTagChange = (tag, checked) => {
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter((t) => t !== tag)
        setSelectedTags(nextSelectedTags)
        updateTagsInput(nextSelectedTags)
    }
    const updateTagsInput = (nextSelectedTags) => {
        let data = articleRes
        let differentElements = []
        data.tags.forEach(element => {
            if (!nextSelectedTags.includes(element) && !tags.includes(element)) {
                differentElements.push(element)
            }
        })
        data.tags = [...nextSelectedTags, ...differentElements]
        setArticleRes(data)
    }

    // 内容
    const setContent = (text) => {
        let data = articleRes
        data.content = text
        setArticleRes(data)
    }
    
    // 保存返回按钮
    const onClickBack = () => {
        showBackModal()
    }
    const [modal, contextHolderModal] = Modal.useModal()
    const showBackModal = () => {
        modal.confirm({
            title: "确认返回？",
            icon: <ExclamationCircleOutlined />,
            content: (
                <>
                    <p>尚未保存更改，请确认是否返回？</p>
                    <p>点击取消，则取消；</p>
                    <p>点击确认，则不保存并返回</p>
                </>
            ),
            okText: "确认",
            cancelText: "取消",
            onOk: () => {
                navigate(ARTICLE.FUNCTIONS.ARTICLE_LIST.FULL_PATH)
            },
        })
    }

    const onClickSave = () => {
        let body = deepCopy(articleRes)
        putArticleArticle(body)
            .then(() => {
                openSaveSuccessNotification()
                navigate(ARTICLE.FUNCTIONS.ARTICLE_LIST.FULL_PATH)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const openSaveSuccessNotification = () => {
        // 静态写法不推荐，会出warning，UI会变化，会影响有监听的生命周期hook，但ArticleList中没有监听的useEffect，所以没副作用
        notification["success"]({
            message: "文章保存成功",
            placement: "topRight",
        })
    }

    return (
        <div id={ARTICLE.FUNCTIONS.ARTICLE_LIST.FUNCTIONS.UPDATE_ARTICLE.KEY} className={ARTICLE.FUNCTIONS.ARTICLE_LIST.FUNCTIONS.UPDATE_ARTICLE.KEY}>
            <div className="article-article-container">
                <div className="article-article-input-wrap">
                    <div className="article-article-input-header">文章标题：</div>
                    <Input className="article-article-input" placeholder="title" value={articleRes ? articleRes.title : ""} onChange={(e) => handleTextChange(e, "title")}/>
                </div>
                <div className="article-article-input-wrap">
                    <div className="article-article-input-header">文章作者：</div>
                    <Input className="article-article-input" placeholder="author" value={articleRes ? articleRes.author : ""} onChange={(e) => handleTextChange(e, "author")} />
                </div>
                <div className="article-article-input-wrap">
                    <div className="article-article-input-header">参考资料：</div>
                    <Input className="article-article-input" placeholder="reference" value={articleRes ? articleRes.reference : ""} onChange={(e) => handleTextChange(e, "reference")} />
                </div>
                <div className="article-article-input-wrap">
                    <div className="article-article-input-header">转载链接：</div>
                    <Input className="article-article-input" placeholder="link" value={articleRes ? articleRes.link : ""} onChange={(e) => handleTextChange(e, "link")} />
                </div>
                <div className="article-article-input-wrap article-article-cover-wrap">
                    <div className="article-article-input-header">封面图片：</div>
                    <div className="article-article-input article-article-cover-upload">
                        <Upload
                            action=""
                            name="file"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleImgChange}
                            customRequest={uploadCoverImage}
                        >
                            {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                        {previewImage && (
                            <Image
                                wrapperStyle={{ display: "none" }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(""),
                                }}
                                src={previewImage}
                            />
                        )}
                    </div>
                </div>
                <div className="article-article-input-wrap">
                    <div className="article-article-input-header">分类标签：</div>
                    <Input className="article-article-input" placeholder="tags" value={articleRes ? articleRes.tags : []} onChange={(e) => handleTextChange(e, "tags")} />
                </div>
                <div className="article-article-tags-item-warp">
                    {
                        tags.length === 0 ?
                            <></>
                            :
                            tags.map(tag => (
                                <Tag.CheckableTag
                                    className="article-article-tags-item"
                                    key={tag}
                                    checked={selectedTags.includes(tag)}
                                    onChange={(checked) => handleTagChange(tag, checked)}
                                >
                                    {tag}
                                </Tag.CheckableTag>
                            ))
                    }
                </div>
                <div className="article-article-input-wrap">
                    <div className="article-article-input-header">文章内容：</div>
                </div>
                <Markdown content={articleRes ? articleRes.content : ""} setContent={setContent} articleId={articleRes ? articleRes.id : ""}/>
                <div className="article-article-button-wrap">
                    <Button className="article-article-button" onClick={onClickBack}>返回</Button>
                    <Button className="article-article-button" onClick={onClickSave} type="primary">保存</Button>
                </div>
            </div>
            {contextHolderNotification}
            {contextHolderModal}
        </div>
    )
}

export default ArticleArticle
