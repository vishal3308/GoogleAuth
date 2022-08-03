const express = require('express');
const session = require('express-session')
const passport = require('passport')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const jwtkey = 'e-commerce';
const PORT = process.env.PORT || 4000;
const PortalURL = 'http://localhost:3000';
const Sign_Login=require('./Router/Sign_Login')
const Product_Route=require('./Router/Product')
const nodemailer=require('nodemailer')
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
  resp.redirect(PortalURL + `/login?Error=Login failed please try different method`)

})

// ================================== Sign up and Login Route====================
app.use('/',Sign_Login)
// ======================================== Product Route====================
app.use('/',Product_Route)
// ========================================= Logout ===========
app.get('/logout', async (req, resp) => {
  req.logout(() => {
    console.log('Logged out !!')
  });
  resp.status(200).send('Successfully logout');
})

app.listen(PORT,()=>{
  console.log('Server is running..')
});