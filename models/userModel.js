import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    photo_profile: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    creation_date: {type:Date,default:Date.now()},
    cartData:{type:Object,default:{}}
}, { minimize: false })

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;