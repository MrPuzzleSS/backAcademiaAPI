//Importar paquetes requeridos de node
const { response } = require('express');

//Importacion de los modelos 
const Estudiante = require('../models/estudiante');

//insercion, modificacion de datos

//consultar
const estudianteGet = async (req, res = response) => {
  const { nombre } = req.body;
  let estudiantes;
  if (nombre) {
    // Si se proporciona el parámetro "nombre", filtrar por ese nombre
    estudiantes = await Estudiante.find({ nombre: nombre });
  } else {
    // Si no se proporciona el parámetro "nombre", obtener todos los usuarios
    estudiantes = await Estudiante.find();
  }

  res.json({
    estudiantes
  });
};


const estudiantePost = async (req, res = response) => {
  const body = req.body;
  let mensaje = '';

  try {
    const estudiante = new Estudiante(body);
    await estudiante.save();
    console.log(estudiante);
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

const estudiantePut = async (req, res = response) => {
  const { nombre, apellido, correo, celular , estado } = req.body;
  let mensaje = '';

  try {
    const estudiante = await Estudiante.findOneAndUpdate(
      { nombre: nombre },
      { apellido: apellido, correo: correo, celular: celular, estado: estado }
    );

    if (!estudiante) {
      mensaje = 'El estudiante no existe';
      return res.status(404).json({ mensaje });
    }

    mensaje = 'La modificación se efectuó correctamente';
    return res.status(200).json({ mensaje });
  } catch (error) {
    mensaje = 'Se presentaron problemas en la modificación';
    return res.status(500).json({ mensaje });
  }
};

const estudianteDelete = async (req, res = response) => {
  const { nombre } = req.body;
  let mensaje = '';

  try {
    const estudiante = await Estudiante.findOne({ nombre: nombre });
    if (estudiante) {
      await Estudiante.findOneAndDelete({ nombre: nombre });
      mensaje = 'La eliminacion fue exitosa';
    } else {
      mensaje = 'El estudiante no existe';
    }
  } catch (error) {
    mensaje = 'Error al eliminar el estudiante';
  }

  res.json({
    msg: mensaje
  });
};

module.exports = {
  estudianteGet,
  estudiantePost,
  estudiantePut,
  estudianteDelete
}
