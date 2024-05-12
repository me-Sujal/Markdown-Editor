import React from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

import "../style/PreviewText.css"

export default function Preview({ text }) {
	return (
		<>
			<Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
		</>
	)
}
