import express from 'express';
import dotenv from 'dotenv';
import dbSequelize from './models/db.ts';
import routes from './routes/index.ts';
import bodyParser from 'body-parser';
import { XeroClient } from 'xero-node';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);
//xero setup
const client_id = process.env.XERO_CLIENT_ID;
const client_secret = process.env.XERO_CLIENT_SECRET;
const redirectUrl = process.env.XERO_REDIRECT_URI;
const scopes = "offline_access openid profile email accounting.transactions accounting.budgets.read accounting.reports.read accounting.journals.read accounting.settings accounting.settings.read accounting.contacts accounting.contacts.read accounting.attachments accounting.attachments.read files files.read assets assets.read projects projects.read payroll.employees payroll.payruns payroll.payslip payroll.timesheets payroll.settings";

const xero = new XeroClient({
  clientId: client_id as string,
  clientSecret: client_secret as string,
  redirectUris: [redirectUrl as string],
  scopes: scopes.split(" "),
  state: "imaParam=look-at-me-go",
  httpTimeout: 2000
});

if (!client_id || !client_secret || !redirectUrl) {
  throw Error('Environment Variables not all set - please check your .env file in the project root or create one!')
}

dbSequelize.authenticate()
  .then(() => {
    console.log('Database Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

dbSequelize.sync({
  force: false
}).then(() => {
  console.log('Database synced successfully.');
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}).catch(err => {
  console.error('Error syncing database:', err);
});


