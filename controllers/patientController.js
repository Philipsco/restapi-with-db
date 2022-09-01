const {patient, users, Sequelize} = require("./../models")
const Op = Sequelize.Op
let self = {}

self.getAll = async (req,res) => {
    try{
        let data = await patient.findAll({
            attributes:["id","name","alamat","phone"],
            include:[{
                model:users,
                as:'user',
                attributes:["id","name"]}
            ]
        })
        return res.status(200).json({
            status:"ok",
            data:data
        })
    } catch(error){
        res.status(500).json({
            status:"error",
            data:error})
    }
}
    
self.get = async (req,res) => {
    try{
        let id = req.params.id
        let data = await patient.findOne({
            attributes:["id","name","alamat","phone"],
            include:[{
                model:users,
                as:'user',
                attributes:["id","name"]
            }
        ], where:{
            id:id
        }})
        return res.status(200).json({
            status:"ok",
            data:data
        })
    } catch(error){
        res.status(500).json({
        status:"error",
        data:error})
    }
}
   
self.search = async (req,res) => {
    try{
        let text = req.params.name
        let data = await patient.findAll({
            attributes:["id","name","alamat","phone"],
            include:[{
                model:users,
                as:'user',
                attributes:["id","name"]
            }
        ], where:{
            [Op.or]:{
                name:{
                    [Op.like]:"%"+text+"%"
                },
                '$patient.name$':{
                    [Op.like]:"%"+text+"%"
                }
            }
        }
    })
    return res.status(200).json({
        status:"ok",
        data:data
    })
    } catch(error){
        res.status(500).json({
        status:"error",
        data:error
    })
    }
}
   
self.add = async (req,res) => {
    try{
        let body = req.body
        let data = await patient.create(body)
        return res.status(200).json({
            status:"ok",
            data:data
        })
    } catch(error){
        res.status(500).json({
            status:"error",
            data:error
        })
    }
}
   
self.update = async (req,res) => {
    try{
        let id = req.params.id
        let body = req.body
        let data = await patient.update(body, {
            where:{
                id:id
            }
        })
        return res.status(200).json({
            status:"ok",
            data:data
        })
    } catch(error){
        res.status(500).json({
            status:"error",
            data:error
        })
    }
}
   
self.delete = async (req,res) => {
    try{
        let id = req.params.id
        let data = await patient.destroy({
            where:{
                id:id
            }
        })
        return res.status(200).json({
            status:"ok",
            data:data
        })
    } catch(error){
        res.status(500).json({
            status:"error",
            data:error
        })
    }
}

module.exports = self;