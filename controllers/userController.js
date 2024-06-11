import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// Create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// List users
const listUser = async (req, res) => {
  try {
    const users = await userModel.find({});
    console.log("Usuarios listados");
    res.json({ success: true, data: users });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "El usuario no existe" });
    }

    const token = createToken(user._id);
    console.log(token);
    res.json({ success: true, message: "Logeado", data: {token: token} });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};

// Register user
const registerUser = async (req, res) => {
  const { name, lastname, email } = req.body;
  try {
      // Crear un nuevo usuario y guardarlo en la base de datos
      const newUser = new userModel({
        name,
        lastname,
        email,
      });
      const user = await newUser.save();

      // Responder con éxito y el token generado
      const token = createToken(user._id);
      console.log("Usuario creado exitosamente");
      res.json({ success: true, data: {token: token} });
    
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};

// Get user by ID
const getUserId = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }
    res.json({ success: true, data: userData });
    console.log("Funciona");
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Token inválido" });
  }
};

export { listUser, loginUser, registerUser, getUserId };
