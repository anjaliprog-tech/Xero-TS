import express from 'express';
import {syncXeroProducts}  from '../controllers/product.controller.ts';

const router = express.Router();

router.get('/sync/xero/products', syncXeroProducts);


export default router;