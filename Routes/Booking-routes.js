import express from 'express';
import { newBooking } from '../Contrrollers/booking-controroller';

const bookingRouter = express.Router();

bookingRouter.post('/',newBooking)

export default bookingRouter;