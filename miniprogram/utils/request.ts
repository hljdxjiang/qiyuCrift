import { generateUUID, getRandomStr } from "./util"
const CryptoJS = require('crypto-js')

export const fetch = (method: String, transcode: String, param: String, retType?: number) => {
  if (method.toUpperCase() === "POST") {
    return post(transcode, param);
  } else {
    return get(transcode);
  }
}

export const post = (transcode: String, param: String, reqHeader?: Map<String, Object>) => {
  return new Promise((resolve, reject) => {
    let url = "";//补充url
    let userId = getApp().globalData.userInfo.OPENID;
    let requestId = getRandomStr(16);
    let timestamp = new Date().getTime();
    let version = reqHeader && reqHeader.get("version") ? reqHeader.get("version") : "v1.0.0";
    let nonce = getRandomStr(16);
    let signture = getSign(new Array(userId, requestId, timestamp, version, nonce));
    var headerData = {
      userId: userId,
      transCode: transcode,
      timeStamp: timestamp,
      requestId: requestId,
      phoneType: getApp().globalData.systemInfo.platform,
      imei: '',
      mac: '',
      channelNo: 'Minip',
      ip: '',
      uuid: generateUUID(),
      signature: signture,
      version: version,
      length: '',
      nonce: nonce,
    }
    const postParams = {
      header: headerData,
      body: param
    };
    let header = {}
    let isLogin = getApp().globalData.isLogin;
    if (isLogin) {
      var cookiestr = "SESSION=" + getApp().globalData.accountInfo.SESSION_ID;
      header = {
        'Content-Type': 'application/json',
        'Cookie': cookiestr,
      }
    } else {
      header = {
        'Content-Type': 'application/json',
      }
    }
    wx.request({
      url: url,
      method: "POST",
      header: header,
      data: postParams,
      success: (response => {
        resolve(response);
      }),
      fail: (error => {
        var statusCode = error && error.response && error.response.status ? error.response.status : '';
        let errorTip = '服务器连接失败' + statusCode;
        let errResult = { SYSHEAD: { RSP_MSG: errorTip, RSP_CODE: statusCode } }
        console.log(errorTip)
        reject(errResult);
      })
    })
  })
}

export const get = (transcode: String) => {
  let url = "" + transcode;
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: 'GET',
      success: response => {
        resolve(response);
      },
      fail: error => {
        reject(error);
      }
    })
  })
}

const getSign = (list: string[]): string => {
  list = list.filter((item) => item !== null);
  list.sort();
  const concatenatedString = list.join('');
  const sha1Hash = CryptoJS.SHA1(concatenatedString).toString(CryptoJS.enc.Hex).toUpperCase();
  return sha1Hash;
}