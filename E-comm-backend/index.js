const express=require('express');
const session=require('express-session')
const passport=require('passport')
const cors=require('cors')
const jwt=require('jsonwebtoken');
const User=require('./Database/Userschema');
const Product=require('./Database/Productschema');
const jwtkey='e-commerce';
const PORT=process.env.PORT ||4000;
const PortalURL='http://localhost:3000'
require('./Database/MongoConnect');
require('./Passport/googleauth');
const app=express();
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
app.get('/',async(req,resp)=>{
  resp.redirect('/auth/google');
})
// =========================== verifying JWT Token as Middleware==========
const verifyingJWT=(req,resp,next)=>{
  const token=req.headers['authorization'];
  jwt.verify(token,jwtkey,(err,valid)=>{
    if(err){
      resp.send({Error:err.message+", Please login again."})
    }
    else{
      req.body.userid=valid.user._id;
      next();
    }
  })
}

// ================================Google Authentication===================

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login/failure' }),async (req,resp)=>{
    const user=req.user
    jwt.sign({user},jwtkey,{expiresIn:Math.floor(Date.now() / 1000) + (60 * 60)},(err,token)=>{
      if(err){
        resp.redirect(PortalURL+`/login?Error=${err.message}`)
      }
      resp.redirect(PortalURL+`/Authenticate?auth=${token}&name=${req.user.name}&email=${req.user.email}&avatar=${req.user.avatar}`)
  })
  }
  );

// -----------------------------------------------------------
// ==================Checking User login with google ================
app.get('/login/failure',(req,resp)=>{
  resp.status(401).send('Login failed')
})
// app.get('/login/success',(req,resp)=>{

//     resp.status(200).send({'Login session':req.session,'User':req.isAuthenticated()})
// })

  // ================================== Sign up====================
app.post('/signup',async(req,resp)=>{
    let Email=req.body.email;
    let userExist=await User.findOne({email:Email});
    if(userExist){
        resp.send({Error:"Email id is already exist, please login with Email and Password"});
    }
    else{
        const data=new User(req.body);
        let user=await data.save();
        user=user.toObject();
        delete user.password;
        jwt.sign({user},jwtkey,{expiresIn:Math.floor(Date.now() / 1000) + (60 * 60)},(err,token)=>{
            if(err){
                resp.send({Error:'Something went wrong'})
            }
            resp.send({user,auth:token,Error:false})
        })

    }

})
  // ================================== Login====================
app.post('/login',async(req,resp)=>{
    let Email=req.body.email;
    let Password=req.body.password;
    const user=await User.findOne({$and:[{email:Email},{password:Password}]},{name:1,email:1});
    if(user){
        jwt.sign({user},jwtkey,{expiresIn:Math.floor(Date.now() / 1000) + (60 * 60)},(err,token)=>{
            if(err){
                resp.status(401).send({Error:'Something went wrong.'})
            }
            resp.send({user,auth:token,Error:false})
        })
    }
    else{
        resp.send({Error:'Email or password is wrong.'})
    }
})
// ======================================== Add product====================
app.post('/addproduct',verifyingJWT,async(req,resp)=>{
  const Addproduct= new Product(req.body);
  await Addproduct.save().then((result)=>{
    resp.status(200).send({Message:"Successfully Added"});

  }).catch(err=>{
    resp.status(403).send({Error:err.message})
  });
})

// ============================ Product list of only particular User===========
  app.get('/productlist',verifyingJWT,async(req,resp)=>{
    const productlist=await Product.find({userid:req.body.userid},{userid:0})
    if(productlist.length >0){
      resp.status(200).send({Products:productlist})
    }
    else{
      resp.status(401).send({Error:'You have not added any product for sell.'})
    }
  })

  // ========================= Getting single Product info for updating ===================
  app.post('/productinfo',verifyingJWT,async(req,resp)=>{
    const userId=req.body.userid;
    const product=await Product.findOne({$and:[{_id:req.body.productid},{userid:userId}]},{userid:0});
    // if(product){
    //   console.log(product)
    // }
    resp.send({product:product})
  })
  // =========================Product updating ===================
  app.post('/updateproduct',verifyingJWT,async(req,resp)=>{
    const data=req.body;
    let update=await Product.updateOne({$and:[{_id:req.body.productid},{userid:req.body.userid}]},{$set:data})
    if(update.acknowledged){
      resp.send({Message:"Successfully Updated"})
    }
    else{
      resp.send({Error:"Update Failed, please try again."})
    }
  })

// ========================================= Logout ===========
app.get('/logout',(req,resp)=>{
    req.logout(()=>{
      console.log('Logged out !!')
    });
    resp.send('Successfully logout');
})

app.listen(PORT);