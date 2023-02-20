import React from "react";

import "./Home.css";
import current from "../../image/current_meeting.png";
import create from "../../image/create_meeting.png";
import { useAppSelector } from "../store/hooks";

export function Home() {
  const loginData = useAppSelector((state) => state.loginReducer.data);
  return (
    <>
      <div className="div">
        <div className="builder-columns div-2">
          <div className="builder-column column">
            <div className="div-3">
              <picture>
                <img loading="lazy" src={current} className="image" />
              </picture>
              <div className="builder-image-sizer image-sizer"></div>
            </div>
          </div>
          {loginData &&
            (loginData.type === USER_TYPE.PANELLIST ||
              loginData.type === USER_TYPE.ADMIN) && (
              <div className="builder-column column-2">
                <div className="div-4">
                  <picture>
                    <img loading="lazy" src={create} className="image" />
                  </picture>
                  <div className="builder-image-sizer image-sizer"></div>
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  );
}
