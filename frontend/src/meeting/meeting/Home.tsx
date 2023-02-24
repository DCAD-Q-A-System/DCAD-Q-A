import "./Home.css"
import { AiOutlinePlus } from 'react-icons/ai'
import { BsClockFill } from 'react-icons/bs'
import { MeetingDetails } from "./MeetingDetails";
import { useAppSelector } from "../../store/hooks";
import { USER_TYPE } from "../../utils/enums";


export function Home() {
    const loginData = useAppSelector((state) => state.loginReducer.data);

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
