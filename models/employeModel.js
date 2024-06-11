import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    ci: { type: String, required: true, unique: true },
    email: { type: String, required: true},
    password: { type: String, required: true },
    state: { type: Boolean, default: true, required: true},
    creation_date: {type:Date, default:Date.now()}
}, { minimize: false })

const employeeModel = mongoose.models.employee || mongoose.model("employee", employeeSchema);
export default employeeModel;