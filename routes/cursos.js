const {Router} = require('express')

const route = Router()
//se define despues de crear el controllador
//importar metodos del controlador
const{cursoGet, cursoPost, cursoPut, cursoDelete}=require('../controllers/curso')
route.get('/', cursoGet)
route.post('/', cursoPost )
route.put('/', cursoPut )
route.put('/', cursoDelete )
route.delete('/', cursoDelete)
module.exports = route