import express from 'express';
import {customerOrder}  from '../controllers/order.controller.ts';

const router = express.Router();

router.post('/create', customerOrder);


export default router;