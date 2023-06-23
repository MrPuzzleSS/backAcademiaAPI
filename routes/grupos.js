const {Router} = require('express')

const route = Router()
//se define despues de crear el controllador
//importar metodos del controlador
const{grupoGet, grupoPost, grupoPut, grupoDelete} = require('../controllers/grupo')
route.get('/', grupoGet)
route.post('/', grupoPost )
route.put('/', grupoPut )
route.put('/', grupoDelete )
route.delete('/', grupoDelete)
module.exports = route