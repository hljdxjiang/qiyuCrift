const CryptoJS = require("crypto-js");
const base64 = require("./base64");

const ITERATION_COUNT = 256;
const KEY_LENGTH = 256;
const GCM_NONCE_LENGTH = 16;


export const encrypt = (encryptedText: string, password: string, salt: string = '0'): string => {
  var iv = CryptoJS.lib.WordArray.random(GCM_NONCE_LENGTH);
  // 通过 CryptoJS 生成一个密钥
  var key = CryptoJS.PBKDF2(password, salt, { keySize: KEY_LENGTH / 32, iterations: ITERATION_COUNT });
  // 使用 AES 加密
  var encrypted = CryptoJS.AES.encrypt(encryptedText, key, { iv: iv, mode: CryptoJS.mode.CBC });

  var ivString = CryptoJS.enc.Base64.stringify(iv);
  // 返回加密后的结果
  return ivString + encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

export const decrypt = (encryptedText: string, password: string, salt: string = '0'): string => {

  var iv = CryptoJS.enc.Base64.parse(encryptedText.substr(0, 24));
  // 通过 CryptoJS 生成一个密钥
  var key = CryptoJS.PBKDF2(password, salt, { keySize: KEY_LENGTH / 32, iterations: ITERATION_COUNT });
  debugger
  // 使用 AES 解密
  var decrypted = CryptoJS.AES.decrypt(encryptedText.substr(24), key, { iv: iv, mode: CryptoJS.mode.CBC });

  // 返回解密后的明文
  return decrypted.toString(CryptoJS.enc.Utf8);
}
