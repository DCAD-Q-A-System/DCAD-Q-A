import React from "react";

export function Iframe({ link }: { link: string }) {
  return (
    <iframe
      src={link}
      width="100%"
      height={"100%"}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
}
