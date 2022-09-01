const {users, patient, Sequelize} = require("./../models")
const Op = Sequelize.Op
let self = {}
   
self.getAll = async (req,res) => {
    try{
        let data = await users.findAll({
            attributes:["id","name"]
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

self.getWithPatientAdmin = async (req,res) => {
    try{
        let data = await users.findAll({
            attributes:["id","name"],
            include:[{
                model:patient,
                as:'patient',
                attributes:["id","name","alamat","phone"]
            }]
        })
        return res.status(200).json({
            status:"ok",
            data:data
        })
    }catch(error){
        res.status(500).json({
            status:"error",
            data:error
        })
    }
}

self.getWithPatientUser = async (req,res) => {
    try{
        let id = req.params.id
        let data = await patient.findAll({
            attributes:["id","name","alamat","phone"],
            where:{
                userId:id
            }
        })
        return res.status(200).json({
            status:"ok",
            data:data
        })
    }catch(error){
        res.status(500).json({
            status:"error",
            data:error
        })
    }
}

self.get = async (req,res) => {
    try{
        let id = req.params.id
        let data = await users.findOne({
            attributes:["id","name"],
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
   
self.search = async (req,res) => {
    try{
        let text = req.params.name
        let data = await users.findAll({
            attributes:["id","name"],
            where:{
                name:{
                    [Op.like]:"%"+text+"%"
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
        let data = await users.create(body)
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
        let data = await users.update(body,{
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
        let data = await users.destroy({
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