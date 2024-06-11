import validator from "validator";
import bcrypt from "bcrypt";
import employeeModel from "../models/employeModel.js";

//create token
const listEmployee = async (req, res) => {
  try {
    const employees = await employeeModel.find({});
    console.log("Empleados listados");
    res.json({ success: true, data: employees });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//register user
const registerEmployee = async (req, res) => {
  const { name, lastname, ci, email, password } = req.body;
  try {
    
    // Comprobar si el usuario ya existe
    const exists = await employeeModel.findOne({ ci});
    if (exists) {
      return res.json({ success: false, message: "El empleado ya existe" });
    }

    // Validar el formato de correo electrónico y la fortaleza de la contraseña
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Por favor introduce un correo válido",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Por favor introduce una contraseña fuerte",
      });
    }

    // Hashear la contraseña del usuario
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear un nuevo usuario y guardarlo en la base de datos
    const newEmployee = new employeeModel({
      name,
      lastname,
      ci,
      email,
      password: hashedPassword,
    });
    const employee = await newEmployee.save();

    // Responder con éxito y el token generado
    res.json({ success: true, message: "Usuario agregado" })
    console.log("Usuario creado exitosamente")
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


export { listEmployee, registerEmployee };
