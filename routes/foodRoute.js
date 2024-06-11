import express from 'express';
import { listFood, listActiveFood, listInactiveFood, addFood, deleteFood, recoverFood } from '../controllers/foodController.js';
import multer from 'multer';
const foodRouter = express.Router();

//Image Storage Engine (Saving Image to uploads folder & rename it)

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null,`${Date.now()}${file.originalname}`);
    }
})

const upload = multer({ storage: storage})

foodRouter.get("/list",listFood);
foodRouter.get("/activelist", listActiveFood);
foodRouter.get("/inactivelist", listInactiveFood);
foodRouter.post("/add",upload.single('image'),addFood);
foodRouter.put("/delete", deleteFood);
foodRouter.put("/recover", recoverFood);

export default foodRouter;