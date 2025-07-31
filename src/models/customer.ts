import dbSequelize from "./db.ts";

import { DataTypes } from "sequelize";

const Customer = dbSequelize.define('customers', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  xero_contact_id: {
    type: DataTypes.INTEGER
  },
  contact_status: {
    type: DataTypes.STRING
  },
  first_name: {
    type: DataTypes.STRING
  },
  last_name : {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  }
  }, {
  timestamps: true
})

export default Customer