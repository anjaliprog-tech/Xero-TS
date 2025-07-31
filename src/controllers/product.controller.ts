import express from 'express';
import axios from 'axios';
import { Product } from '../models/index.ts';

export const syncXeroProducts = async (req: express.Request, res: express.Response) => {
	const accessToken = req.header('Authorization');
	const tenantId = req.header('XeroTenantId'); // Or store this after `/connections` API

	if (!accessToken || !tenantId) {
		return res.status(401).json({ error: 'Missing access token or tenant ID' });
	}

	try {
		const response = await axios.get('https://api.xero.com/api.xro/2.0/Items', {
			headers: {
				Authorization: accessToken,
				'xero-tenant-id': tenantId,
				Accept: 'application/json',
			},
		});

		const invoices = response.data.Invoices;

		if (invoices && invoices?.length > 0) {
			await Promise.all(invoices.map(async (product: any) => {
				 await Product.create({
					xero_product_id: product.ItemID,
					sku_code: product.Code,
					product_name: product.Name,
					description: product.description,
					purchase_price: product?.PurchaseDetails?.UnitPrice,
					sale_price: product?.PurchaseDetails?.UnitPrice
				})
			}))
		}

		res.status(200).send({
			message: 'Products synced successfully'
		})
	} catch (error: any) {
		console.error('Failed to fetch Xero Products:', error?.response?.data || error.message);
		res.status(500).json({ error: 'Failed to sync Products from Xero' });
	}
};
