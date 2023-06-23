const {Schema, model}=require('mongoose')

const grupoSchema= Schema({
    //se define tipos de datos
    nombre:{
        type: String,
        unique:true,
        required: [true, 'El nombre  es requerido'],
    },
    asignatura:{
        type: String,
        required:[true, 'La asignatura es requerida'],
    },

    estado:{
        type: Boolean,
        required:[true, 'El estado es obligatorio'],
        default:false,
    }
})
//este es el nombre del objeto Usuario
module.exports = model('Grupo', grupoSchema)//Exportar el modelo

