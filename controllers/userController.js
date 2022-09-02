const {users, patient, Sequelize} = require("./../models")
const jwt = require('jsonwebtoken')

const Op = Sequelize.Op
let self = {}

self.getLogin = async (req,res) => {
    let id = req.body.id
    let data = await users.findOne({
        attributes:["id","name","age","birthDate"],
        where:{
            id:id
        }
    })
    jwt.sign({id:data}, 'secretkey',(err,token)=>{
        res.json({
            token
        })
    })

}
   
self.getAll = (req,res) => {
    try{
        jwt.verify(req.token, 'secretkey', async (err,authData)=>{
            if(err) {
                res.sendStatus(403)
            } else {
                let data = await users.findAll({
                    attributes:["id","name","age"]
                })
                return res.status(200).json({
                    status:"ok",
                    data:data,
                    authData
                })
            }
        })
    } catch(error){
        res.status(500).json({
            status:"error",
            data:error
        })
    }
}

self.getWithPatientAdmin = (req,res) => {
    try{
        jwt.verify(req.token, 'secretkey', async (err,authData)=>{
            if(err) {
                res.sendStatus(403)
            } else {
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
                    data:data,
                    authData
                })
            }
        })
    } catch(error){
        res.status(500).json({
            status:"error",
            data:error
        })
    }
}

self.getWithPatientUser = (req,res) => {
    try{
        jwt.verify(req.token, 'secretkey', async (err,authData)=>{
            if(err) {
                res.sendStatus(403)
            } else {
                let id = req.params.id
                let data = await patient.findAll({
                    attributes:["id","name","alamat","phone"],
                    where:{
                        userId:id
                    }
                })
                return res.status(200).json({
                    status:"ok",
                    data:data,
                    authData
                })
            }
        })
    }catch(error){
        res.status(500).json({
            status:"error",
            data:error
        })
    }
}

self.get = (req,res) => {
    try{
        jwt.verify(req.token, 'secretkey', async (err,authData)=>{
            if(err) {
                res.sendStatus(403)
            } else {
                let id = req.params.id
                let data = await users.findOne({
                    attributes:["id","name"],
                    where:{
                        id:id
                    }
                })
                return res.status(200).json({
                    status:"ok",
                    data:data,
                    authData
                })
            }
        })
    } catch(error){
        res.status(500).json({
            status:"error",
            data:error
        })
    }
}
   
self.search = (req,res) => {
    try{
        jwt.verify(req.token, 'secretkey', async (err,authData)=>{
            if(err) {
                res.sendStatus(403)
            } else {
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
                data:data,
                authData
            })
        }
    })
    } catch(error){
        res.status(500).json({
            status:"error",
            data:error
        })
    }
}

self.add = (req,res) => {
    try{
        jwt.verify(req.token, 'secretkey', async (err,authData)=>{
            if(err){
                res.sendStatus(403)
            } else {
                let body = req.body
                let data = await users.create(body)
                return res.status(200).json({
                    status:"ok",
                    data:data,
                    authData
                })
            }
        })
    } catch(error){
        res.status(500).json({
            status:"error",
            data:error
        })
    }
}

self.update =(req,res) => {
    try{
        jwt.verify(req.token, 'secretkey', async (err,authData)=>{
            if(err){
                res.sendStatus(403)
            } else {
                let id = req.params.id
                let body = req.body
                let data = await users.update(body,{
                    where:{
                        id:id
                    }
                })
                return res.status(200).json({
                    status:"ok",
                    data:data,
                    authData
                })
            }
        })
    } catch(error){
        res.status(500).json({
            status:"error",
            data:error
        })
    }
}

self.delete = (req,res) => {
    try{
        jwt.verify(req.token, 'secretkey', async (err,authData)=>{
            if(err){
                res.sendStatus(403)
            } else {
                let id = req.params.id
                let data = await users.destroy({
                    where:{
                        id:id
                    }
                })
            return res.status(200).json({
                status:"ok",
                data:data,
                authData
            })
        }
    })
    } catch(error){
        res.status(500).json({
            status:"error",
            data:error
        })
    }
}

module.exports = self;