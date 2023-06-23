const {Router} = require('express')

const route = Router()
//se define despues de crear el controllador
//importar metodos del controlador
const{usuarioGet, usuarioPost, usuarioPut, usuarioDelete}=require('../controllers/usuario')
route.get('/', usuarioGet)
route.post('/',usuarioPost )
route.put('/',usuarioPut )
route.put('/',usuarioDelete )
route.delete('/', usuarioDelete)
module.exports = route


