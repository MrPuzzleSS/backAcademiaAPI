const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

async function comparePassword(passwordForm, passworsDB){
    const result = await bcrypt.compare(passwordForm, passworsDB)
    return result;
}

const login = async(req, res) => {
    const {nombre, password} = req.body
    //Verificar si el email existe
    const usuarios = await Usuario.findOne({nombre})
    try {
        if(!usuarios){
            return res.status(400).json({
                msg: 'El correo electronico no fue encontrado'
            })
        }
        console.log(usuarios.estado)
        if(!usuarios.estado){
            return res.status(400).json({
                msg: 'Usuario inactivo'
            })
        }

        resultado = await comparePassword(password, usuarios.password)

        if(resultado == true){
            return res.status(400).json({
                usuarios
            })
        }else{
            return res.status(400).json({
                msg: 'La constraseña no es'
            })
        }

    } catch (error) {
        return res.status(400).json({
            msg: 'Contacte con el administrador'
        })
    }
}

module.exports = {
    login
}