import dbSequelize from "./db.ts";

import { DataTypes } from "sequelize";

const Order = dbSequelize.define('orders', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    type: DataTypes.INTEGER
  },
  customer_id : {
    type: DataTypes.INTEGER
  },
  quantity: {
    type: DataTypes.INTEGER
  }
  }, {
  timestamps: true
})

export default Order