const users = require("./../controllers/userController.js")
const patient = require("./../controllers/patientController.js")

const verifyToken=(req,res,next)=>{
    const bearHeader = req.headers['authorization']
    if(typeof bearHeader !== "undefined"){
        const bearToken = bearHeader.split(' ')[1]
        req.token = bearToken
        next()
    } else {
        res.sendStatus(403)
    }
}

module.exports = function(express) {
    const route = express.Router()
    
    route.get("/users",verifyToken,users.getAll)
    route.get("/users/:id",verifyToken,users.get)
    route.get("/users_search/:name",verifyToken,users.search)
    route.post("/users",verifyToken,users.add)
    route.put("/users/:id",verifyToken,users.update)
    route.delete("/users/:id",verifyToken,users.delete)
    route.get("/users_with_patient",verifyToken,users.getWithPatientAdmin)
    route.get("/users/:id/patient",verifyToken,users.getWithPatientUser)
 
    route.get("/patient",verifyToken,patient.getAll)
    route.get("/patient/:id",verifyToken,patient.get)
    route.get("/patient_search/:name",verifyToken,patient.search)
    route.post("/patient",verifyToken,patient.add)
    route.put("/patient/:id",verifyToken,patient.update)
    route.delete("/patient/:id",verifyToken,patient.delete)

    route.post("/login", users.getLogin)
    return route
}