import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Book from 'App/Models/Book'
import fs from 'fs/promises'
import sharp from 'sharp'
//import Interest from 'App/Models/Interest'

export default class BooksController {
    public async index ({ response }: HttpContextContract) {
        return response.ok({message: 'Books Controller'})
    }

    public async create({ response, request }: HttpContextContract) {
        const bookPayload = request.only(['title', 'cover', 'author', 'category', 'quantity']);

        const interest = request.only(['interestId']);        
      
        const imagem = request.file('cover', {
          size: '2mb',
          extnames: ['jpg', 'png', 'jpeg'],
        });
      
        if (imagem) {
          const tmpPath = imagem.tmpPath!;
          const imageData = await fs.readFile(tmpPath);
          const resizedImageData = await sharp(imageData)
            .resize(200, 300) // Largura e altura desejadas
            .toBuffer();
          const hexString = '\\x' + resizedImageData.toString('hex');
          bookPayload.cover = hexString;
        } else {
            bookPayload.cover = null;
        }
      
        await Database.insertQuery().table('books').insert({
          title: bookPayload.title,
          author: bookPayload.author,
          cover: bookPayload.cover  ,
          category: bookPayload.category,
          quantity: bookPayload.quantity,
        });

        const book = await Book.query().orderBy('id', 'desc').first();

        if(interest.interestId){
            await Database.insertQuery().table('interest_books').insert({
                interest_id: interest.interestId,
                book_id: book?.id,                
            });
        }
      
       return response.created({ book });
    }      

    public async update ({ request, response }: HttpContextContract){
        const book = await Book.findByOrFail('id', request.param('id'))
        const bookPayload = request.only(['title', 'cover', 'author', 'category', 'quantity'])

        const imagem = request.file('cover', {
            size: '2mb',
            extnames: ['jpg', 'png', 'jpeg'],
        });

        if (imagem) {
            const tmpPath = imagem.tmpPath!;
            const imageData = await fs.readFile(tmpPath);
            const resizedImageData = await sharp(imageData)
            .resize(200, 300) // Largura e altura desejadas
            .toBuffer();
            const hexString = '\\x' + resizedImageData.toString('hex');
            bookPayload.cover = hexString;
          }

        if(!book){
            return response.notFound({message: 'Book not found'})
        }       

        await Database
                .from('books')
                .update({
                    title: bookPayload.title? bookPayload.title : book.title,
                    author: bookPayload.author? bookPayload.author : book.author,
                    cover: bookPayload.cover? bookPayload.cover : book.cover,
                    category: bookPayload.category? bookPayload.category : book.category,
                    quantity: bookPayload.quantity? bookPayload.quantity : book.quantity,                    
                }) 
                .where('id', request.param('id'))                   

        return response.ok({book: await Book.findByOrFail('id', request.param('id'))})
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
