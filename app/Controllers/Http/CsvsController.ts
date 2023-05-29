import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import csvtojson from 'csvtojson'

export default class CsvController {
  public async import({ request }: HttpContextContract) {
    // Obter o arquivo CSV do corpo da solicitação
    const csvFile = request.file('csv')

    // Verificar se o arquivo foi enviado
    if (!csvFile) {
      return 'Por favor, envie um arquivo CSV'
    }

    // Converter o arquivo CSV em JSON ignorando a primeira linha
    const jsonArray = await csvtojson({ noheader: true, output: 'csv' })
      .fromFile(csvFile.tmpPath!)
      .then((data) => data.slice(1))

    // Contar o número de ocorrências de cada livro
    const bookCounts = jsonArray.reduce((acc, row) => {
      acc[row[0]] = (acc[row[0]] || 0) + 1
      return acc
    }, {})

    // Inserir cada livro na tabela books com a quantidade correspondente
    for (const [title, quantity] of Object.entries(bookCounts)) {
        // console.log(title, quantity)

      await Database.insertQuery().table('books').insert({ title, quantity })
    }

    return 'Arquivo importado com sucesso'
  }
}
