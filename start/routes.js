'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Helpers = use('Helpers')

Route.group(() => {

    Route.get('users', 'UserController.index')
    Route.get('rules', 'RuleController.getRules')
    Route.get('leaderboard', 'UserController.leaderboard')
    Route.get('backgroundimage', 'ImageController.getImage')
    Route.get('checkdevice/:device_id', 'UserController.checkDevice')
    Route.get('rank/:device_id', 'UserController.getRank')


    Route.post('adduser', 'UserController.addUser')
    Route.post('addadmin', 'UserAdminController.addAdmin')
    Route.post('setrules', 'RuleController.setRules')
    Route.post('uploadimage', 'ImageController.uploadBackground')
    Route.post('veriflogin', 'UserAdminController.verifPassword')


    Route.put('users/:id', 'UserController.updateUser')
    Route.put('addcombos/:device_id', 'UserController.addCombos')

    // Route.post('uploadImage',async({request}) => {
    //   const img = request.file('images')
    // })

  }).prefix('api/v1')
