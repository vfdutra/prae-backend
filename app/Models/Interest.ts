import { BaseModel, column, belongsTo, BelongsTo} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Book from './Book'

export default class Interest extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public book_id: number

  @column()
  public status: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Book)
  public book: BelongsTo<typeof Book>
}
