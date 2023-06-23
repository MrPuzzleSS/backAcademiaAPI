//conectarse a mongo 
const mongoose= require('mongoose')

//crear conexionc
const dbConnection = ()=>{
    try{
        mongoose.connect(process.env.MONGO_CNN)
        console.log('Conexion exitosa a la base de datos')

    }
    catch(error){
        console.log('Error en BD')
        throw new error('Error al conectar a la base de datos')
    }
}

//Exportar la cadena de conexion
module.exports={dbConnection}