import React from "react";

export function Iframe({ link }: { link: string }) {
  return (
    <iframe
      src={link}
      className="responsive-iframe"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
}
