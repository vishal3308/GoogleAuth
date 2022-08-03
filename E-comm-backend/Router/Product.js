const express=require('express')
const router=express.Router();
const Product = require('../Database/Productschema');
const jwt = require('jsonwebtoken');
const jwtkey = 'e-commerce';


// =========================== verifying JWT Token as Middleware==========
const verifyingJWT = (req, resp, next) => {
    const token = req.headers['authorization'];
    jwt.verify(token, jwtkey, (err, valid) => {
      if (err) {
        resp.status(401).send({ Error: err.message + ", Please login again." })
      }
      else {
        req.body.userid = valid.user._id;
        next();
      }
    })
  }
//   ================= Product API==================
router.post('/addproduct', verifyingJWT, async (req, resp) => {
    const Addproduct = new Product(req.body);
    await Addproduct.save().then((result) => {
      resp.status(200).send({ Message: "Successfully Added" });
  
    }).catch(err => {
      resp.status(403).send({ Error: err.message })
    });
  })
  
  // ============================ Product list of only particular User===========
  router.get('/productlist', verifyingJWT, async (req, resp) => {
    const productlist = await Product.find({ userid: req.body.userid }, { userid: 0 })
    if (productlist.length > 0) {
      resp.status(200).send({ Products: productlist })
    }
    else {
      resp.status(200).send({ Error: 'You have not added any product for sell.' })
    }
  })
  
  // ========================= Getting single Product info for updating ===================
  router.post('/productinfo', verifyingJWT, async (req, resp) => {
    const userId = req.body.userid;
    await Product.findOne({ $and: [{ _id: req.body.productid }, { userid: userId }] }, { userid: 0 })
      .then((result) => {
        if (result) {
          resp.status(200).send({ product: result })
        }
        else {
          resp.status(404).send({ Error: "Failed to fetch product details" })
        }
  
      }).catch(err => {
        resp.status(401).send({ Error: "Either Product Id or something is wrong." })
      });
  })
  // =========================Product updating ===================
  router.post('/updateproduct', verifyingJWT, async (req, resp) => {
    const data = req.body;
    await Product.updateOne({ $and: [{ _id: req.body.productid }, { userid: req.body.userid }] }, { $set: data })
      .then((result) => {
        if (result.acknowledged) {
          resp.status(200).send({ Message: "Successfully Updated" })
        }
        else {
          resp.status(404).send({ Error: "Update Failed, please try again." })
        }
  
      }).catch(err => {
        resp.status(401).send({ Error: err.message })
      });
  })
  // ======================= Deleting Product ==================
  router.post('/deleteproduct', verifyingJWT, async (req, resp) => {
  
    await Product.deleteOne({ $and: [{ _id: req.body.productid }, { userid: req.body.userid }] })
      .then((result) => {
        if (result.deletedCount) {
          resp.status(200).send({ Message: "Successfully Deleted" })
        }
        else {
          resp.status(404).send({ Error: "Deletion Failed, please try again." })
        }
  
      }).catch(err => {
        resp.status(401).send({ Error: err.message })
      });
  })
  
module.exports=router