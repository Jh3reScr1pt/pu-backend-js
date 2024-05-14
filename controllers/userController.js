import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";

//create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//create token
const listUser = async (req, res) => {
  try {
    const users = await userModel.find({});
    console.log("Usuarios listados");
    res.json({ success: true, data: users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//register user
const registerUser = async (req, res) => {
  const { name, lastname, email, password } = req.body;
  try {
    // Comprobar si el usuario ya existe
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validar el formato de correo electrónico y la fortaleza de la contraseña
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // Hashear la contraseña del usuario
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear un nuevo usuario y guardarlo en la base de datos
    const newUser = new userModel({
      name,
      lastname,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    
    // Crear un token para el nuevo usuario
    const token = createToken(user._id);

    // Responder con éxito y el token generado
    res.json({ success: true, message: "Usuario agregado" })
    console.log("Usuario creado exitosamente")
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


export { listUser, loginUser, registerUser };
