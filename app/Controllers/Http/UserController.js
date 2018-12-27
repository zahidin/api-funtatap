'use strict'

const Database = use('Database')
const { validate } = use('Validator')

const User = use('App/Models/User');

class UserController {

    async index({request, response }){
        const data = await User.all()
        response.json(data)
    }

    async checkDevice({request,params,response}){
        const data = await User.findBy('device_id',params.device_id)
        response.json(data)
    }

    async addUser({request,response}) {
        
        if(request.header('Content-Type') == 'application/json; charset=utf-8'){

            const rules = {
                name: 'required',
                username: 'required|unique:users,username',
                email: 'required|email|unique:users,email',
            }
            const validation = await validate(request.all(), rules)

            if(validation.fails()){
                response.json(validation.messages())
            }else{
                const {name,username,email,combos,device_id,cryptocurrency} = request.all()

                const dataPost = new User()
                dataPost.fill({name,username,device_id,email,combos,cryptocurrency})

                const insert = await dataPost.save()
                response.status(201)
                response.json({success:true,message:"Success Add User"})
            }        

        }else{
            response.json({success:false,message:"Content typle:'application/json'"})
        }
    }

    async updateUser({request,params,response}){
        if(request.header('content-type') != 'application/json; charset=utf-8'){
            response.json({success:false,message:"Content typle:'application/json'"})
        }

        try{            
            const update = await User.query().where('id',params.id).update(request.all())
            response.json({success:true,message:'Success Update User'})
        }catch(e){
            response.json({success:false,message:e.message})
        }

    }

    async addCombos({request,params,response}){
        if(request.header('content-type') != 'application/json; charset=utf-8'){
            response.json({success:false,message:"Content type:'application/json'"})
        }

        const dataCombos = await User.findBy('device_id',params.device_id)
        const combos = {combos:request.input('combos')} 
        const data = await User.query().where('device_id',params.device_id).update(combos)
        response.json({success:true,message:'Success add combo'})
    }

    async getRank({request,params,response}){
        const data = await Database.raw(`SELECT id, name, combos, FIND_IN_SET( combos, ( SELECT GROUP_CONCAT( combos ORDER BY name DESC , combos DESC ) FROM users ) ) AS rank FROM users WHERE device_id = '${params.device_id}'`)
        response.json(data[0])
    }

    async leaderboard({request,response}){
        // const data = await Database.raw('SELECT id, username, combos, FIND_IN_SET( combos, ( SELECT GROUP_CONCAT( combos ORDER BY combos DESC , name DESC ) FROM users ) ) AS rank FROM users')
        const data = await Database.raw('SELECT a1.name,a1.combos, COUNT(a2.combos) Rank FROM users a1, users a2 WHERE a1.combos <= a2.combos OR (a1.combos = a2.combos AND a1.name = a2.name) GROUP BY a1.name, a1.combos ORDER BY a1.combos DESC , a1.name DESC ')
        // const data = await Database.table('users').orderBy('combos','desc')
        response.json(data[0])
    }

}

module.exports = UserController
