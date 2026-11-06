var pool = require('./bd');
var bcrypt = require('bcrypt');

// Buscar usuario por email (para login y para verificar si ya existe)
async function getUsuarioByEmail(email) {
  try {
    var query = 'SELECT * FROM usuarios WHERE email = ? LIMIT 1';
    var rows = await pool.query(query, [email]);
    return rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Registrar nuevo usuario
async function registrarUsuario(usuario) {
  try {
    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(usuario.password, salt);

    var obj = {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      password: passwordHash,
      rol: usuario.rol || 'cliente',
      telefono: usuario.telefono || null
    };

    var query = 'INSERT INTO usuarios SET ?';
    var rows = await pool.query(query, [obj]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Validar login (compara password hasheada)
async function validarLogin(email, password) {
  try {
    var usuario = await getUsuarioByEmail(email);
    if (!usuario) {
      return null; // No existe el email
    }

    // Comparar la contraseña ingresada con la hasheada
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return null; // Contraseña incorrecta
    }

    // No devolver la password
    delete usuario.password;
    return usuario;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Traer usuario por ID
async function getUsuarioById(id) {
  try {
    var query = 'SELECT id, nombre, apellido, email, rol, telefono, created_at FROM usuarios WHERE id = ?';
    var rows = await pool.query(query, [id]);
    return rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  getUsuarioByEmail,
  registrarUsuario,
  validarLogin,
  getUsuarioById
};