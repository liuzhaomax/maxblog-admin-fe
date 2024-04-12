import "./UpdateArticle.css"
import React, { useState, useEffect } from "react"
import { getArticleArticle, postArticleArticleCoverUpload, putArticleArticle } from "./handlers"
import { ARTICLE } from "../../../config/module"
import { Button, Input, Image, Upload } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { deepCopy } from "../../../utils/deepCopy"
import config from "../../../config/config"
import { URL } from "../../../config/url"

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })

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
                // 初始化封面图片
                const initialFileList = [
                    {
                        uid: res.data.data.id,
                        name: res.data.data.cover,
                        status: "done",
                        url: `${config.beBaseUrl}${URL.INNER.Static}${URL.INNER.Maxblog}${URL.INNER.Article}/${res.data.data.id}/${res.data.data.cover}`,
                    },
                ]
                setFileList(initialFileList)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleTextChange = (e, key) => {
        let data = deepCopy(articleRes)
        data[key] = e.target.value
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
                let data = deepCopy(articleRes)
                data.cover = opt.file.name
                setArticleRes(data)
            })
            .catch(err => {
                console.log(err)
                opt.onError(err)
            })
    }
    
    // 确认取消按钮
    const onClickBack = () => {
        navigate(ARTICLE.FUNCTIONS.ARTICLE_LIST.FULL_PATH)
    }

    const onClickConfirm = () => {
        // TODO 发送请求更新文章
        let body = deepCopy(articleRes)
        putArticleArticle(body)
            .then(() => {

            })
            .catch(err => {
                console.log(err)
            })
        // TODO 封面图片上传与预览
        // TODO 分类标签
        // TODO slateEditor
        // TODO 创建文章
        // TODO 删除文章
        // navigate(ARTICLE.FUNCTIONS.ARTICLE_LIST.FULL_PATH)
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
                    <div className="article-article-input">
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
                    <Input className="article-article-input" placeholder="tags" value={articleRes ? articleRes.tags : ""} onChange={(e) => handleTextChange(e, "tags")} />
                </div>
                <div className="article-article-input-wrap">
                    <div className="article-article-input-header">文章内容：</div>
                    <Input className="article-article-input" placeholder="content" value={articleRes ? articleRes.content : ""} onChange={(e) => handleTextChange(e, "content")} />
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
