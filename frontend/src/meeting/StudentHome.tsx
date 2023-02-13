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
        <style>
            {`
            .div {
            display: flex;
            flex-direction: column;
            max-width: 1920px;
            justify-content: flex-start;
            align-items: flex-start;
            padding-top: 340px;
            padding-right: 710px;
            padding-bottom: 340px;
            padding-left: 710px;
            background-image: url("../image/Meeting.jpg");
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            }
            .div-2 {
            display: flex;
            align-self: stretch;
            position: relative;
            min-width: 20px;
            min-height: 20px;
            max-width: 500px;
            }
            .image {
            object-fit: cover;
            object-position: center;
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            }
            .image-sizer {
            width: 100%;
            padding-top: 80%;
            pointer-events: none;
            font-size: 0;
            }`}
        </style>
      </>
    );
  }
  