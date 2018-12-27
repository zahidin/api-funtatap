'use strict'

const Image = use('App/Models/Image');
const Helpers = use('Helpers')

class ImageController {

    async uploadBackground({request,response}){
       try{
            const validationOptions = {
                types: ['image'],
                size: '2mb',
                extnames: ['png', 'jpg','jpeg','gif']
            }

            const fileImage = request.file('background_image',validationOptions)
            // const imageName = new Date().getTime() + '.' + fileImage.subtype 
            // const sizeImg = fileImage.size
            await fileImage.move(Helpers.publicPath('uploads/img/background'),{
                name:'background_image.jpg',
                overwrite: true
            })
              
            if(!fileImage.moved()){
                response.json({success:false,message:fileImage.errors()})
            }else{

                // const name  = 'background_image.jpg'
                // const size = fileImage.size
                // const data = new Image()
                // data.fill({name:name,size:size})    
                // const insert = await data.save()
            
                response.status(201)
                response.json({success:true,message:'Succes upload'})    
                
            }

       }catch(e){
           response.json({success:false,message:e.message})
       }
    }

    async getImage({request,response}){
        const data = await Image.find(1)
        // const data = await Image.last()
        response.json(data)
    }
}

module.exports = ImageController
