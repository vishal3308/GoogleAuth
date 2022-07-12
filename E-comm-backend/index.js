const express=require('express');
const session=require('express-session')
const passport=require('passport')
const cors=require('cors')
const jwt=require('jsonwebtoken');
const User=require('./Userschema');
const jwtkey='e-commerce';
const PORT=process.env.PORT ||4000;
const PortalURL='http://localhost:3000'
require('./MongoConnect');
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
// ============Google Authentication===================

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login/failure' }),async (req,resp)=>{
    const user=req.user
    jwt.sign({user},jwtkey,{expiresIn:Math.floor(Date.now() / 1000) + (60 * 60)},(err,token)=>{
      if(err){
        resp.redirect(PortalURL)
      }
      resp.redirect(PortalURL+`/Authenticate?auth=${token}&name=${req.user.name}&email=${req.user.email}&avatar=${req.user.avatar}`)
  })
  }
  );

// -----------------------------------------------------------
// ==================Checking User login with google ================
app.get('/login/success',(req,resp)=>{

    resp.status(200).send({'Login session':req.session,'User':req.isAuthenticated()})
})
app.get('/login/failure',(req,resp)=>{
  resp.status(401).send('Login failed')
})
  // ==================================

app.post('/signup',async(req,resp)=>{
    let Email=req.body.email;
    let userExist=await User.findOne({email:Email});
    console.log(userExist);
    if(userExist){
        resp.send({status:"Email id is already exist, please login with Email and Password"});
    }
    else{
        const data=new User(req.body);
        let result=await data.save();
        result=result.toObject();
        delete result.password;
        jwt.sign({result},jwtkey,{expiresIn:Math.floor(Date.now() / 1000) + (60 * 60)},(err,token)=>{
            if(err){
                resp.send({status:'Something went wrong'})
            }
            resp.send({result,auth:token,status:false})
        })

    }

})

app.post('/login',async(req,resp)=>{
    let Email=req.body.email;
    let Password=req.body.password;
    const result=await User.findOne({$and:[{email:Email},{password:Password}]},{name:1,email:1});
    if(result){
        jwt.sign({result},jwtkey,{expiresIn:Math.floor(Date.now() / 1000) + (60 * 60)},(err,token)=>{
            if(err){
                resp.send({status:'Something went wrong.'})
            }
            resp.send({result,auth:token,status:false})
        })
    }
    else{
        resp.send({status:'Email or password is wrong.'})
    }
})

app.get('/',async(req,resp)=>{
    resp.redirect('/auth/google');
})
app.get('/logout',(req,resp)=>{
    req.logout(()=>{
      console.log('Logged out !!')
    });
    resp.redirect(PortalURL);
})

app.listen(PORT);