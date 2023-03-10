import React from "react";
import { PANOPTO_REGEX } from "../../../utils/regex";
export function Iframe({ link }: { link: string }) {
  if (link.match(PANOPTO_REGEX)) {
    return (
      <iframe src={link} className="responsive-iframe" allowFullScreen></iframe>
    );
  }
  return (
    <iframe
      src={link}
      className="responsive-iframe"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
}
