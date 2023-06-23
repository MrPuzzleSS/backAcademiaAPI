//Importar paquetes requeridos de node
const { response } = require('express');

//Importacion de los modelos 
const Grupo = require('../models/grupo');

//insercion, modificacion de datos

//consultar
const grupoGet = async (req, res = response) => {
  const { nombre } = req.body;
  let grupos;
  if (nombre) {
    // Si se proporciona el parámetro "nombre", filtrar por ese nombre
    grupos = await Grupo.find({ nombre: nombre });
  } else {
    // Si no se proporciona el parámetro "nombre", obtener todos los usuarios
    grupos = await Grupo.find();
  }

  res.json({
    grupos
  });
};


const grupoPost = async (req, res = response) => {
  //captura atributos o parametros
  const body = req.body

  console.log(req.body)
  let mensaje = '';
  //instaciar el objeto
  // const{nombre,password,rol,estado}=req.query
  try {
    const grupo = new Grupo(body);
  
    // Guardar objeto
    await grupo.save();
    console.log(grupo);
    mensaje = 'El registro se realizó correctamente';
  
    res.json({
      msg: mensaje
    });
  
  } catch (error) {
    if (error.code === 11000) {
      // Error de clave duplicada
      const campoDuplicado = Object.keys(error.keyValue)[0];
      const mensajeError = `El campo ${campoDuplicado} ya existe.`;
      res.status(409).json({
        error: 'Clave duplicada',
        message: mensajeError
      });
    } else if (error.name === 'ValidationError') {
      // Validación de errores de esquema
      const mensajesError = Object.values(error.errors).map(val => val.message);
      res.status(400).json({
        error: 'ValidationError',
        messages: mensajesError
      });
    } else {
      // Otro tipo de error
      console.error(error);
      res.status(500).json({
        error: 'Error interno del servidor'
      });
    }
  }

}

const grupoPut = async (req, res = response) => {
  const { nombre, asignatura, estado } = req.body;
  let mensaje = '';

  try {

    const grupo = await Grupo.findOneAndUpdate(
      { nombre: nombre },
      { nombre: nombre, asignatura:asignatura, estado: estado }
    );

    if (!grupo) {
      mensaje = 'El grupo no existe';
      return res.status(404).json({ mensaje });
    }

    mensaje = 'La modificación se efectuó correctamente';
    return res.status(200).json({ mensaje });
  } catch (error) {
    mensaje = 'Se presentaron problemas en la modificación';
    return res.status(500).json({ mensaje });
  }
};

const grupoDelete = async (req, res = response) => {
  const { nombre } = req.body;
  let mensaje = '';

  try {
    const grupo = await Grupo.findOne({ nombre: nombre });
    if (grupo) {
      await Grupo.findOneAndDelete({ nombre: nombre });
      mensaje = 'La eliminacion fue exitosa';
    } else {
      mensaje = 'El grupo no existe';
    }
  } catch (error) {
    mensaje = 'Error al eliminar el grupo';
  }

  res.json({
    msg: mensaje
  });
};

module.exports = {
  grupoGet,
  grupoPost,
  grupoPut,
  grupoDelete
}
