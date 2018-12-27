'use strict'

const Hash = use('Hash')

const UserAdmin = use('App/Models/UserAdmin');

class UserAdminController {
        
    async addAdmin({request,response}){
        try{
            const admin = new UserAdmin()

            const username = request.input('username')
            const password = await Hash.make(request.input('password'))
    
            admin.username = username
            admin.password = password
            await admin.save()

            response.json({success:true,message:'Success add admin'})
        }catch(e){
            response.json({success:false,message:e.message})
        }   
    }

    async verifPassword({request,response}){
        const dataAdmin = await UserAdmin.findBy('username',request.input('username'))

        if(!dataAdmin){
            response.json({success:false,message:`There is no username ${request.input('username')}`})                                                                                                                                                                                                                                                                                                                                                                                                                                          
        }else{
            try{                                                                                                                                                                                                                        
                const verifPass = await Hash.verify(request.input('password'),dataAdmin.password)   
                if(verifPass){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
                    response.json({success:true,message:'Success Login'})
                }else{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                    response.json({success:false,message:'Username or password miss'})                                                  
                }
            }catch(e){
                response.json({success:false,message:e.message})
            }
        }
    }
}

module.exports = UserAdminController
