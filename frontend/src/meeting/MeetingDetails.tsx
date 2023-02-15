import { useState } from "react";
import { EndTime, StartTime } from "./controlPanel/AddTimeSet";
import "./MeetingDetails.css"

export function MeetingDetails() {

  const [value, onChange] = useState(new Date())
  const [endvalue, endOnChange] = useState(new Date())

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
                  <StartTime value={value} onChange={onChange} />
                </div>
                <div className="div-11">
                  <div className="div-12">End Time:</div>
                  <EndTime value={value} endvalue={endvalue} endOnChange={endOnChange} />
                </div>
                <div className="div-14">
                  <div className="div-15">iframe Link:</div>
                  <div className="div-16"></div>
                </div>
                <button className="div-17">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
