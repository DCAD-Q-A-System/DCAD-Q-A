import React from "react"
import "./MeetingBackground.css"
export function MeetingBackground({ children }: { children: JSX.Element }) {
    return (
        <div id="background-image"> {children}</div>
    )
}