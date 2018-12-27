'use strict'

const Rule = use('App/Models/Rule');
const { validate } = use('Validator')

class RuleController {
    
    async setRules({request,response}){
        
        if(request.header('content-type')!= 'application/json; charset=utf-8'){
            response.json({success:false,message:"Content typle:'application/json'"})
        }
        const rules = {
            partent :'required'
        }

        const validation = await validate(request.all(),rules)

        if(validation.fails()){
            response.json(validation.messages())
        }else{
            const dataRule = new Rule()
            dataRule.fill(request.all())
            const insertPartent = await dataRule.save()
            response.json({success:true,message:'Success insert rules'})
        }

    }



    async getRules({request,response}){

        try{
            const data = await Rule.first()
            response.json(data)
        }catch(e){
            response.json({success:false,message:e.message})
        }
        
    }

}

module.exports = RuleController
