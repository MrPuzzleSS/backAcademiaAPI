const {Router} = require('express')

const route = Router()
//se define despues de crear el controllador
//importar metodos del controlador
const{docenteGet, docentePost, docentePut, docenteDelete}=require('../controllers/docente')
route.get('/', docenteGet)
route.post('/', docentePost )
route.put('/', docentePut )
route.put('/', docenteDelete )
route.delete('/', docenteDelete)
module.exports = route