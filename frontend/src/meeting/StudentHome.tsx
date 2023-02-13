import "./StudentHome.css"

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
                src="../image/current_meeting.png"
                className="image"
                />
            </picture>
            <div className="builder-image-sizer image-sizer"></div>
            </div>
        </div>
      </>
    );
  }
  