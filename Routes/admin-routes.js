import express from 'express';
import { addAdmin, adminLogin } from '../Contrrollers/admin-conrtroller.';

const adminRouter = express.Router();

adminRouter.post("/signup",addAdmin)
adminRouter.post("/login",adminLogin)

export default adminRouter;