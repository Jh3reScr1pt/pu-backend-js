import foodModel from "../models/foodModel.js";

// Listar todas las comidas
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    console.log("Comidas listadas");
    res.json({
      success: true,
      message: "Comidas listadas",
      data: foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Listar comidas activas
const listActiveFood = async (req, res) => {
  try {
    const foods = await foodModel.find({ state: true });
    console.log("Comidas activas listadas");
    res.json({
      success: true,
      message: "Comidas activas listadas",
      data: foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Listar comidas inactivas
const listInactiveFood = async (req, res) => {
  try {
    const foods = await foodModel.find({ state: false });
    console.log("Comidas inactivas listadas");
    res.json({
      success: true,
      message: "Comidas inactivas listadas",
      data: foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Agregar comida
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const newFood = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
    state: true
  });

  try {
    const food = await newFood.save();
    res.json({ success: true, message: "Comida agregada", data: food });
    console.log("Comida creada exitosamente");
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Eliminar lógicamente una comida
const deleteFood = async (req, res) => {
  try {
    const { id } = req.body;
    const food = await foodModel.findByIdAndUpdate(id, { state: false }, { new: true });
    if (food) {
      console.log("Comida eliminada lógicamente");
      res.json({ success: true, message: "Comida eliminada lógicamente", data: food });
    } else {
      res.status(404).json({ success: false, message: "Comida no encontrada" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Recuperar una comida
const recoverFood = async (req, res) => {
  try {
    const { id } = req.body;
    const food = await foodModel.findByIdAndUpdate(id, { state: true }, { new: true });
    if (food) {
      console.log("Comida recuperada");
      res.json({ success: true, message: "Comida recuperada", data: food });
    } else {
      res.status(404).json({ success: false, message: "Comida no encontrada" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

export { listFood, listActiveFood, listInactiveFood, addFood, deleteFood, recoverFood };
