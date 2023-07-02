import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
// import Hash from '@ioc:Adonis/Core/Hash'

export default class SessionsController {
  public async store({ auth, request, response }: HttpContextContract) {
    const email = request.input('email');
    const password = request.input('password');
  
    try {
      const token = await auth.use('api').attempt(email, password);
      const user = await User.query().where('email', email).firstOrFail();
      return response.ok({ token, user });
    } catch (error) {
      return response.unauthorized('Invalid credentials');
    }
  }  
}