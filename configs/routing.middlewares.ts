import { KoaMiddlewareInterface, Middleware } from 'routing-controllers'
import { verify } from 'jsonwebtoken'

@Middleware({ type: 'before' })
export class HeaderMiddleware implements KoaMiddlewareInterface {
  async use(context: any, next: (err?: any) => any): Promise<any> {
    context.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH')
    context.set('Access-Control-Allow-Origin', context.request.header.origin || context.request.origin)
    context.set('Access-Control-Allow-Headers', ['content-type'])
    context.set('Access-Control-Allow-Credentials', 'true')
    context.set('Content-Type', 'application/json; charset=utf-8')
    return next()
  }
}

export class TokenMiddleware implements KoaMiddlewareInterface {
  async use(context: any, next: (err?: any) => any): Promise<any> {
    // console.log('111111',context.request.ctx.originalUrl);
    const token = context.request.query.access_token || context.request.body.access_token
    if(context.path!=='/apis/login' && context.path!=='/apis/reg') {
      try {
        const user=await verify(token,'youku1111')
        context.state.userId=user['id']
        return next()
      } catch(err) {
        context.response.status=401
        context.response.body= {
          returnCode:'1',
          errorInfo:'token已过期，请重新登陆！',
        }
      }
    } else {
      return next()
    }
  }
}

@Middleware({ type: 'before' })
export class ErrorDealMiddleware implements KoaMiddlewareInterface {

  async use(context: any, next: (err?: any) => any): Promise<any> {
    try {
      await next()
    } catch(e) {
      if(e.errorInfo) {
        context.response.status=200
      } else {
        context.response.status=500
      }
      context.response.body= {
        returnCode:'1',
        errorInfo:e.errorInfo || '服务器内部错误！',
      }
    }
  }
}
