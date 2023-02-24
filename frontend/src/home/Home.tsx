import "./Home.css";
import { useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { USER_TYPE } from "../utils/enums";
import {AiOutlinePlus} from 'react-icons/ai'
import { BsClockFill } from 'react-icons/bs'

export function Home() {
  const loginData = useAppSelector((state) => state.loginReducer.data);
  const navigate = useNavigate();

  

  return (
    <>
            <div >
                <div className="container">
                    <div className="box" onClick={()=>{navigate('/meeting-list')}}>
                        <BsClockFill className="icon" />
                        <div className="">Current Meeting</div>
                    </div>
                               {loginData &&
            (loginData.type === USER_TYPE.PANELLIST ||
              loginData.type === USER_TYPE.ADMIN) && (
                    <div className="" onClick={()=>{navigate('/create-meeting')}}>
                        <AiOutlinePlus className="icon" />
                        <div className="">Creating Meeting</div>
                    </div>
           )}

                </div>
            </div>
    </>
  );
}
