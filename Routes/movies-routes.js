import express from 'express';
import { addMovie } from '../Contrrollers/Movies-controllers';

const movieRouter =express.Router();

movieRouter.post("/",addMovie);

export default movieRouter;