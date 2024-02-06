export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

/**检查手机号 */
export const verifyPhone = (phone: string): Boolean => {
  var rg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(19[0-9]{1})|(18[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
  if (rg.test(phone)) {
    return true;
  }
  return false;
}

/**检查邮箱 */
export const verifyEmail = (email: string): Boolean => {
  let re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
  if (!re.test(email)) {
    return false
  }
  return true;
}

/**格式化金额 ** 100,000.00 */
export const formatMoney=(money:string|number):string=>{
  if (money) {
    var str = (Math.round(Number(money) * 100) / 100).toFixed(2) + '';
    // var str = Number(data).toFixed(2) + '';
    var intSum = str.substring(0, str.indexOf(".")).replace(/\B(?=(?:\d{3})+$)/g, ',');
    var dot = str.substring(str.length, str.indexOf("."));
    var ret = intSum + dot;
    return ret;
  } else {
    return '0.00'
  }
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

export const generateRandomString=(length: number): string=> {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let salt = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    salt += characters.charAt(randomIndex);
  }
  return salt;
}

export const getRandomStr = (length: number): string => {
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var nonce = '';
  for (var i = 0; i < length; i++) {
    var index = Math.floor(Math.random() * chars.length);
    nonce += chars.charAt(index);
  }
  return nonce;
}

export const generateUUID = (): String => {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  var rnd = 0;
  var r;
  for (var i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid[i] = '-';
    } else if (i === 14) {
      uuid[i] = '4'; // UUID version 4
    } else {
      if (rnd <= 0x02) {
        rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
      }
      r = rnd & 0xf;
      rnd = rnd >> 4;
      uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
    }
  }

  return uuid.join('');
}
