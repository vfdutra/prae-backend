import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'
//import Interest from 'App/Models/Interest'

export default class BooksController {
    public async index ({ response }: HttpContextContract) {
        return response.ok({message: 'Books Controller'})
    }

    public async create ({ response, request }: HttpContextContract) {
        const bookPayload = request.only(['title', 'author', 'cover', 'category', 'quantity'])
        const book = await Book.create(bookPayload)
        return response.created(book)
    }

    public async update ({ request, response }: HttpContextContract){
        const book = await Book.findByOrFail('id', request.param('id'))
        const bookPayload = request.only(['title', 'author', 'cover', 'category', 'quantity'])
        book.merge(bookPayload)
        await book.save()
        return response.ok({book})
    }

    public async destroy ({ request, response }: HttpContextContract){
        const book = await Book.findByOrFail('id', request.param('id'))
        await book.delete()
        return response.ok({book})
    }

    public async show ({ response, request }: HttpContextContract){
        const book = await Book.findByOrFail('id', request.param('id'))
        return response.ok({book})
    }
    
    public async showAll ({ response }: HttpContextContract){
        const books = await Book.all()
        return response.ok({books})
    }
}
