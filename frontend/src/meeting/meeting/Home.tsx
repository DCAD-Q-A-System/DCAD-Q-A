import "./Home.css"
import { AiOutlinePlus } from 'react-icons/ai'
import { BsClockFill } from 'react-icons/bs'
import { CreateMeeting, } from "./CreateMeeting";
import { useAppSelector } from "../../store/hooks";
import { USER_TYPE } from "../../utils/enums";
import { useNavigate } from "react-router-dom";
import { CREATE_MEETING } from "../../utils/paths";


export function Home() {
    const loginData = useAppSelector((state) => state.loginReducer.data);
    const navigate = useNavigate()


    return (
        <>
            {/* {loginData && loginData.type !== USER_TYPE.GUEST ? */}
            <div >
                <div className="container">
                    <div className="box" onClick={() => { }}>
                        <BsClockFill className="icon" />
                        <div className="word">Current Meeting</div>
                    </div>
                    {loginData?.type !== USER_TYPE.STUDENT &&
                        <div className="box" onClick={() => { }}>
                            <AiOutlinePlus className="icon" />
                            <div className="word" onClick={()=>{navigate("/create-meeting")}}>Creating Meeting</div>
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
