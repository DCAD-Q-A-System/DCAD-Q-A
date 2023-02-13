import React from "react";

import { useNavigate } from 'react-router';
export function LoginPanel(props: any) {
  const navigate = useNavigate()
  return (
    <>
      <div className="div">
        <div className="div-2">
          <div className="div-3">
            <div className="builder-columns div-4">
              <div className="builder-column column">
                <div className="div-5">
                  <picture>
                    <source
                      srcSet="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F266920c105df499e8fdfb93060b2484b?format=webp&width=100 100w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F266920c105df499e8fdfb93060b2484b?format=webp&width=200 200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F266920c105df499e8fdfb93060b2484b?format=webp&width=400 400w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F266920c105df499e8fdfb93060b2484b?format=webp&width=800 800w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F266920c105df499e8fdfb93060b2484b?format=webp&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F266920c105df499e8fdfb93060b2484b?format=webp&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F266920c105df499e8fdfb93060b2484b?format=webp&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F266920c105df499e8fdfb93060b2484b"
                      type="image/webp"
                    />
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F266920c105df499e8fdfb93060b2484b"
                      srcSet="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F266920c105df499e8fdfb93060b2484b?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F266920c105df499e8fdfb93060b2484b?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F266920c105df499e8fdfb93060b2484b?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F266920c105df499e8fdfb93060b2484b?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F266920c105df499e8fdfb93060b2484b?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F266920c105df499e8fdfb93060b2484b?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F266920c105df499e8fdfb93060b2484b?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F266920c105df499e8fdfb93060b2484b"
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
                        <div className="div-11" onClick ={()=>navigate("/login")}>Login as Student</div>
                      </div>
                    </div>
                  </div>
                  <div className="div-12">
                    <div className="builder-columns div-13">
                      <div className="builder-column column-5">
                        <div className="div-14" onClick ={()=>navigate("/login")}>Login as Panellist</div>
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
      <style>{`
    .div {
      display: flex;
      flex-direction: column;
      max-width: 1920px;
      justify-content: flex-start;
      align-items: center;
      padding-top: 45px;
      padding-bottom: 45px;
      background-image: url("../image/Login.jpg");
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }
    .div-2 {
      display: flex;
      flex-direction: column;
      max-width: 1665px;
      justify-content: flex-start;
      align-items: center;
    }
    .div-3 {
      display: flex;
      flex-direction: column;
      max-width: 1665px;
    }
    .div-4 {
      display: flex;
    }
    @media (max-width: 999px) {
      .div-4 {
        flex-direction: column;
        align-items: stretch;
      }
    }
    .column {
      display: flex;
      flex-direction: column;
      line-height: normal;
      width: calc(51.76% - 10px);
      margin-left: 0px;
    }
    @media (max-width: 999px) {
      .column {
        width: 100%;
      }
    }
    .div-5 {
      display: flex;
      position: relative;
      min-width: 20px;
      min-height: 20px;
      max-width: 500px;
      width: 60.06%;
    }
    .image {
      object-fit: cover;
      object-position: center;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
    }
    .image-sizer {
      width: 100%;
      padding-top: 43.1640625%;
      pointer-events: none;
      font-size: 0;
    }
    .column-2 {
      display: flex;
      flex-direction: column;
      line-height: normal;
      width: calc(84.37% - 10px);
      margin-left: 20px;
    }
    @media (max-width: 999px) {
      .column-2 {
        width: 100%;
      }
    }
    .welcome-to-the-online-q-a-syst {
      max-width: 815px;
      color: rgba(255, 255, 255, 1);
      font-size: 48px;
      letter-spacing: 0%;
      text-align: left;
      font-family: "Inter", sans-serif;
    }
    .div-6 {
      display: flex;
      flex-direction: column;
      max-width: 367px;
      margin-top: 100px;
      border-radius: 20px;
      padding-top: 18px;
      padding-right: 21px;
      padding-bottom: 18px;
      padding-left: 21px;
      background-color: rgba(255, 255, 255, 1);
    }
    .div-7 {
      display: flex;
    }
    @media (max-width: 999px) {
      .div-7 {
        flex-direction: column;
        align-items: stretch;
      }
    }
    .column-3 {
      display: flex;
      flex-direction: column;
      line-height: normal;
      width: calc(102.85% - 0px);
      margin-left: 0px;
    }
    @media (max-width: 999px) {
      .column-3 {
        width: 100%;
      }
    }
    .div-8 {
      display: flex;
      flex-direction: column;
      max-width: 325px;
      justify-content: flex-start;
      align-items: center;
    }
    .div-9 {
      display: flex;
      flex-direction: column;
      max-width: 325px;
      padding-top: 10px;
      padding-right: 10px;
      padding-bottom: 10px;
      padding-left: 10px;
      background-color: rgba(44, 92, 218, 1);
    }
    .div-10 {
      display: flex;
    }
    @media (max-width: 999px) {
      .div-10 {
        flex-direction: column;
        align-items: stretch;
      }
    }
    .column-4 {
      display: flex;
      flex-direction: column;
      line-height: normal;
      width: calc(92.57% - 0px);
      margin-left: 0px;
    }
    @media (max-width: 999px) {
      .column-4 {
        width: 100%;
      }
    }
    .div-11 {
      max-width: 274px;
      color: rgba(255, 255, 255, 1);
      font-size: 30px;
      line-height: 40px;
      letter-spacing: 0%;
      text-align: left;
      font-family: "Inter", sans-serif;
    }
    .div-12 {
      display: flex;
      flex-direction: column;
      max-width: 325px;
      margin-top: 90px;
      padding-top: 10px;
      padding-right: 10px;
      padding-bottom: 10px;
      padding-left: 10px;
      background-color: rgba(44, 92, 218, 1);
    }
    .div-13 {
      display: flex;
    }
    @media (max-width: 999px) {
      .div-13 {
        flex-direction: column;
        align-items: stretch;
      }
    }
    .column-5 {
      display: flex;
      flex-direction: column;
      line-height: normal;
      width: calc(103.04% - 0px);
      margin-left: 0px;
    }
    @media (max-width: 999px) {
      .column-5 {
        width: 100%;
      }
    }
    .div-14 {
      max-width: 305px;
      color: rgba(255, 255, 255, 1);
      font-size: 30px;
      line-height: 40px;
      letter-spacing: 0%;
      text-align: left;
      font-family: "Inter", sans-serif;
    }
    .div-15 {
      display: flex;
      flex-direction: column;
      max-width: 325px;
      margin-top: 90px;
      padding-top: 10px;
      padding-right: 10px;
      padding-bottom: 10px;
      padding-left: 10px;
      background-color: rgba(44, 92, 218, 1);
    }
    .div-16 {
      display: flex;
    }
    @media (max-width: 999px) {
      .div-16 {
        flex-direction: column;
        align-items: stretch;
      }
    }
    .column-6 {
      display: flex;
      flex-direction: column;
      line-height: normal;
      width: calc(103.04% - 0px);
      margin-left: 0px;
    }
    @media (max-width: 999px) {
      .column-6 {
        width: 100%;
      }
    }
    .div-17 {
      max-width: 305px;
      color: rgba(255, 255, 255, 1);
      font-size: 30px;
      line-height: 40px;
      letter-spacing: 0%;
      text-align: left;
      font-family: "Inter", sans-serif;
    }
  `}</style>
    </>
  );
}
