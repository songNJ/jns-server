import { Body, Get, JsonController, Post, QueryParam, UseInterceptor, QueryParams ,NotFoundError,State } from 'routing-controllers'
import { Environment } from 'configs/environments'
import { UserService } from '../services'
import { User } from '../entities'
import { sign } from 'jsonwebtoken'

import superagent = require('superagent');  
import cheerio = require('cheerio')

@JsonController()
export class ListController {
  @Get('/getList')
  async getList(@QueryParams() params: any): Promise<any> {
    cheerio
  }
}
