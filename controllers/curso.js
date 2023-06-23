//Importar paquetes requeridos de node
const { response } = require('express');

//Importacion de los modelos 
const Curso = require('../models/curso');

//insercion, modificacion de datos

//consultar
const cursoGet = async (req, res = response) => {
  const { nombre } = req.body;
  let cursos;

  try {
    if (nombre) {
      // Si se proporciona el parámetro "nombre", filtrar por ese nombre
      cursos = await Curso.find({ nombre: nombre });
    } else {
      // Si no se proporciona el parámetro "nombre", obtener todos los usuarios
      cursos = await Curso.find();
    }

    res.json({
      cursos
    });
  } catch (error) {
    mensaje = 'Error en la busqueda de datos'
    return res.status(500).json({mensaje})
  }

};


const cursoPost = async (req, res = response) => {
  //captura atributos o parametros
  const body = req.body
  let mensaje = '';

  try {
    const curso = new Curso(body)
    //guardar objeto
    await curso.save()
    console.log(curso)
    mensaje = 'El registro se realizo correctamente'

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

}

const cursoPut = async (req, res = response) => {
  const { nombre, docente, grupo, nivel, cupo, fechaI, fechaF, estado } = req.body;
  let mensaje = '';

  try {
    const curso = await Curso.findOneAndUpdate(
      { nombre: nombre },
      { docente: docente, grupo: grupo, nivel: nivel, cupo: cupo, fechaI: fechaI, fechaF: fechaF, estado: estado }
    );

    if (!curso) {
      mensaje = 'El curso no existe';
      return res.status(404).json({ mensaje });
    }

    mensaje = 'La modificación se efectuó correctamente';
    return res.status(200).json({ mensaje });
  } catch (error) {
    mensaje = 'Se presentaron problemas en la modificación';
    return res.status(500).json({ mensaje });
  }
};

const cursoDelete = async (req, res = response) => {
  const { nombre } = req.body;
  let mensaje = '';

  try {
    const curso = await Curso.findOne({ nombre: nombre });
    if (curso) {
      await Curso.findOneAndDelete({ nombre: nombre });
      mensaje = 'La eliminacion fue exitosa';
      return res.status(200).json({ mensaje });
    } else {
      mensaje = 'El curso no existe';
      return res.status(404).json({ mensaje });
    }
  } catch (error) {
    mensaje = 'Error al eliminar el curso';
    return res.status(500).json({ mensaje });
  }
};


module.exports = {
  cursoGet,
  cursoPost,
  cursoPut,
  cursoDelete
}
