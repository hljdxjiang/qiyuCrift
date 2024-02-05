import { generateRandomString } from "./util";

const aes = require("./aes");

export const encrypt = (value: string): string => {
  const key = aes.generateKey();
  const random = Math.floor(Math.random() * (9 - 5 + 1)) + 5;
  const salt = generateRandomString(random);
  const k1 = buildKeyWithSalt(key, salt);
  const k2 = aes.encrypt(value, key, salt);
  const map = {
    k1: k1,
    k2: k2
  };
  return JSON.stringify(map);
}

export const decrypt = (value: string): string => {
  const map = JSON.parse(value);
  if (map) {
    const k1 = map.k1;
    const k2 = map.k2;
    const val = extractOriginalValues(k1);
    if (val) {
      return aes.decrypt(k2, val[0], val[1]);
    }
  }
  return value;
}

const buildKeyWithSalt = (pwd: string, salt: string): string => {
  const random = salt.length;
  return String(random)+pwd.substring(0, random) + salt + pwd.substring(random);
}

const extractOriginalValues = (key: string): string[] | null => {
  if (!key) {
    return null;
  }
  const random = parseInt(key.charAt(0));
  const base64Key = key.substring(1);
  const pwd = base64Key.substring(0, random) + base64Key.substring(random + random);
  const salt = base64Key.substring(random, random + random);
  return [pwd, salt];
}