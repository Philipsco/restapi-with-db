const users = require("./../controllers/userController.js")
const patient = require("./../controllers/patientController.js")

module.exports = function(express) {
    const route = express.Router()
    
    route.get("/users",users.getAll)
    route.get("/users/:id",users.get)
    route.get("/users_search/:name",users.search)
    route.post("/users",users.add)
    route.put("/users/:id",users.update)
    route.delete("/users/:id",users.delete)
    route.get("/users_with_patient",users.getWithPatientAdmin)
    route.get("/users/:id/patient",users.getWithPatientUser)
 
    route.get("/patient",patient.getAll)
    route.get("/patient/:id",patient.get)
    route.get("/patient_search/:name",patient.search)
    route.post("/patient",patient.add)
    route.put("/patient/:id",patient.update)
    route.delete("/patient/:id",patient.delete)

    return route
}