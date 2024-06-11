import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    state: { type: Boolean, default: true, required: true},
    creation_date: {type:Date, default:Date.now()}
}, { minimize: false })

const categoryModel = mongoose.models.category || mongoose.model("category", categorySchema);
export default categoryModel;