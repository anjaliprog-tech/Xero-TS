import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const dbSequelize = new Sequelize({
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    logging: true
});

export default dbSequelize;