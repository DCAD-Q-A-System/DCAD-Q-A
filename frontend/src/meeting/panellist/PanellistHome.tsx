import "./PanellistHome.css"
import current from "../image/current_meeting.png"
import create from "../image/create_meeting.png"
import meeting from '../../image/Meeting.jpg'

export function PanellistHome() {
    return (
        <>
        <div className="div" style={
                  {
                    backgroundImage:`url(${meeting})`
                  }
              }>
        <div className="builder-columns div-2">
            <div className="builder-column column">
            <div className="div-3">
                <picture>
                <img
                    loading="lazy"
                    src={current}
                    className="image"
                />
                </picture>
                <div className="builder-image-sizer image-sizer"></div>
            </div>
            </div>
            <div className="builder-column column-2">
            <div className="div-4">
                <picture>
                <img
                    loading="lazy"
                    src={create}
                    className="image"
                />
                </picture>
                <div className="builder-image-sizer image-sizer"></div>
            </div>
            </div>
        </div>
        </div>
      </>
    );
}
  