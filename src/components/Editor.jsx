
import React, { useEffect, useRef, useState } from "react"

import "../style/Markdown.css"

export default function Editor({ mode, handleChange}) {
	const [text, setText] = useState("")
	const textAreaRef = useRef(null)

	useEffect(() => {
		handleChange(text)
	}, [text])

	const handleTextareaChange = (e) => {
		setText(e.target.value)
	}

	const handleTextAdd = (textValue) => {
		const textarea = textAreaRef.current
		const start = textarea.selectionStart
		const end = textarea.selectionEnd
		const newText = text.slice(0, start) + textValue + text.slice(end)
		setText(newText)
		const newCaretPosition = start + textValue.length 
		textarea.focus()
		setTimeout(() => {
			textarea.selectionStart = newCaretPosition
			textarea.selectionEnd = newCaretPosition
		}, 0)

	}

	const style = {
		borderTop: "none",
		borderBottom: "none",
		borderLeft: "none",
		borderRight: "1px solid lightgrey",
		padding: mode !== 0 ? "20px 30px" : "0px",
		outline: "none",
		background: ""
	}

	return (
		<>
			<textarea
				ref={textAreaRef}
				className="text-input"
				value={text}
				style={style}
				onChange={handleTextareaChange}
			/>
		</>
	)
}