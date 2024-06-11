import express from "express";
import { listEmployee, registerEmployee } from "../controllers/employeeController.js";
const employeeRouter = express.Router();

employeeRouter.get("/list", listEmployee);
employeeRouter.post("/register", registerEmployee);

export default employeeRouter;
