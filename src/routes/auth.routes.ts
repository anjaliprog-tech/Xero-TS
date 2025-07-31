import express from 'express';
import {authConnect, authCallback, getTenantData} from '../controllers/auth.controller.ts';
const router = express.Router();


router.get('/connect', authConnect);
router.get('/callback', authCallback);
router.get('/tenant-data', getTenantData);

export default router;