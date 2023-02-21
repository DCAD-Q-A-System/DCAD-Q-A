import React from "react";

export function InputLiveStreamSource(
    {iframeLink,setIframeLink}:{iframeLink:string,
    setIframeLink:React.Dispatch<React.SetStateAction<string>>}) {
    // const button = document.getElementById("save") as HTMLButtonElement;
    // button.addEventListener("click", () => {
    //   const iframe = document.createElement("iframe");
    //   iframe.src = "https://www.youtube.com/embed/hzNDAhLlWZ8";
    //   document.body.appendChild(iframe);
    // });
    return (
        <div className="div-14">
            <div className="div-15">Iframe Link:</div>

            <input
                value={iframeLink} 
                onChange={(e)=>setIframeLink(e.target.value)}
                type="text" className="div-16"/>
        </div>
    )
}