import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setData } from "../store/loginSlice";

export function Login2() {
  const dispatch = useAppDispatch();
  const loginData = useAppSelector((state) => state.loginReducer.data);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Hash function implement later
    const res = await fetch("http://127.0.0.1:8080/login", {
      method:"POST",
      body:JSON.stringify({username,password})
    })
    const jwt = await res.json()
    dispatch(setData({data:jwt}));
  }
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
                      srcSet="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F26a67cd96e9a4fdcab5916c7b4029306?format=webp&width=100 100w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F26a67cd96e9a4fdcab5916c7b4029306?format=webp&width=200 200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F26a67cd96e9a4fdcab5916c7b4029306?format=webp&width=400 400w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F26a67cd96e9a4fdcab5916c7b4029306?format=webp&width=800 800w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F26a67cd96e9a4fdcab5916c7b4029306?format=webp&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F26a67cd96e9a4fdcab5916c7b4029306?format=webp&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F26a67cd96e9a4fdcab5916c7b4029306?format=webp&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F26a67cd96e9a4fdcab5916c7b4029306"
                      type="image/webp"
                    />
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F26a67cd96e9a4fdcab5916c7b4029306"
                      srcSet="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F26a67cd96e9a4fdcab5916c7b4029306?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F26a67cd96e9a4fdcab5916c7b4029306?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F26a67cd96e9a4fdcab5916c7b4029306?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F26a67cd96e9a4fdcab5916c7b4029306?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F26a67cd96e9a4fdcab5916c7b4029306?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F26a67cd96e9a4fdcab5916c7b4029306?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F26a67cd96e9a4fdcab5916c7b4029306?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F26a67cd96e9a4fdcab5916c7b4029306"
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
          <form onSubmit={(e)=>handleSubmit} className="div-6">
            <div className="builder-columns div-7">
              <div className="builder-column column-3">
                <div className="div-8">
                  <div className="div-9">
                    <label className="div-10">Username:</label>
                    <input type="text" onChange={(e)=>setPassword(e.target.value)} className="div-11"/>
                  </div>
                  <div className="div-12">
                    <label className="div-13">Password:</label>
                    <input type="password" onChange={(e)=>setPassword(e.target.value)} className="div-14"/>
                  </div>
                  <button type="submit" className="div-15">Login</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <style>{`
    .div {
      display: flex;
      flex-direction: column;
      max-width: 1920px;
      justify-content: flex-start;
      align-items: flex-start;
      padding-top: 58px;
      padding-right: 105px;
      padding-bottom: 58px;
      padding-left: 105px;
      background-image: url("https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F5f90b93676484097bded2c2fba3f9c1f");
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
      max-width: 501px;
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
      width: calc(102% - 0px);
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
      max-width: 459px;
      justify-content: flex-start;
      align-items: center;
    }
    .div-9 {
      display: flex;
      flex-direction: column;
      max-width: 459px;
      justify-content: flex-start;
      align-items: flex-start;
    }
    .div-10 {
      max-width: 155px;
      color: rgba(0, 0, 0, 1);
      font-size: 30px;
      letter-spacing: 0%;
      text-align: left;
      font-family: "Inter", sans-serif;
    }
    .div-11 {
      display: flex;
      max-width: 459px;
      height: 72px;
      width: 459px;
      margin-top: 20px;
      border-radius: 10px;
      border-color: rgba(0, 0, 0, 1);
      border-width: 2px;
      border-style: solid;
      background-color: rgba(217, 217, 217, 1);
    }
    .div-12 {
      display: flex;
      flex-direction: column;
      max-width: 459px;
      justify-content: flex-start;
      align-items: flex-start;
      margin-top: 90px;
    }
    .div-13 {
      max-width: 149px;
      color: rgba(0, 0, 0, 1);
      font-size: 30px;
      letter-spacing: 0%;
      text-align: left;
      font-family: "Inter", sans-serif;
    }
    .div-14 {
      display: flex;
      max-width: 459px;
      height: 72px;
      width: 459px;
      margin-top: 20px;
      border-radius: 10px;
      border-color: rgba(0, 0, 0, 1);
      border-width: 2px;
      border-style: solid;
      background-color: rgba(217, 217, 217, 1);
    }
    .div-15 {
      display: flex;
      flex-direction: row;
      max-width: 79px;
      justify-content: flex-start;
      align-items: flex-start;
      margin-top: 90px;
      padding-top: 10px;
      padding-right: 10px;
      padding-bottom: 10px;
      padding-left: 10px;
      background-color: rgba(44, 92, 218, 1);
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
