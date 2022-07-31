const express = require('express');
const session = require('express-session')
const passport = require('passport')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const User = require('./Database/Userschema');
const Product = require('./Database/Productschema');
const bcrypt = require('bcrypt')
const jwtkey = 'e-commerce';
const PORT = process.env.PORT || 4000;
const PortalURL = 'http://localhost:3000'
require('./Database/MongoConnect');
require('./Passport/googleauth');
const app = express();
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

// =======================Home===================
app.get('/', async (req, resp) => {
  resp.send("Backend Home page");
})
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

// ================================Google Authentication===================

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login/failure' }), async (req, resp) => {
    const user = req.user
    jwt.sign({ user }, jwtkey, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) }, (err, token) => {
      if (err) {
        resp.redirect(PortalURL + `/login?Error=${err.message}`)
      }
      resp.redirect(PortalURL + `/Authenticate?auth=${token}&name=${req.user.name}&email=${req.user.email}&avatar=${req.user.avatar}`)
    })
  }
);

// -----------------------------------------------------------
// ==================Checking User login with google ================
app.get('/login/failure', (req, resp) => {
  resp.status(401).send('Login failed')
})
// app.get('/login/success',(req,resp)=>{

//     resp.status(200).send({'Login session':req.session,'User':req.isAuthenticated()})
// })

// ================================== Sign up====================
app.post('/signup', async (req, resp) => {
  const data = new User(req.body);
  await data.save().then((result) => {
    let user = result.toObject();
    delete user.password;
    jwt.sign({ user }, jwtkey, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) }, (err, token) => {
      if (err) {
        resp.status(401).send({ Error: 'Something went wrong, please try again.' })
      }
      resp.status(200).send({ user, auth: token, Error: false })
    })
  })
    .catch(err => {
      resp.status(403).send({ Error: "Email id is already exist, please login." })
    });




})
// ================================== Login====================
app.post('/login', async (req, resp) => {
  let Email = req.body.email;
  let Password = req.body.password;
  let user = await User.findOne({ email: Email }, { registration_type: 1, password: 1,name: 1, email: 1, avatar: 1 });
  if (user) {
    if (user.registration_type == 'Local') {
      const Hash_Pass = user.password;
      await bcrypt.compare(Password, Hash_Pass).then(valid => {
        if (valid) {
          jwt.sign({ user }, jwtkey, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) }, (err, token) => {
            if (err) {
              resp.status(401).send({ Error: 'Something went wrong.' })
            }
             user=user.toObject();
            delete user.password;
            delete user._id;
            resp.status(200).send({ user, auth: token, Error: false })
          })
        }
        else {
          resp.status(401).send({ Error: 'Password is wrong.' })
        }
      }).catch(err=>resp.status(401).send({ Error: 'Server have some issue please try after some time.' }))
    }
    else {
      resp.status(401).send({ Error: "Please choose 'Continue with Google option'" })
    }
  }
  else {
    resp.status(200).send({ Error: "Email Id is not found.'" })

  }
})
// ======================================== Add product====================
app.post('/addproduct', verifyingJWT, async (req, resp) => {
  const Addproduct = new Product(req.body);
  await Addproduct.save().then((result) => {
    resp.status(200).send({ Message: "Successfully Added" });

  }).catch(err => {
    resp.status(403).send({ Error: err.message })
  });
})

// ============================ Product list of only particular User===========
app.get('/productlist', verifyingJWT, async (req, resp) => {
  const productlist = await Product.find({ userid: req.body.userid }, { userid: 0 })
  if (productlist.length > 0) {
    resp.status(200).send({ Products: productlist })
  }
  else {
    resp.status(200).send({ Error: 'You have not added any product for sell.' })
  }
})

// ========================= Getting single Product info for updating ===================
app.post('/productinfo', verifyingJWT, async (req, resp) => {
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
app.post('/updateproduct', verifyingJWT, async (req, resp) => {
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
app.post('/deleteproduct', verifyingJWT, async (req, resp) => {

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


// ========================================= Logout ===========
app.get('/logout', (req, resp) => {
  req.logout(() => {
    console.log('Logged out !!')
  });
  resp.status(200).send('Successfully logout');
})

app.listen(PORT);