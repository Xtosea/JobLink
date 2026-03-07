import React from "react";
import { appHashLink } from "../utils/routes";

export default function HashLink({ to, children, ...props }) {
  const url = appHashLink(to);
  return (
    <a href={url} {...props}>
      {children}
    </a>
  );
}