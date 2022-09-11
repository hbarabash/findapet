/*
 * General utils for managing cookies in Typescript.
 */
export function setCookie(name: string, description: string, img: string) {
  const date = new Date();
  const id = description;
  const image = img;

  // Set it expire in 7 days
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);

  // Set it
  document.cookie =
    name +
    "=" +
    id +
    "*" +
    image +
    "; expires=" +
    date.toUTCString() +
    "; path=/";
}

export function getCookie(name: string) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");

  if (parts.length === 2) {
    return parts
      .pop()
      ?.split(";")
      .shift();
  }
  return null;
}

export function isCookie(name: string) {
  const value = "; " + document.cookie;
  const parts = value.split(name);
  console.log(name + parts.length);
  console.log(parts);
  if (parts.length === 2) {
    return true;
  }
  return false;
}

export function getAllCookies() {
  const value = document.cookie;
  const cookies = value.split(";");
  return cookies;
}

export function deleteCookie(name: string) {
  const date = new Date();

  // Set it expire in -1 days
  date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);

  // Set it
  document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
}
