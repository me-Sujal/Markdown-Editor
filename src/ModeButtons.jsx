import React from "react"

export function ModeButtons({ buttonInfo, onClick }) {
	const style = {
		height: "30px",
		aspectRatio:"0.75", // svg ko size almost 117:150 so 0.75 aspect ratio, width will be adjusted according to it. make sure to adjust height and width of svg when using new svgs
		border: "none",
	}

	return (
		<>
			<button onClick={() => onClick(buttonInfo.format)} style={style} title={buttonInfo.label}>
				<img src={buttonInfo.src} alt={buttonInfo.label} />
			</button>
		</>
	)
}
