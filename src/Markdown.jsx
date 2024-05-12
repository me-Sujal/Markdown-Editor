import React, { useEffect, useState } from "react"
import { ModeButtons } from "./ModeButtons"
import "./style/Markdown.css"
import Preview from "./components/Preview.jsx"
import Editor from "./components/Editor.jsx"

export default function MarkdownEditors() {
	const [text, setText] = useState("ok")
	const [editPreview, setEditPreview] = useState({
		mode: 1, //mode 1 = both mode 2 = editor only mode 0 = preview only
		editorWidth: "50%",
		previewerWidth: "50%",
	})
	const [characterCount, setCharacterCount] = useState(0)
	const [wordcount, setWordCount] = useState(0)

	const buttonlabels = [
		{ format: "# ", name: "heading"},
		{ format: "** ** ", name: "bold" },
		{ format: "* * ", name: "italic" },
		{ format: "~ ~ ", name : "strikeThrough"},
		{ format: "- ", name : "unorderedList"},
		{ format: "1. ", name : "orderedList"},
		{ format: "> ", name : "quotes"},
		{ format: "` `", name :"codeInline" },
		{ format: "``` \n ```", name: "codeBlock"} ,
		{ format: "", name : "table"},
		{ format: "![Alt Image]( )", name : "imageAttach"},
		{ format: "[Link]( )", name : "linkAttach"},
		{ format: "clear", name: "clearAll" },
	]

	useEffect(() => {
		setCharacterCount(text.trim().length)
		const words = text.trim().split(/\s+/)
		if (words[0] != [""]) {
			setWordCount(words.length)
		} else {
			setWordCount(0)
		}
	}, [text])

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
					<div
						className="editor"
						style={{ width: editPreview.editorWidth }}>
						<Editor value={text} handleChange={handleChange} />
					</div>
					<div
						className="previewer"
						style={{ width: editPreview.previewerWidth, padding: "20px 40px" }}>
						<Preview text={text} />
					</div>
				</div>
				<div className="tailbar">
					<p>
						Character : {characterCount} Words : {wordcount}
					</p>
				</div>
			</div>
		</>
	)
}
