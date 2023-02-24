import './MeetingList.css'
import 'bootstrap'
import { useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom'
import { EDIT_MEETING } from '../../utils/paths';
import { JoinMeeting } from '../components/join_meeting/JoinMeeting';
import { Login } from '../../Login/Login';
import { USER_TYPE } from '../../utils/enums';


export function MeetingList() {
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
      {/* {loginData && loginData.type !== USER_TYPE.GUEST ? */}
        <div id="background-image" >
          <div className="Container">
            <div className='box'>
              <div className='box1'>
                <div className='box2'>
                  <p className='content'>
                    ID : 123456789
                  </p>
                </div>
                <JoinMeeting meetingId={''} userId={''} />
                <button className='edit'>
                  <p className='content-1'>
                    Edit
                  </p>
                </button>
              </div>
              <div className='box1'>
                <div className='box2'>
                  <p className='content'>
                    ID : 987654321
                  </p>
                </div>
                <JoinMeeting meetingId={''} userId={''} />
              {/* {loginData && loginData.type !== USER_TYPE.STUDENT && */}
                  <button className='edit' onClick={() => navigate('/edit-meeting')}>
                    <p className='content-1'>
                      Edit
                    </p>
                  </button>
                {/* } */}
              </div>
            </div>

          </div>
        </div> 
        {/* // : <p>No login details</p> */}
      {/* // } */}
      </>

  )
}




