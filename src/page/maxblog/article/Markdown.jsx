import React, { useEffect, useState } from "react"
import MarkdownIt from "markdown-it"
import MdEditor from "react-markdown-editor-lite"
import "react-markdown-editor-lite/lib/index.css"
import "./Markdown.css"

// 注册插件（如果有的话）
// MdEditor.use(YOUR_PLUGINS_HERE)
// 初始化Markdown解析器
const mdParser = new MarkdownIt({ html: true })

const Markdown = (props) => {
    useEffect(() => {
        setContent(props.content)
    }, [props.content])
    const [content, setContent] = useState("")
    const handleEditorChange = ({ text }) => {
        setContent(text)
        props.setContent(text)
    }

    return (
        <MdEditor
            className="article-article-markdown"
            renderHTML={text => mdParser.render(text)}
            onChange={handleEditorChange}
            value={content}
        />
    )
}

export default Markdown
