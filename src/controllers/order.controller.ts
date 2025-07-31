import axios from 'axios';
import express from 'express'
export const customerOrder = async (req: express.Request, res: express.Response) => {
  try {
    const accessToken = req.header('Authorization');
    const tenantId = req.header('XeroTenantId'); // Or store this after `/connections` API
    const response = await axios.post(
      'https://api.xero.com/api.xro/2.0/order',
      {
        Order: [
          {
            "customer_id": 1,
            "products": [
              { "product_id": 1, "quantity": 2 },
              { "product_id": 2, "quantity": 1 }
            ]
          }

        ],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'xero-tenant-id': tenantId,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('order created:', response.data.order[0]);
  } catch (error: any) {
    console.error('Failed to create order in Xero:', error?.response?.data || error.message);
  }
};

