import React from "react"

export function ModeButtons({ buttonLabel, onClick }) {
	const style = {
		height: "30px",
		width: "30px",
		border: "none",
	}

	return (
		<>
			<button onClick={() => onClick(buttonLabel.format)} style={style}>
				{buttonLabel.label}
			</button>
		</>
	)
}
