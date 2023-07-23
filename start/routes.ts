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

// Rotas de Usuários
Route.group(() => {
    Route.get('/all', 'UsersController.findAll').middleware(['auth', 'checkTypeUser'])
    Route.get('/:id', 'UsersController.findOne').middleware(['auth', 'checkTypeUser'])
    Route.post('/', 'UsersController.create')
    Route.put('/:id', 'UsersController.update').middleware(['auth'])
    Route.delete('/:id', 'UsersController.destroy').middleware(['auth', 'checkTypeUser'])
}).prefix('users')

Route.group(() => {
    
    // Rotas de Livros
    Route.group(() => {
        Route.get('/all/:crud?', 'BooksController.findAll')
        Route.get('/:id', 'BooksController.findOne')
        Route.post('/', 'BooksController.create').middleware('checkTypeUser')
        Route.put('/:id', 'BooksController.update').middleware('checkTypeUser')
        Route.delete('/:id', 'BooksController.destroy').middleware('checkTypeUser')
    }).prefix('books')

    // Rotas de Interesses
    Route.group(() => {
        Route.get('/all', 'InterestsController.findAll')
        Route.get('/:id', 'InterestsController.findOne')
        Route.post('/', 'InterestsController.create')
        Route.put('/:id', 'InterestsController.update')
        Route.delete('/:id', 'InterestsController.destroy')
        Route.get('/user/:id', 'InterestsController.findByUser')
        Route.get('/book/:id', 'InterestsController.findByBook')
    }).prefix('interests')

}).middleware('auth')