import "./StudentHome.css"
import current from "../image/current_meeting.png"

export function StudentHome() {
    return (
      <>
        <div className="div">
            <div className="div-2">
            <picture>
                <source
                type="image/webp"
                />
                <img
                loading="lazy"
                src={current}
                className="image"
                />
            </picture>
            <div className="builder-image-sizer image-sizer"></div>
            </div>
        </div>
      </>
    );
  }
  