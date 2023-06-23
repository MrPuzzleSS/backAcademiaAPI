const {Schema, model}=require('mongoose')

const cursoSchema= Schema({
    //se define tipos de datos
    nombre:{
        type: String,
        required: [true, 'El nombre  es requerido'],
    },
    docente:{
        type: String,
        required:[true, 'El docente es requerido'],
    },

    grupo:{
        type:String,
        required:[true, 'El correo es requerido']
    },

    nivel:{
        type:String,
        required:[true, 'El correo es requerido']
    },

    cupo:{
        type:Number,
        required: [true, 'El cupo de estudiantes es requerido']
    },

    fechaI:{
        type: Date
    },

    fechaF:{
        type: Date
    },

    estado:{
        type: Boolean,
        required:[true, 'El estado es obligatorio'],
        default:false,
    }
})
//este es el nombre del objeto Usuario
module.exports = model('Curso', cursoSchema)//Exportar el modelo

