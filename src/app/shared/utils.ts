import { Message, sha256 as toSha256 } from 'js-sha256';

export function getCookie(cname: string): any {
    const name = cname + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return undefined;
  }

export function sha256(input: string): any {
  return toSha256(input);
}
export const capitalize = (s: string) => {
  return typeof s === 'string' ? s.charAt(0).toUpperCase() + s.slice(1) : '';
};