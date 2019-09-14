import { Body, Get, JsonController, Post, QueryParam, UseInterceptor, QueryParams ,NotFoundError,State } from 'routing-controllers'
import { Environment } from 'configs/environments'
import { UserService } from '../services'
import { User } from '../entities'
import { sign } from 'jsonwebtoken'


@JsonController()
export class UserController {
  
  constructor(
    private userService: UserService,
  ) {
  }
  @Get('/reg')
  async reg(@QueryParams() params: any): Promise<any> {
    const user = new User()
    const count = await this.userService.count({
      username:params.username,
    })
    if(count) {
      return {
        returnCode:'1',
        errorInfo:'账号已存在',
      }
    }
    user.username = params.username
    user.password = params.password
    user.nickname = '用户' + params.username
    const resp = await this.userService.save(user)
    return {}
  }

  @Post('/getUserInfo')
  async getUserInfo(@State() state: any): Promise<any> {
    try {
      const userInfo = await this.userService.findOne({})
      return {
        data:{
          userInfo:{
            username:userInfo.username,
            nickname:userInfo.nickname||'',
            icon:userInfo.icon||'https://static.youku.com/lvip/img/avatar/310/33.png',
            address:userInfo.address||'',
            gender:userInfo.gender||'',
          },
        },
      }
    } catch (error) {
      return {
        returnCode:'1',
        errorInfo:'未查询到相关用户',
      }
    }
  }

  @Get('/login')
  async login(@QueryParams() params: any,@State() state:any): Promise<any> {
    const countAccount = await this.userService.count({
      username:params.username,
    })
    if(!countAccount) {
      return {
        returnCode:'1',
        errorInfo:'账号不存在',
      }
    }
    console.log('lalallalalalalala');
    
    const account = await this.userService.findOne({
      username:params.username,
      password:params.password,
    })
    
    if(!account) {
      return {
        returnCode:'1',
        errorInfo:'账号密码不正确',
      }
    }
    const token = sign({       
      id: account.id,      // user_id
      username: params.username, // user_name
    }, 'youku1111', { // 秘钥
        expiresIn: '1h', // 过期时间
    });
    
    return {
      data:{
        access_token:token,
      },
    }
  }
  
  // If your need to use database, please set useMongoDB(in configs/customs.ts) to true.
  // @Post('/sessions')
  // async create(@Body() session: Session): Promise<any> {
  //   const created = await this.sessionsService.create(session)
  //   return { created }
  // }
}
