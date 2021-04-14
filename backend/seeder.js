//? script for importing sample data
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';
dotenv.config();

//?connect to DB
connectDB();

const importData = async () => {
  try {
    //? delete garbage data from database
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    //? insert sample data
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('data created ');

    process.exit(); //? exit succesfully
  } catch (err) {
    console.error(err);
    process.exit(1); //? exit unsuccessful
  }
};
const destroyData = async () => {
  try {
    //? delete  data from database
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.error('data destroyed ');
    process.exit(); //? if this line not added then the connection will remain open 
  } catch (err) {
    console.log(err);
    process.exit(1); //? exit unsuccessfully
  }
};

if (process.argv[2] === '-d') destroyData();
else importData();
