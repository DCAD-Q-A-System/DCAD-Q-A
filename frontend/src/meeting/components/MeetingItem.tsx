import React from "react";

export function MeetingItem({
  id,
  name,
  startTime,
  endTime,
}: {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
}) {
  return (
    <div className="panDiv-10">
      <div className="builder-columns panDiv-11">
        <div className="builder-column panColumn">
          <div className="panDiv-12">
            <div className="builder-columns panDiv-13">
              <div className="builder-column panColumn-5">
                <div className="panDiv-14">ID: {id}</div>
                <div className="panDiv-14">Name: {name}</div>
                <div className="panDiv-14">Start: {startTime}</div>
                <div className="panDiv-14">End: {endTime}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="builder-column panColumn-6">
          <button
            className="panDiv-15"
            onClick={() => navigate(`/meeting/${id}`)}
          >
            Join
          </button>
        </div>
        <div className="builder-column panColumn-7">
          <div className="panDiv-16">Edit</div>
        </div>
      </div>
    </div>
  );
}
