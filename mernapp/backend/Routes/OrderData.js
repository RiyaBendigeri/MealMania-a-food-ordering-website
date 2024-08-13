/*const express=require("express")
const router=express.Router()
const Order=require("../models/Orders")

router.post('/orderData',async(req,res)=>{
    console.log("Request Body:", req.body); // Log the request body
    let data=req.body.order_data;
    await data.splice(0,0,{Order_date:req.body.order_date})

    let eId=await Order.findOne({'email':req.body.email})
    console.log(eId)
    if(eId===null){
        try{
            await Order.create({
                email:req.body.email,
                order_data:[data]

            }).then(()=>{
                res.json({success:true})
            })
        }catch(error){
            console.log(error.message)
            res.status(500).send("Server error: " + error.message);
        }
    }
    else{
        try{
            await Order.findOneAndUpdate({email:req.body.email},
                {
                    $push:{order_data:data}}).then(()=>{
                        res.json({success:true})
                    })

        }catch(error){
            res.send("Server error",error.message)
        }
    }

})
router.post('/myorderData',async(req,res)=>{
    try{
        let myData=await Order.findOne({'email':req.body.email})
        res.json({orderData:myData})

    }catch(error){
        res.send("server error",error.message)

    }

})
module.exports=router;*/
const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post('/orderData', async (req, res) => {
    console.log("Request Body:", req.body); // Log the request body
    let data = req.body.order_data;
    await data.splice(0, 0, { Order_date: req.body.order_date });

    try {
        let eId = await Order.findOne({ 'email': req.body.email });
        console.log(eId);
        if (eId === null) {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
            res.json({ success: true });
        } else {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            res.json({ success: true });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error: " + error.message);
    }
});

router.post('/myorderData', async (req, res) => {
    try {
        let myData = await Order.findOne({ 'email': req.body.email });
        if (myData) {
            res.json({ orderData: myData.order_data }); // Return only the order_data array
        } else {
            res.json({ orderData: [] }); // Return an empty array if no data found
        }
    } catch (error) {
        res.status(500).send("Server error: " + error.message);
    }
});

module.exports = router;
/*const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    try {
       /* const email=req.body.email;
        const orderData = req.body.order_data || []; // Default to empty array if not provided
    const orderDate = req.body.order_date || new Date().toDateString(); // Default to current date if not provided
    const { order_data, email, order_date } = req.body;


    if (!order_data || !email || !order_date) {
        
        return res.status(400).json({ error: 'Missing required fields' });
    }

        // Validate email presence
        if (!email) {
            return res.status(400).send("Email is required");
        }

        // Assuming `Order` model is defined correctly in '../models/Orders'
        let eId = await Order.findOne({ email });

        if (eId === null) {
            await Order.create({
              /*email: userEmail,
              order_data: [orderData]
              email,
              order_data: [order_data]
            }).then(() => {
              res.json({ success: true });
            });
          } /*else {
            /*await Order.findOneAndUpdate({ email: userEmail }, {
              $push: { order_data: orderData }
            }).then(() => {
              res.json({ success: true });
            });
          }
        }
          else {
            await Order.findOneAndUpdate({ email }, {
                $push: { order_data }
            });
        }

        res.status(200).json({ success: true });
    } 
        catch (error) {
          console.error('Error processing order:', error);
          res.status(500).json({ error: 'Server error' });
        }
      });
      
      module.exports = router;*/