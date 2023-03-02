import React from "react";

import "./LoginPanel.css";

import logo from "../image/durham_logo.png";
import login from "../image/Login.jpg";
import { useNavigate } from "react-router-dom";
import { LOGIN, PANELLIST_LOGIN, STUDENT_LOGIN } from "../utils/paths";
import du from "../image/durham_university_logo_1.png";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Row, Container } from "react-bootstrap";
import Col from "react-bootstrap/esm/Col";

export function LoginPanel() {
  const navigate = useNavigate();

  const TYPES = ["Student", "Panellist", "Admin", "Guest"];
  return (
    <>
      <div className="button-row color-overlay d-flex justify-content-center align-items-center">
        <div className="card-bg button-col rounded p-4 p-sm-3">
          {TYPES.map((t, i) => {
            return (
              <Button
                key={i}
                // className={i < TYPES.length - 1 ? "button-margin" : ""}
                className="btn btn-lg fs-1 m-5"
                onClick={() => navigate(`/login/${t.toLowerCase()}`)}
              >
                Login as {t}
              </Button>
            );
          })}
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
