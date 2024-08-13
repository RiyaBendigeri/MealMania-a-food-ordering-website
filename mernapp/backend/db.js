/*const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 5000;
const URL = process.env.URL;
const mongoDB=async()=>{
    try{
      await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        tls: false,
      });
        console.log('Database connection successful');
    
    const db = mongoose.connection.db;
    const collection = db.collection('sample');
    
    const data = await collection.find({}).toArray();
    if (data.length === 0) {
      console.log('No data found in the collection');
    } else {
      global.sample = data;
      console.log('Data fetched from the collection:', global.sample);
    }

    const foodCategory= db.collection("foodcategory");
    const foodCategoryData=await foodCategory.find({}).toArray();
    if(foodCategoryData.length==0)
        {
            console.log('No data found in the foodCategory collection');
        }
    else{
        global.foodCategory = foodCategoryData;
        console.log('Data fetched from the foodCategory collection:', global.foodCategory);
    }


   
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = mongoDB;*/
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 5000;
const URL = process.env.URL;

mongoose.set('debug', true);  // Enable detailed logging

const connectWithRetry = async () => {
  console.log('Connecting to MongoDB with URL:', URL);

  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      ssl: true,
    });
    console.log('Database connection successful');

    const db = mongoose.connection.db;
    const collection = db.collection('sample');
    const data = await collection.find({}).toArray();
    if (data.length === 0) {
      console.log('No data found in the collection');
    } else {
      global.sample = data;
      console.log('Data fetched from the collection:', global.sample);
    }

    const foodCategory = db.collection("foodcategory");
    const foodCategoryData = await foodCategory.find({}).toArray();
    if (foodCategoryData.length === 0) {
      console.log('No data found in the foodCategory collection');
    } else {
      global.foodCategory = foodCategoryData;
      console.log('Data fetched from the foodCategory collection:', global.foodCategory);
    }

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
  }
};

module.exports = connectWithRetry;

    




