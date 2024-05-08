import React, { useEffect, useState } from "react"

export function ModeButtons({ buttonInfo, onClick }) {
	const [image, setImage] = useState(null)

	useEffect(() => {
		const importSVG = async () => {
			try {
				const { default: svgComponent } = await import(
					`./assets/${buttonInfo.name}.svg`
				)
				setImage(svgComponent)
			} catch (err) {
				console.error(`Error importing SVG file: ${err}`)
			}
		}
		importSVG()
	}, [buttonInfo.trial])

	return (
		<>
			<button onClick={() => onClick(buttonInfo.format)}>
				<img
					src={image}
					alt={buttonInfo.label}
				/>
			</button>
		</>
	)
}
