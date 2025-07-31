import dbSequelize from "./db.ts";

import { DataTypes } from "sequelize";

const CustomerAddress = dbSequelize.define('customerAddresses', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  address_type: {
    type: DataTypes.STRING
  },
  address_line_1: {
    type: DataTypes.STRING
  },
  city: {
    type: DataTypes.STRING
  },
  postal_code: {
    type: DataTypes.INTEGER
  },
  country: {
    type: DataTypes.STRING
  }

}, {
  timestamps: true
})

export default CustomerAddress