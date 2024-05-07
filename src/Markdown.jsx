import React, { useState, useEffect } from "react"
import Markdown from "react-markdown"
import { ModeButtons } from "./ModeButtons"
import remarkGfm from "remark-gfm"
import "./style/Markdown.css"

export default function MarkdownEditors() {
	const [text, setText] = useState("")
	const [editPreview, setEditPreview] = useState({
		mode: 1, //mode 1 = both mode 2 = editor only mode 0 = preview only
		editorWidth: "50%",
		previewerWidth: "50%",
	})
	const [characterCount, setCharacterCount] = useState(0)

	const buttonlabels = [
		{ label: "H", format: "# " },
		{ label: "B", format: "** ** " },
		{ label: "I", format: "* * " },
		{ label: "S", format: "~ ~ " },
		{ label: "UL", format: "- " },
		{ label: "Ol", format: "1. " },
		{ label: "BQ", format: "> " },
		{ label: "C", format: "` `" },
		{ label: "CBLK", format: "``` \n ```" },
		{ label: "TB", format: "" },
		{ label: "Img", format: "![Alt Image]( )" },
		{ label: "Lnk", format: "[Link]( )" },
		{ label: "del", format: "clear" },
	]

	const handleChange = (e) => {
		setText(e.target.value)
		setCharacterCount(text.length)
	}

	const changeMode = () => {
		setEditPreview((prevState) => {
			let currentMode = editPreview.mode
			return {
				...prevState,
				editorWidth:
					currentMode === 0 ? "50%" : currentMode === 1 ? "100%" : "0%",
				previewerWidth:
					currentMode === 0 ? "50%" : currentMode === 2 ? "100%" : "0%",
				mode: currentMode >= 2 ? 0 : currentMode + 1,
			}
		})
	}

	const editorStyle = {
		width: editPreview.editorWidth,
	}

	const previewerStyle = {
		width: editPreview.previewerWidth,
		padding: "20px 40px",
	}

	const formatText = (format) => {
		if (format === "clear") {
			setText(" ")
		} else {
			setText((prevState) => prevState + " " + format)
		}
	}

	return (
		<>
			<div className="markdown-editor">
				<div className="headbar">
					<div className="left-col"></div>
					<div className="right-col">
						{buttonlabels.map((buttonObj, index) => (
							<ModeButtons
								key={index}
								buttonLabel={buttonObj}
								onClick={() => formatText(buttonObj.format)}
							/>
						))}
						<button onClick={changeMode}>change</button>
					</div>
				</div>
				<div className="editor-body">
					<div className="editor" style={editorStyle}>
						<textarea
							className="text-input"
							value={text}
							onChange={handleChange}></textarea>
					</div>
					<div className="previewer" style={previewerStyle}>
						<Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
					</div>
				</div>
				<div className="tailbar">
					<p>Character : {characterCount}</p>
				</div>
			</div>
		</>
	)
}
