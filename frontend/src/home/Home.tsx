import "./Home.css"
import { AiOutlinePlus } from 'react-icons/ai'
import { BsClockFill } from 'react-icons/bs'
import { useAppSelector } from "../store/hooks";
import { USER_TYPE } from "../utils/enums";
import { useNavigate } from "react-router-dom";


export function Home() {
    const loginData = useAppSelector((state) => state.loginReducer.data);
    const navigate = useNavigate()


    return (
        <>
            {/* {loginData && loginData.type !== USER_TYPE.GUEST ? */}
            <div >
                <div className="container">
                    <div className="container-1" onClick={()=>{navigate("/meeting-list")}}>
                        <BsClockFill className="icon" />
                        <div className="word">Current Meeting</div>
                    </div>
                    {loginData?.type !== USER_TYPE.STUDENT &&
                        <div className="container-1" onClick={()=>{navigate("/create-meeting")}}>
                            <AiOutlinePlus className="icon" />
                            <div className="word">Creating Meeting</div>
                        </div>
                    }
                </div>
            </div>
            {/* :
                <p>not available</p>

            } */}
        </>
    );
}
