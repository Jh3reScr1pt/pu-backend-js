import express from "express";
import { listCategory, listActiveCategories, listInactiveCategories, addCategory, deleteCategory, recoverCategory } from '../controllers/categoryController.js';

import multer from 'multer';

const categoryRouter = express.Router();

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null,`${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage});

categoryRouter.get("/list", listCategory);
categoryRouter.get("/activelist", listActiveCategories);
categoryRouter.get("/inactivelist", listInactiveCategories);
categoryRouter.post("/add", upload.single('image'), addCategory);
categoryRouter.put("/delete", deleteCategory);
categoryRouter.put("/recover", recoverCategory);

export default categoryRouter;