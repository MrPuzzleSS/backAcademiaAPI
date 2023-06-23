//Importar paquetes requeridos de node
const { response } = require('express');
const bcrypt = require('bcrypt'); //Incriptacion de contraseñas

//Importacion de los modelos 
const Usuario = require('../models/usuario');

//insercion, modificacion de datos

//consultar
const usuarioGet = async (req, res = response) => {
  const { nombre } = req.body;
  let usuarios;
  if (nombre) {
    // Si se proporciona el parámetro "nombre", filtrar por ese nombre
    usuarios = await Usuario.find({ nombre: nombre });
  } else {
    // Si no se proporciona el parámetro "nombre", obtener todos los usuarios
    usuarios = await Usuario.find();
  }

  res.json({
    usuarios
  });
};


const usuarioPost = async (req, res = response) => {
  //captura atributos o parametros
  const body = req.body
  let mensaje = '';
  //instaciar el objeto
  // const{nombre,password,rol,estado}=req.query
  try {
    const usuario = new Usuario(body)

    //console.log(bcrypt.hashSync(body.password,10))
    usuario.password = bcrypt.hashSync(body.password, 10)
    //guardar objeto
    await usuario.save()
    console.log(usuario)
    mensaje = 'El registro se realizo correctamente'

    return res.status(200).json({ mensaje });
  } catch (error) {
    if (error) {
      if (error.name === 'ValidationError') {
        mensaje = Object.values(error.errors).map(val => val.message)
      }
    }
  }

  res.json({
    msg: mensaje
  })

}

const usuarioPut = async (req, res = response) => {
  const { nombre, password, rol, estado } = req.body;
  let mensaje = '';

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = await Usuario.findOneAndUpdate(
      { nombre: nombre },
      { password: hashedPassword, rol: rol, estado: estado }
    );

    if (!usuario) {
      mensaje = 'El usuario no existe';
      return res.status(404).json({ mensaje });
    }

    mensaje = 'La modificación se efectuó correctamente';
    return res.status(200).json({ mensaje });
  } catch (error) {
    mensaje = 'Se presentaron problemas en la modificación';
    return res.status(500).json({ mensaje });
  }
};

const usuarioDelete = async (req, res = response) => {
  const { nombre } = req.body;
  let mensaje = '';

  try {
    const usuario = await Usuario.findOne({ nombre: nombre });
    if (usuario) {
      await Usuario.findOneAndDelete({ nombre: nombre });
      mensaje = 'La eliminacion fue exitosa';
    } else {
      mensaje = 'El usuario no existe';
    }
  } catch (error) {
    mensaje = 'Error al eliminar el usuario';
  }

  res.json({
    msg: mensaje
  });
};


module.exports = {
  usuarioGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete
}
