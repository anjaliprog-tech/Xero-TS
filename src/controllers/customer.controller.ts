import express from 'express';
import axios from 'axios';
import {CustomerAddress, Customer} from '../models/index.ts';

export const syncXeroCustomers = async (req: express.Request, res: express.Response) => {
  const accessToken = req.header('Authorization');
  const tenantId = req.header('XeroTenantId'); // Or store this after `/connections` API

  if (!accessToken || !tenantId) {
    return res.status(401).json({ error: 'Missing access token or tenant ID' });
  }

  try {
    const response = await axios.get('https://api.xero.com/api.xro/2.0/Contacts', {
      headers: {
        Authorization: accessToken,
        'xero-tenant-id': tenantId,
        Accept: 'application/json',
      },
    });

    const customers = response.data.Contacts;

    if(customers && customers?.length > 0) {
      await Promise.all(customers.map(async (customer: any) => {
        const newCustomer = await Customer.create({
          xero_contact_id: customer.ContactID,
          contact_status: customer.Status,
          first_name: customer.FirstName,
          last_name: customer.LastName,
          email: customer.Email
        })

        if(customer?.Addresses?.length > 0) {
          await Promise.all(customer.Addresses.map(async (address: any) => {
            await CustomerAddress.create({
              user_id: newCustomer?.dataValues?.id,
              address_type: address.AddressType,
              address_line_1: address.AddressLine1,
              address_line_2: address.AddressLine2,
              city: address.City,
              region: address.Region,
              postal_code: address.PostalCode,
              country: address.Country
            })
          }))
        }
      }))
    }

    res.status(200).send({
      message: 'Customers synced successfully'
    })
  } catch (error: any) {
    console.error('Failed to fetch Xero contacts:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to sync customers from Xero' });
  }
};
