import { Body, Get, JsonController, Post, QueryParam, UseInterceptor, QueryParams, NotFoundError, State } from 'routing-controllers'
import { Environment } from 'configs/environments'
import { UserService } from '../services'
import { User } from '../entities'
import { sign } from 'jsonwebtoken'
import QcloudSms = require('qcloudsms_js')


@JsonController()
export class UserController {

  constructor(
    private userService: UserService,
  ) {
  }
  @Post('/reg')
  async reg(@Body() body: any): Promise<any> {
    const user = new User()
    const count = await this.userService.count({
      username: body.username,
    })
    if (count) {
      return Promise.reject({
        errorInfo: '账号已存在',
      })
    }
    user.username = body.username
    user.password = body.password
    user.nickname = '用户' + body.username
    const resp = await this.userService.save(user)
  }

  @Post('/getUserInfo')
  async getUserInfo(@State() state: any): Promise<any> {
    try {
      const userInfo = await this.userService.findOne({})
      return {
        data: {
          userInfo: {
            username: userInfo.username,
            nickname: userInfo.nickname || '',
            icon: userInfo.icon || 'https://static.youku.com/lvip/img/avatar/310/33.png',
            address: userInfo.address || '',
            gender: userInfo.gender || '',
          },
        },
      }
    } catch (error) {
      return Promise.reject({
        errorInfo: '未查询到相关用户',
      })
    }
  }

  @Post('/login')
  async login(@Body() body: any, @State() state: any): Promise<any> {
    const countAccount = await this.userService.count({
      username: body.username,
    })
    if (!countAccount) {
      return Promise.reject({
        errorInfo: '账号不存在',
      })
    }


    const account = await this.userService.findOne({
      username: body.username,
      password: body.password,
    })

    if (!account) {
      return Promise.reject({
        errorInfo: '账号密码不正确',
      })
    }
    const token = sign({
      id: account.id,      // user_id
      username: body.username, // user_name
    }, 'youku1111', { // 秘钥
      expiresIn: '1h', // 过期时间
    });

    return {
      access_token: token,
    }
  }

  @Post('/getMsgCode')
  async getMsgCode(@Body() body: any, @State() state: any): Promise<any> {
    // 短信应用SDK AppID
    const appid = 1400258939;  // SDK AppID是1400开头

    // 短信应用SDK AppKey
    const appkey = 'de6cf1783c3c8e2e1d82e62887a873ed';

    // 需要发送短信的手机号码
    const phoneNumbers = body.phone

    // 短信模板ID，需要在短信应用中申请
    const templateId = 421641;  // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请

    // 签名
    const smsSign = '腾讯云';  // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`

    // 实例化QcloudSms
    const qcloudsms = QcloudSms(appid, appkey);

    // 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
    const callback = (err, res, resData) => {


      return {
      }
    }
    const randomMsg = String(Math.floor(Math.random() * 999999)).padStart(6,'0')
    const randomUuid = 'uuid'
    const params = [,'1']

    const ssender = qcloudsms.SmsSingleSender();
    ssender.sendWithParam(86, phoneNumbers, templateId,
      params, smsSign, "", "", callback).then()  // 签名参数未提供或者为空时，会使用默认签名发送短信
  }
}
