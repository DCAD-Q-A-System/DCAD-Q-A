import "./Home.css";
import { useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { USER_TYPE } from "../utils/enums";
import {AiOutlinePlus} from 'react-icons/ai'
import { BsClockFill } from 'react-icons/bs'

export function Home() {
  const loginData = useAppSelector((state) => state.loginReducer.data);
  const navigate = useNavigate();

  window.addEventListener('resize', function () {
    const background = document.getElementById('background-image');
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (background !== null) {
        background.style.width = `${width}px`;
        background.style.height = `${height}px`;
    }

});

  return (
    <>
            <div id="background-image" >
                <div className="container">
                    <div className="box" onClick={()=>{navigate('/meeting-list')}}>
                        <BsClockFill className="icon" />
                        <div className="word">Current Meeting</div>
                    </div>
                               {loginData &&
            (loginData.type === USER_TYPE.PANELLIST ||
              loginData.type === USER_TYPE.ADMIN) && (
                    <div className="box" onClick={()=>{navigate('/meeting-detail')}}>
                        <AiOutlinePlus className="icon" />
                        <div className="word">Creating Meeting</div>
                    </div>
           )}

                </div>
            </div>
    </>
  );
}
