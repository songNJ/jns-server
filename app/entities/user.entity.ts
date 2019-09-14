import { MinLength, IsNotEmpty } from 'class-validator'
import {
  Entity, BaseEntity, PrimaryGeneratedColumn,ObjectIdColumn, CreateDateColumn, UpdateDateColumn,Column,
} from 'typeorm'

/**
 * All validator can be applied to all controllers.
 * Reference document: https://github.com/typestack/class-validator
 * How to auto validaing? see: https://github.com/typestack/routing-controllers#auto-validating-action-params
 */

@Entity('user')
export class User extends BaseEntity {
  
  @ObjectIdColumn()
  id: string
  
  @Column()
  @MinLength(3, { message: 'username too short' })
  @IsNotEmpty({ message: 'must include username' })
  username: string

  @Column()
  @MinLength(3)
  @IsNotEmpty({ message: 'must include password' })
  password: string

  @Column()
  nickname:string

  @Column()
  icon:string

  @Column()
  address:string

  @Column()
  gender:string
}
