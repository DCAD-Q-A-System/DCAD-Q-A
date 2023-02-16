import { InputLiveStreamSource } from "../components/InputLiveStreamSoure";
import "./MeetingDetails.css"
import React,{useState} from "react";

export function MeetingDetails() {
  const [iframeLink,setIframeLink] = useState("");
  const YOUTUBE_REGEX = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
  const PANOPTO_REGEX = /((http:\/\/(.*\.hosted\.panopto\.com\/.*|.*\.staging\.panopto\.com\/.*|.*\.cloud\.panopto\.eu\/.*))|(https:\/\/(.*\.hosted\.panopto\.com\/.*|.*\.staging\.panopto\.com\/.*|.*\.cloud\.panopto\.eu\/.*)))/i
  const submitForm = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault();
    if(!(iframeLink.match(YOUTUBE_REGEX) || iframeLink.match(PANOPTO_REGEX))){
      alert("Wrong embed!");
      return;
    }
    const res = await fetch("http://127.0.0.1:8080/meeting/insert",{
      method:"POST",
      body:JSON.stringify({iframeLink}),
    });
    if(res.status == 200){
      alert("Successful!");
    }else{
      alert("Something went wrong!");
    }
  }

  return (
    <>
      <div className="div">
        <div className="div-2">
          <div className="builder-columns div-3">
            <div className="builder-column column">
              <div className="div-4">
                <div className="div-5">
                  <div className="div-6">ID:</div>
                  <div className="div-7"></div>
                </div>
                <div className="div-8">
                  <div className="div-9">Start Time:</div>
                  <div className="div-10"></div>
                </div>
                <div className="div-11">
                  <div className="div-12">End Time:</div>
                  <div className="div-13"></div>
                </div>
                {InputLiveStreamSource({iframeLink,setIframeLink})}
                
                <button onClick={submitForm} className="div-17" id="save">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
