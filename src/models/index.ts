import sequelize  from "./db.ts";
import Customer from "./customer.ts";
import CustomerAddress from "./customeraddress.ts";
import Product from "./product.ts";
import Order from "./order.ts";

Customer.hasMany(CustomerAddress, { foreignKey: 'user_id' });
CustomerAddress.belongsTo(Customer, { foreignKey: 'user_id' });
Customer.hasMany(Order, {foreignKey: 'customer_id'});

Product.belongsTo(Order, { foreignKey: 'order_id' });

Order.belongsTo(Customer, { foreignKey: 'customer_id' });
Order.hasMany(Product, { foreignKey: 'order_id' });


export {
  sequelize,
  Customer,
  CustomerAddress,
  Product,
  Order
}