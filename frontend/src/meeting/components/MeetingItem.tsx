import React from "react";

export function MeetingItem({ id }: { id: string }) {
  return (
    <div className="panDiv-10">
      <div className="builder-columns panDiv-11">
        <div className="builder-column panColumn">
          <div className="panDiv-12">
            <div className="builder-columns panDiv-13">
              <div className="builder-column panColumn-5">
                <div className="panDiv-14">ID: {id}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="builder-column panColumn-6">
          <div className="panDiv-15">Join</div>
        </div>
        <div className="builder-column panColumn-7">
          <div className="panDiv-16">Edit</div>
        </div>
      </div>
    </div>
  );
}
