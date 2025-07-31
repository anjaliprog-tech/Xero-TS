// src/oauthConfig.ts
import { AuthorizationCode } from 'simple-oauth2';
import dotenv from 'dotenv';

dotenv.config();

const client = new AuthorizationCode({
  client: {
    id: process.env.XERO_CLIENT_ID!,
    secret: process.env.XERO_CLIENT_SECRET!,
  },
  auth: {
    tokenHost: 'https://identity.xero.com',
    authorizePath: '/connect/authorize',
    tokenPath: '/connect/token',
  },
});

export default client;
