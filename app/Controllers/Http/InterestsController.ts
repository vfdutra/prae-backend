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

        const interestExists = await Interest.query().where('book_id', book.id).first()

        if (interestExists) {
            return response.badRequest({ error: 'This book already has an interest' })
        } else {            
            const interest = await Interest.create({ user_id: user.id, book_id: book.id, status })
            return response.created({ interest })
        }
    }   

    public async update ({ params, request, response }: HttpContextContract) {
        const interest = await Interest.findOrFail(params.id)
        const status = request.only(['status'])
        interest.status = status.status        
        await interest.save()
        return response.ok({ interest })
    }

    public async destroy ({ params, response }: HttpContextContract) {
        const interest = await Interest.findOrFail(params.id)
        await interest.delete()
        return response.noContent()
    }

    public async findAll ({ response }: HttpContextContract) {
        //Return all interets with the data of the users and the books on query builder
        const interests = await Database.query()
                                        .select('interests.id',
                                                'interests.status',
                                                'users.name as user_name', 
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
