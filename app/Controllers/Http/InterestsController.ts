import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class InterestsController {
    public async index ({ response }: HttpContextContract) {
        return response.ok({message: 'Interest Controller'})
    }
}
