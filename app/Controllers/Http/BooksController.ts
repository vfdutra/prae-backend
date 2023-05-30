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

        if(!book){
            return response.notFound({message: 'Book not found'})
        }

        book.merge(bookPayload)
        await book.save()
        return response.ok({book})
    }

    public async destroy ({ request, response }: HttpContextContract){
        const book = await Book.findByOrFail('id', request.param('id'))

        if(!book){
            return response.notFound({message: 'Book not found'})
        }

        await book.delete()
        return response.ok({book})
    }

    public async findOne ({ response, request }: HttpContextContract){
        const book = await Book.findByOrFail('id', request.param('id'))

        if(!book){
            return response.notFound({message: 'Book not found'})
        }

        return response.ok({book})
    }
    
    public async findAll ({ response }: HttpContextContract){
        const books = await Book.all()
        return response.ok({books})
    }
}
