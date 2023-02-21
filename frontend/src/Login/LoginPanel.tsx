import React from "react";

import "./LoginPanel.css";

import logo from "../image/durham_logo.png";
import { useNavigate } from "react-router-dom";
import { LOGIN, PANELLIST_LOGIN, STUDENT_LOGIN } from "../utils/paths";
import login from "../image/Login.jpg";
import du from "../image/durham_university_logo_1.png";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export function LoginPanel() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg">
        <div className="color-overlay d-flex justify-content-center align-items-center">
          <div className="card-bg">
            <Button onClick={() => navigate("/login/student")}>
              Login as STUDENT
            </Button>
            <Button onClick={() => navigate("/login/panellist")}>
              Login as Panellist
            </Button>
          </div>
        </div>
      </div>
      {/* <div
        classNameName="div"
        style={{
          backgroundImage: `url(${login})`,
        }}
      >
        <div classNameName="div-2">
          <div classNameName="div-3">
            <div classNameName="builder-columns div-4">
              <div classNameName="builder-column column">
                <div classNameName="div-5">
                  <picture>
                    <img loading="lazy" src={logo} classNameName="image" />
                  </picture>
                  <div classNameName="builder-image-sizer image-sizer"></div>
                </div>
              </div>
              <div classNameName="builder-column column-2">
                <div classNameName="welcome-to-the-online-q-a-syst">
                  Welcome to the online Q&A system
                </div>
              </div>
            </div>
          </div>
          <div classNameName="div-6">
            <div classNameName="builder-columns div-7">
              <div classNameName="builder-column column-3">
                <div classNameName="div-8">
                  <div classNameName="div-9">
                    <div classNameName="builder-columns div-10">
                      <div classNameName="builder-column column-4">
                        <div
                          onClick={() => {
                            navigate("/login/student");
                          }}
                          classNameName="div-11"
                        >
                          Login as Student
                        </div>
                      </div>
                    </div>
                  </div>
                  <div classNameName="div-12">
                    <div classNameName="builder-columns div-13">
                      <div classNameName="builder-column column-5">
                        <div
                          onClick={() => {
                            navigate("/login/panellist");
                          }}
                          classNameName="div-14"
                        >
                          Login as Panellist
                        </div>
                      </div>
                    </div>
                  </div>
                  <div classNameName="div-15">
                    <div classNameName="builder-columns div-16">
                      <div classNameName="builder-column column-6">
                        <div classNameName="div-17">Join as Guest</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
