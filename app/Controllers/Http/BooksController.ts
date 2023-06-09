import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Book from 'App/Models/Book'
//import Interest from 'App/Models/Interest'

export default class BooksController {
    public async index ({ response }: HttpContextContract) {
        return response.ok({message: 'Books Controller'})
    }

    public async create ({ response, request }: HttpContextContract) {
        const bookPayload = request.only(['title', 'author', 'category', 'quantity'])

        const imagem = request.file('cover', {
            size: '2mb',
            extnames: ['jpg', 'png', 'jpeg'],            
        });

        await imagem.move(`public/uploads`)              

        const imagemData = {
            path: `${imagem.fileName}`,
        }     

        await Database
                .insertQuery()
                .table('books')
                .insert({
                    title: bookPayload.title,
                    author: bookPayload.author,
                    cover: imagemData.path,
                    category: bookPayload.category,
                    quantity: bookPayload.quantity,
                })

        return response.created({ Book: await Book.query().orderBy('id', 'desc').first()})
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
