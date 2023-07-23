import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CheckUserType {
  public async handle ({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    // Recupera o usuário autenticado
    const user = auth.user

    // Verifica se o tipo de usuário é 1
    if (user && user.type !== 1) {
      // Retorna uma resposta de erro ou redireciona o usuário
      return response.unauthorized('Acesso negado')
    }

    await next()
  }
}
