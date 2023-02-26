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
        <div>
            <div style={{fontSize:"20px"}}>Iframe Link:</div>

            <input
                value={iframeLink} 
                onChange={(e)=>setIframeLink(e.target.value)}
                type="text" style={{width:"90%",height:"50px" }} 
                className="fs-4"/>
        </div>
    )
}