import React, { useState} from "react"
import Markdown from "react-markdown"
import { ModeButtons } from "./ModeButtons"
import remarkGfm from "remark-gfm"
import "./style/Markdown.css"
import reactsvg from "./assets/react.svg"
import boldSvg from "./assets/bold.svg"
import italicSvg from "./assets/italic.svg"

export default function MarkdownEditors() {
	const [text, setText] = useState("")
	const [editPreview, setEditPreview] = useState({
		mode: 1, //mode 1 = both mode 2 = editor only mode 0 = preview only
		editorWidth: "50%",
		previewerWidth: "50%",
	})
	const [characterCount, setCharacterCount] = useState(0)

	const buttonlabels = [
		{ label: "Insert Heading", format: "# ",src:reactsvg },
		{ label: "Insert Bold Text", format: "** ** ",src:boldSvg },
		{ label: "Insert Italic Text", format: "* * ",src:italicSvg },
		{ label: "Insert Strikethrough Text", format: "~ ~ " },
		{ label: "Insert Unordered List Item", format: "- " },
		{ label: "Insert Ordered List Item", format: "1. " },
		{ label: "Insert Blockquote", format: "> " },
		{ label: "Insert Inline Code", format: "` `" },
		{ label: "Insert Code Block", format: "``` \n ```" },
		{ label: "TB", format: "" },
		{ label: "Insert Image", format: "![Alt Image]( )" },
		{ label: "Insert Link", format: "[Link]( )" },
		{ label: "Delete all", format: "clear" },
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
								buttonInfo={buttonObj}
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
