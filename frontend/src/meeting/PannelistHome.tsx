import "./PanellistHome.css"

export function PannelistHome() {
    return (
        <>
        <div className="div">
        <div className="builder-columns div-2">
            <div className="builder-column column">
            <div className="div-3">
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
            <div className="builder-column column-2">
            <div className="div-4">
                <picture>
                <source
                    type="image/webp"
                />
                <img
                    loading="lazy"
                    src="../image/create_meeting.png"
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
  