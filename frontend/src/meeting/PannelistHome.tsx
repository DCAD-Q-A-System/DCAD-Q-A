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
        <style>
            {`
        .div {
            display: flex;
            flex-direction: column;
            max-width: 1900px;
            padding-top: 340px;
            padding-right: 220px;
            padding-bottom: 340px;
            padding-left: 220px;
            background-image: url("../image/Meeting.jpg");
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
        }
        .div-2 {
            display: flex;
        }
        @media (max-width: 999px) {
            .div-2 {
            flex-direction: column;
            align-items: stretch;
            }
        }
        .column {
            display: flex;
            flex-direction: column;
            line-height: normal;
            width: calc(92.42% - 10px);
            margin-left: 0px;
        }
        @media (max-width: 999px) {
            .column {
            width: 100%;
            }
        }
        .div-3 {
            display: flex;
            position: relative;
            min-width: 20px;
            min-height: 20px;
            max-width: 500px;
            width: 68.49%;
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
        }
        .column-2 {
            display: flex;
            flex-direction: column;
            line-height: normal;
            width: calc(92.42% - 10px);
            margin-left: 20px;
        }
        @media (max-width: 999px) {
            .column-2 {
            width: 100%;
            }
        }
        .div-4 {
            display: flex;
            position: relative;
            min-width: 20px;
            min-height: 20px;
            max-width: 500px;
            width: 68.49%;
        }`}
            </style>
      </>
    );
}
  