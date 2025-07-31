import dbSequelize from "./db.ts";

import { DataTypes } from "sequelize";

const Product = dbSequelize.define('products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  xero_product_id: {
    type: DataTypes.STRING
  },
  product_name: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  purchase_price: {
    type: DataTypes.FLOAT
  },
  sale_price : {
    type: DataTypes.FLOAT
  }
  }, {
  timestamps: true
})

export default Product