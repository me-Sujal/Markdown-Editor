import React from "react";
import "../style/Markdown.css"


export default function Editor({ value, handleChange }) {
    return (
        <>
            <textarea
                className="text-input"
                value={value}
                onChange= {handleChange}
            />
        </>
    )
}