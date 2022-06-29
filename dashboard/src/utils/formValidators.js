export const phone = (val, callback) => {
  if(!(/^1[3456789]\d{9}$/.test(val))) {
    callback(new Error('手机号码格式有误'))
  } else {
    callback()
  }
}

export const email = (val, callback) => {
  if(!/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(val)) {
    callback(new Error('邮箱地址格式错误'))
  } else {
    callback()
  }
}
