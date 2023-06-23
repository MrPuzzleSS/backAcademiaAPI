//Importar paquetes requeridos de node
const { response } = require('express');

//Importacion de los modelos 
const Docente = require('../models/docente');

//insercion, modificacion de datos

//consultar
const docenteGet = async (req, res = response) => {
  const { nombre } = req.body;
  let docentes;
  if (nombre) {
    // Si se proporciona el parámetro "nombre", filtrar por ese nombre
    docentes = await Docente.find({ nombre: nombre });
  } else {
    // Si no se proporciona el parámetro "nombre", obtener todos los usuarios
    docentes = await Docente.find();
  }

  res.json({
    docentes
  });
};


const docentePost = async (req, res = response) => {
  const body = req.body;
  let mensaje = '';

  try {
    const docente = new Docente(body);
    await docente.save();
    console.log(docente);
    mensaje = 'El registro se realizó correctamente';
    // Enviar la respuesta de éxito
    return res.status(200).json({ mensaje });
    
  } catch (error) {
    // Manejo de errores
    if (error.code === 11000) {
      const campoDuplicado = Object.keys(error.keyValue)[0];
      const mensajeError = `El campo ${campoDuplicado} ya existe.`;
      return res.status(409).json({
        error: 'Clave duplicada',
        message: mensajeError
      });
    } else if (error.name === 'ValidationError') {
      const mensajesError = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        error: 'ValidationError',
        messages: mensajesError
      });
    } else {
      console.error(error);
      return res.status(500).json({
        error: 'Error interno del servidor'
      });
    }
  }
};

const docentePut = async (req, res = response) => {
  const { nombre, apellido, correo, celular , estado } = req.body;
  let mensaje = '';

  try {
    const docente = await Docente.findOneAndUpdate(
      { nombre: nombre },
      { apellido: apellido, correo: correo, celular: celular, estado: estado }
    );

    if (!docente) {
      mensaje = 'El docente no existe';
      return res.status(404).json({ mensaje });
    }

    mensaje = 'La modificación se efectuó correctamente';
    return res.status(200).json({ mensaje });
  } catch (error) {
    mensaje = 'Se presentaron problemas en la modificación';
    return res.status(500).json({ mensaje });
  }
};

const docenteDelete = async (req, res = response) => {
  const { nombre } = req.body;
  let mensaje = '';

  try {
    const docente = await Docente.findOne({ nombre: nombre });
    if (docente) {
      await Docente.findOneAndDelete({ nombre: nombre });
      mensaje = 'La eliminacion fue exitosa';
    } else {
      mensaje = 'El docente no existe';
    }
  } catch (error) {
    mensaje = 'Error al eliminar el docente';
  }

  res.json({
    msg: mensaje
  });
};


module.exports = {
  docenteGet,
  docentePost,
  docentePut,
  docenteDelete
}
