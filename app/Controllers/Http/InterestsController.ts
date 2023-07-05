import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Interest from 'App/Models/Interest'
import User from 'App/Models/User'
import Book from 'App/Models/Book'
import Database from '@ioc:Adonis/Lucid/Database'

export default class InterestsController {
    public async create ({ request, response }: HttpContextContract) {
        const { user_id, book_id, status } = request.all()
        const user = await User.findOrFail(user_id)
        const book = await Book.findOrFail(book_id)

        if(!user){
            return response.badRequest({ message: 'User not found' })
        }

        if(!book){
            return response.badRequest({ message: 'Book not found' })
        }

        const interest = await Interest.create({ user_id: user.id, book_id: book.id, status })
        return response.created({ interest })
    }   

    public async update ({ params, request, response }: HttpContextContract) {
        const interest = await Interest.findOrFail(params.id)
        const status = request.only(['status'])
        interest.status = status.status        
        await interest.save()

        if(status.status == 1 || status.status == 2){
            const book = await Book.findOrFail(interest.book_id)
            book.quantity = book.quantity - 1
            await book.save()

            const interests = await Database.query().select('*').from('interests').where('book_id', book.id).andWhere('status', 0)

            if(book.quantity == 0){
                interests.forEach(async (index) => {
                    index.status = 5
                    await index.save()
                })           
            }
        }

        return response.ok({ interest })
    }

    public async destroy ({ params, response }: HttpContextContract) {
        const interest = await Interest.findOrFail(params.id)
        await interest.delete()
        return response.noContent()
    }

    public async findAll ({ response }: HttpContextContract) {
        const interests = await Database.query()
                                        .select('interests.id',
                                                'interests.status',
                                                'interests.user_id',
                                                'interests.book_id',
                                                'users.name as user_name', 
                                                'users.course as user_course',
                                                'books.title as book_title',
                                                'books.author as book_author',
                                                'books.category as book_category',
                                                'books.quantity as book_quantity',
                                                'books.cover')
                                        .from('interests')
                                        .innerJoin('users', 'interests.user_id', 'users.id')
                                        .innerJoin('books', 'interests.book_id', 'books.id')

        return response.ok({ interests })
    }

    public async findOne ({ params, response }: HttpContextContract) {
        const interest = await Interest.findOrFail(params.id)
        return response.ok({ interest })
    }

    public async findByUser ({ params, response }: HttpContextContract) {
        const user = await User.findOrFail(params.id)
        const interests = await user.related('interests').query()
        return response.ok({ user, interests })
    }

    public async findByBook ({ params, response }: HttpContextContract) {
        const book = await Book.findOrFail(params.id)
        const interests = await book.related('interests').query()
        return response.ok({ book, interests })
    }
}
