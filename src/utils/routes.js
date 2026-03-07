// utils/routes.js

export const appHashLink = (path) => {
  if (!path) return "#/";
  if (!path.startsWith("/")) path = "/" + path;
  return `/#${path}`;
};