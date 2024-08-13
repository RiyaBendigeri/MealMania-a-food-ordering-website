


require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mongoDB = require('./db.js');
const createUserRouter = require('./Routes/createUser');
const DisplayData=require("./Routes/DisplayData");
const DisplayOrder=require("./Routes/OrderData")
const cors = require('cors'); // Import cors package
const app = express();
const port = process.env.PORT || 5000;
app.use(cors()); // Use cors middleware for all routes

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use(express.json()); // Middleware to parse JSON request bodies

// Mount the createUser router at /api
app.use('/api', createUserRouter);
app.use('/api',DisplayData);
app.use('/api',DisplayOrder);
/*mongoose.connect(process.env.URL, {
    
})
.then(() => {
    app.listen(port, async () => {
        console.log(`Listening on port ${port}`);

        const db = mongoose.connection.db;//
        console.log('Database connection successful:', db.databaseName);

        const collectionName = 'sample'; // Adjust collection name as per your actual collection

        // Fetch the collection
        const collection = db.collection(collectionName);
        console.log('Collection fetched successfully:', collection.collectionName);

        // Perform query on the collection
        try {
            const data = await collection.find({}).toArray();
            if (data.length === 0) {
                console.log('No data found in the collection');
            } else {
                //console.log('Data fetched from the collection:', data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
*/
mongoDB().then(()=>{
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
      });
    
  
});


