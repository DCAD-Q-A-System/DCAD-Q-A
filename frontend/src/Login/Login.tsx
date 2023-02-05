import * as React from "react";

export function Login(props: any) {
  return (
    <>
      <div className="div">
        <p>uhhuhuu</p>
        <picture>
          <source
            srcSet="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F21413e06d2da4257a16c62e200685247?format=webp&width=100 100w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F21413e06d2da4257a16c62e200685247?format=webp&width=200 200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F21413e06d2da4257a16c62e200685247?format=webp&width=400 400w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F21413e06d2da4257a16c62e200685247?format=webp&width=800 800w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F21413e06d2da4257a16c62e200685247?format=webp&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F21413e06d2da4257a16c62e200685247?format=webp&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F21413e06d2da4257a16c62e200685247?format=webp&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F21413e06d2da4257a16c62e200685247"
            type="image/webp"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F21413e06d2da4257a16c62e200685247"
            srcSet="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F21413e06d2da4257a16c62e200685247?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F21413e06d2da4257a16c62e200685247?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F21413e06d2da4257a16c62e200685247?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F21413e06d2da4257a16c62e200685247?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F21413e06d2da4257a16c62e200685247?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F21413e06d2da4257a16c62e200685247?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F21413e06d2da4257a16c62e200685247?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F21413e06d2da4257a16c62e200685247"
            className="image"
          />
        </picture>
        <div className="builder-image-sizer image-sizer" />
      </div>
      <style>{`
        .div {
          display: flex;
          position: relative;
          min-width: 20px;
          min-height: 20px;
          max-width: 500px;
          width: 60.06%;
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
          padding-top: 43.1640625%;
          pointer-events: none;
          font-size: 0;
        }
      `}</style>
    </>
  );
}