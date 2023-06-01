import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Interest from 'App/Models/Interest'
import User from 'App/Models/User'
import Book from 'App/Models/Book'

export default class InterestsController {
    public async store ({ request, response }: HttpContextContract) {
        const { user_id, book_id } = request.all()
        const user = await User.findOrFail(user_id)
        const book = await Book.findOrFail(book_id)
        const interest = await Interest.create({ user_id: user.id, book_id: book.id })
        return response.created({ interest })
    }   

    public async update ({ params, request, response }: HttpContextContract) {
        const interest = await Interest.findOrFail(params.id)
        const { user_id, book_id } = request.all()
        const user = await User.findOrFail(user_id)
        const book = await Book.findOrFail(book_id)
        interest.merge({ user_id: user.id, book_id: book.id })
        await interest.save()
        return response.ok({ interest })
    }

    public async destroy ({ params, response }: HttpContextContract) {
        const interest = await Interest.findOrFail(params.id)
        await interest.delete()
        return response.noContent()
    }

    public async findAll ({ response }: HttpContextContract) {
        const interests = await Interest.all()
        return response.ok({ interests })
    }

    public async findOne ({ params, response }: HttpContextContract) {
        const interest = await Interest.findOrFail(params.id)
        return response.ok({ interest })
    }
}
