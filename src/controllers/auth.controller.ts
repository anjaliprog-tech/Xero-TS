import express from 'express';
import oauthClient from './oauthConfig.ts';
import dotenv from 'dotenv';
import axios from 'axios';

export const authCallback =
  async (req: express.Request, res: express.Response) => {
    const { code } = req.query;

    try {
      const tokenParams = {
        code: code as string,
        redirect_uri: process.env.XERO_REDIRECT_URI!,
        scope: process.env.XERO_SCOPES!,
      };

      const accessToken = await oauthClient.getToken(tokenParams);
      console.log('Tokens:', accessToken.token);

      // Save access_token & refresh_token
      res.cookie('XeroAccessToken', accessToken.token.access_token);
      res.cookie('XeroRefreshToken', accessToken.token.refresh_token);

      res.send('Xero Auth Successful. Tokens acquired.');
    } catch (error) {
      console.error('Access Token Error', error);
      res.status(500).json('Authentication failed');
    }
  }

export const authConnect = async (req: express.Request, res: express.Response) => {
  try {
    const authorizationUri = oauthClient.authorizeURL({
      redirect_uri: process.env.XERO_REDIRECT_URI!,
      scope: process.env.XERO_SCOPES!,
      state: '123',
    });
    res.redirect(authorizationUri);
  } catch (error) {
    console.error('Access Token Error', error);
    res.status(500).json('Authentication failed');
  }

}
export const refreshAccessToken = async (refreshToken: string) => {
  const tokenObject = oauthClient.createToken({ refresh_token: refreshToken });

  const newToken = await tokenObject.refresh();
  console.log('Refreshed Token:', newToken.token);

  // Save new access_token & refresh_token
  return newToken.token;
};

export const getTenantData = async(req: express.Request, res: express.Response) => {
  try {
    const tenantData = await axios.get('https://api.xero.com/connections', {
      headers: {
        Authorization: `${req.header('Authorization')}`
      }
    })
    console.log("🚀 ~ getTenantData ~ tenantData:", tenantData)
    res.status(200).send({data : tenantData?.data})
  } catch(err) {
    console.log(err)
    res.status(500).json('something went wrong');
  }
}