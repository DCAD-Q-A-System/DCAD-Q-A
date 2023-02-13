import React from "react";
import "./LoginPanel.css"
import logo from "../image/durham_logo.png"

export function LoginPanel(props: any) {
  return (
    <>
      <div className="div">
        <div className="div-2">
          <div className="div-3">
            <div className="builder-columns div-4">
              <div className="builder-column column">
                <div className="div-5">
                  <picture>
                    <img
                      loading="lazy"
                      src = {logo}
                      className="image"
                    />
                  </picture>
                  <div className="builder-image-sizer image-sizer"></div>
                </div>
              </div>
              <div className="builder-column column-2">
                <div className="welcome-to-the-online-q-a-syst">
                  Welcome to the online Q&A system
                </div>
              </div>
            </div>
          </div>
          <div className="div-6">
            <div className="builder-columns div-7">
              <div className="builder-column column-3">
                <div className="div-8">
                  <div className="div-9">
                    <div className="builder-columns div-10">
                      <div className="builder-column column-4">
                        <div className="div-11">Login as Student</div>
                      </div>
                    </div>
                  </div>
                  <div className="div-12">
                    <div className="builder-columns div-13">
                      <div className="builder-column column-5">
                        <div className="div-14">Login as Panellist</div>
                      </div>
                    </div>
                  </div>
                  <div className="div-15">
                    <div className="builder-columns div-16">
                      <div className="builder-column column-6">
                        <div className="div-17">Join as Guest</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
