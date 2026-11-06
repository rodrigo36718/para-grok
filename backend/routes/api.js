var express = require('express');
var router = express.Router();
var novedadesModel = require('../models/novedadesModel');
var usuariosModel = require('../models/usuariosModel');
var cloudinary = require('cloudinary').v2;
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

// ======================
// RUTAS DE AUTENTICACIÓN
// ======================

// REGISTRO
router.post('/register', async (req, res) => {
  try {
    const { nombre, apellido, email, password, telefono } = req.body;

    // Validaciones básicas
    if (!nombre || !apellido || !email || !password) {
      return res.status(400).json({
        error: true,
        message: 'Faltan datos obligatorios'
      });
    }

    // Verificar si el email ya existe
    const usuarioExistente = await usuariosModel.getUsuarioByEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({
        error: true,
        message: 'El email ya está registrado'
      });
    }

    // Registrar el usuario
    await usuariosModel.registrarUsuario({
      nombre,
      apellido,
      email,
      password,
      telefono,
      rol: 'cliente'
    });

    res.status(201).json({
      error: false,
      message: 'Usuario registrado correctamente'
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: 'Error al registrar el usuario'
    });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: 'Email y contraseña son obligatorios'
      });
    }

    const usuario = await usuariosModel.validarLogin(email, password);

    if (!usuario) {
      return res.status(401).json({
        error: true,
        message: 'Email o contraseña incorrectos'
      });
    }

    // Crear token JWT
    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol,
        nombre: usuario.nombre
      },
      process.env.JWT_SECRET || 'carrigo_secret_key_cambiar', // poné una clave segura en el .env
      { expiresIn: '7d' }
    );

    res.json({
      error: false,
      message: 'Login correcto',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: 'Error al iniciar sesión'
    });
  }
});

// ======================
// RUTAS DE NOVEDADES / RESTAURANTES
// ======================

router.get('/novedades', async function (req, res, next) {
  let novedades = await novedadesModel.getNovedades();

  novedades = novedades.map(novedades => {
    if (novedades.img_id) {
      const imagen = cloudinary.url(novedades.img_id, {
        width: 960,
        height: 360,
        crop: 'fill'
      });
      return {
        ...novedades,
        imagen
      }
    } else {
      return {
        ...novedades,
        imagen: ''
      }
    }
  });
  res.json(novedades);
});

// ======================
// CONTACTO
// ======================

router.post('/contacto', async (req, res) => {
  const mail = {
    to: 'arman2314@gmail.com',
    subject: 'Contacto Web',
    html: `${req.body.nombre} se contactó a través de la web y quiere más información a este correo: ${req.body.email}
    <br> Además, hizo el siguiente comentario: ${req.body.mensaje}
    <br> Su teléfono es: ${req.body.telefono}`
  }

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transport.sendMail(mail);

  res.status(201).json({
    error: false,
    message: 'Mensaje Enviado'
  });
});

module.exports = router;