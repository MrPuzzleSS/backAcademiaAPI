const {Router} = require('express')

const route = Router()
//se define despues de crear el controllador
//importar metodos del controlador
const{estudianteGet, estudiantePost, estudiantePut, estudianteDelete} = require('../controllers/estudiante')
route.get('/', estudianteGet)
route.post('/', estudiantePost )
route.put('/', estudiantePut )
route.put('/', estudianteDelete )
route.delete('/', estudianteDelete)
module.exports = route