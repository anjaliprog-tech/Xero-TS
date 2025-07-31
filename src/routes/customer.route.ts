import express from 'express';
import {syncXeroCustomers}  from '../controllers/customer.controller.ts';

const router = express.Router();

router.get('/sync/xero/customers', syncXeroCustomers);


export default router;