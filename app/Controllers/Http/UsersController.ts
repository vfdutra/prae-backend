import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
    public async index ({ response }: HttpContextContract) {
        return response.ok({message: 'Users Controller'})
    }

    public async create ({ response, request }: HttpContextContract) {
        const userPayload = request.only(['name', 'course', 'type'])

        const user = await User.create(userPayload)

        return response.created(user)
    }

    public async update ({ request, response }: HttpContextContract){
        const user = await User.findByOrFail('id', request.param('id'))

        const userPayload = request.only(['name', 'course', 'type'])

        user.merge(userPayload)
        await user.save()

        return response.ok({user})
    }

    public async destroy ({ request, response }: HttpContextContract){
        const user = await User.findByOrFail('id', request.param('id'))
        await user.delete()

        return response.ok({user})
    }

    public async show ({ response, request }: HttpContextContract){
        const user = await User.findByOrFail('id', request.param('id'))

        return response.ok({user})
    }
}
