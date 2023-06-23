const {Schema, model}=require('mongoose')

const EstudianteSchema= Schema({
    //se define tipos de datos
    nombre:{
        type: String,
        required: [true, 'El nombre  es requerido'],
    },
    apellido:{
        type: String,
        required:[true, 'El apellido es requerido'],
    },

    correo:{
        type:String,
        required:[true, 'El correo es requerido']
    },

    celular:{
        type:Number,
        required: [true, 'El numero de celular es requerido']
    },

    estado:{
        type: Boolean,
        required:[true, 'El estado es obligatorio'],
        default:false,
    }
})
//este es el nombre del objeto Usuario
module.exports = model('Estudiante', EstudianteSchema)//Exportar el modelo

