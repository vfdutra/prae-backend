/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/login', 'SessionsController.store').as('sessions.store')
Route.get('/logout', 'SessionsController.destroy').as('sessions.destroy')

// Rotas de Livros
Route.group(() => {
    Route.get('/all', 'BooksController.findAll')
    Route.get('/:id', 'BooksController.findOne')
    Route.post('/', 'BooksController.create')
    Route.put('/:id', 'BooksController.update')
    Route.delete('/:id', 'BooksController.destroy')
}).prefix('books')

// Rotas de Usuários
Route.group(() => {
    Route.get('/all', 'UsersController.findAll')
    Route.get('/:id', 'UsersController.findOne')
    Route.post('/', 'UsersController.create')
    Route.put('/:id', 'UsersController.update')
    Route.delete('/:id', 'UsersController.destroy')
}).prefix('users')

// Rotas de Interesses
Route.group(() => {
    Route.get('/', 'InterestsController.showAll')
    Route.get('/:id', 'InterestsController.show')
    Route.post('/', 'InterestsController.create')
    Route.put('/:id', 'InterestsController.update')
}).prefix('interests')

Route.post('insert', 'CsvsController.import')