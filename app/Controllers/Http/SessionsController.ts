import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class SessionsController {
  public async store ({ request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
  
    // Lookup user manually
    const user = await User
      .query()
      .where('email', email)      
      .firstOrFail()
  
    // Verify password
    if (!(await Hash.verify(user.password, password))) {
      return response.unauthorized('Invalid credentials')
    } 
    
    return response.ok({user})    
  }
}