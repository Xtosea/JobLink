// utils/routes.js
export const appHashLink = (path) => {
  if (!path) return "#/";
  if (!path.startsWith("/")) path = "/" + path;
  return `/#${path}`;
};

// components/HashLink.js
import React from "react";

export default function HashLink({ to, ...props }) {
  if (!to) to = "/";
  const hashTo = to.startsWith("/#") ? to : `/#${to}`;
  return <a href={hashTo} {...props} />;
}