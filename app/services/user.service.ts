import { getMongoRepository, MongoRepository } from 'typeorm'
import { Service } from 'typedi'
import { User } from 'entities'

@Service()
export class UserService {
  repository: MongoRepository<User>
  
  constructor() {
    this.repository = getMongoRepository(User)
  }
  
  async save(user: User): Promise<User> {
    return this.repository.save(user)
  }

  async remove(user: any): Promise<any> {
    return this.repository.remove(user)
  }

  async count(user: any): Promise<any> {
    return this.repository.count(user)
  }
  
  async find(user: any): Promise<any> {
    return this.repository.find(user)
  }

  async findByIds(user: any): Promise<any> {
    return this.repository.findByIds(user)
  }

  async findOne(user: any): Promise<any> {
    return this.repository.findOne(user)
  }
}
