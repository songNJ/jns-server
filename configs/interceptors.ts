import { InterceptorInterface, Action, Interceptor } from 'routing-controllers'

@Interceptor()
export class AutoAssignJSONInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any): any {
    // if (typeof content === 'object') return JSON.stringify(Object.assign({ message: 'ok' }, content))
    // return JSON.stringify({ message: content })
    if(content.returnCode==='1') {
      return JSON.stringify({
        returnCode:'1',
        errorInfo:content.errorInfo || '系统内部错误',
      })
    } else {
      return JSON.stringify({
        returnCode:'0',
        ...content.data,
      })
    }
  }
}
