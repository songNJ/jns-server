import QcloudSms = require('qcloudsms_js')

export default class MsgCode {
  // 需要发送短信的手机号码
  phoneNumbers = 1;
  // 短信模板ID，需要在短信应用中申请
  templateId = 421641;  // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请
  smsSign = '腾讯云';  // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`
  randomMsg = String(Math.floor(Math.random() * 999999)).padStart(6, '0')
  private appid = 1400258939;  // SDK AppID是1400开头
  // 短信应用SDK AppKey
  private appkey = 'de6cf1783c3c8e2e1d82e62887a873ed';
  loginMsg = () => {
    const ssender = QcloudSms(this.appid, this.appkey).SmsSingleSender();
    const params = [this.randomMsg, '登录', '5']
    return new Promise((resolve, reject) => {
        ssender.sendWithParam(86, this.phoneNumbers, this.templateId,
        params, this.smsSign, '', '', (err: any, res: any, resData: any) => {
          if (err) {
            reject(err)
          } else if (resData) {
            resolve(resData)
          } else {
            reject(res)
          }
        })
    })
  }
}
