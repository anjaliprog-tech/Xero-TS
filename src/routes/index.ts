
import customerRoutes from './customer.route.ts';
import authRoutes from './auth.routes.ts'
import productRoutes from './item.routes.ts';
import orderRoutes from './order.routes.ts';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/customer', customerRoutes);
router.use('/product', productRoutes);
router.use('/order', orderRoutes);

export default router;