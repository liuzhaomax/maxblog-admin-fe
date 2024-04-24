import axios from "axios"
import { URL } from "../../../config/url"
import short from "short-uuid"

export const getArticleList = (params) => {
    axios.defaults.headers.common["Request_id"] = short().new()
    if (params) {
        return axios.get(URL.INNER.ArticleList +
            `?pageNo=${params.pageNo}&pageSize=${params.pageSize}&tagName=${params.tagName}&search=${params.search}`)
    }
    return axios.get(URL.INNER.ArticleList)
}

export const getArticleTags = () => {
    axios.defaults.headers.common["Request_id"] = short().new()
    return axios.get(URL.INNER.ArticleTags)
}

export const getArticleArticle = (id) => {
    axios.defaults.headers.common["Request_id"] = short().new()
    return axios.get(URL.INNER.ArticleArticle + `?articleId=${id}`)
}

export const putArticleArticle = (body) => {
    axios.defaults.headers.common["Request_id"] = short().new()
    return axios.put(URL.INNER.ArticleArticle + `?articleId=${body.id}`, body)
}

export const postArticleArticleCoverUpload = (id, file) => {
    axios.defaults.headers.common["Request_id"] = short().new()
    let headers = Object.assign({}, axios.defaults.headers.common, {
        "Content-Type": "multipart/form-data"
    })
    return axios.post(URL.INNER.UploadCoverImage + `?articleId=${id}`, file,{
        headers: headers,
    })
}

export const postArticleArticleContentUpload = (id, file) => {
    axios.defaults.headers.common["Request_id"] = short().new()
    let headers = Object.assign({}, axios.defaults.headers.common, {
        "Content-Type": "multipart/form-data"
    })
    return axios.post(URL.INNER.UploadContentFile + `?articleId=${id}`, file,{
        headers: headers,
    })
}

export const deleteArticleArticle = (id) => {
    axios.defaults.headers.common["Request_id"] = short().new()
    return axios.delete(URL.INNER.ArticleArticle + `?articleId=${id}`)
}
