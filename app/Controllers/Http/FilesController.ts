import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FilesController {
    public async show ({ response, request }: HttpContextContract) {
        const file = request.param('file')
        return response.download(`public/uploads/${file}`)
    }
}
