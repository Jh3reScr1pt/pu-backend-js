import categoryModel from "../models/categoryModel.js";

// Listar todas las categorías
const listCategory = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    console.log("Categorias listadas");
    res.json({
      success: true,
      message: "Categorias listadas",
      data: categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Listar categorías activas
const listActiveCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({ state: true });
    console.log("Categorias activas listadas");
    res.json({
      success: true,
      message: "Categorias activas listadas",
      data: categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Listar categorías inactivas
const listInactiveCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({ state: false });
    console.log("Categorias inactivas listadas");
    res.json({
      success: true,
      message: "Categorias inactivas listadas",
      data: categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Agregar categoría
const addCategory = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  
  const newCategory = new categoryModel({
    name: req.body.name,
    image: image_filename,
  });
  try {
    const category = await newCategory.save();

    res.json({ success: true, message: "Categoría agregada", data: category });
    console.log("Categoría creada exitosamente");
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Eliminar lógicamente una categoría
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.body;
    const category = await categoryModel.findByIdAndUpdate(id, { state: false }, { new: true });
    if (category) {
      console.log("Categoría eliminada lógicamente");
      res.json({ success: true, message: "Categoría eliminada lógicamente", data: category });
    } else {
      res.status(404).json({ success: false, message: "Categoría no encontrada" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Recuperar una categoría
const recoverCategory = async (req, res) => {
  try {
    const { id } = req.body;
    const category = await categoryModel.findByIdAndUpdate(id, { state: true }, { new: true });
    if (category) {
      console.log("Categoría recuperada");
      res.json({ success: true, message: "Categoría recuperada", data: category });
    } else {
      res.status(404).json({ success: false, message: "Categoría no encontrada" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

export { listCategory, listActiveCategories, listInactiveCategories, addCategory, deleteCategory, recoverCategory };
