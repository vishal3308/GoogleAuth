const express = require('express')
const router = express.Router()
const User = require('../Database/Userschema');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const jwtkey = 'e-commerce';
const nodemailer=require('nodemailer')

//================================ Email Send for OTP verification ================
const Send_Mail = async (receiver,otp) => {
  return new Promise((resolve,reject)=>{
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });
  
    let mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: receiver,
      subject: 'Verify VishalStore OTP',
      html: `<h2>Thanks for registering in VishalStore</h2>
      <p style="border:1px solid #000; padding:10px 5px">Please verify your account. Your one time password is <b style="color:red">${otp}</b> which is valid only for 10 minutes.</p>`,
    };
  
      transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log('Email has error ',err.message);
        reject(err);
      } else {
        console.log('Email has sent');
        resolve("Email has sent successfully");
      }
    });  
  })
  
}
// ================================== Sign up====================

router.post('/signup', async (req, resp) => {
  const data = new User(req.body);
  await data.save().then(async (result) => {
    await Send_Mail(result.email,result.Account.OTP).then((mail)=>{
      let user = result.toObject();
      delete user.password;
      delete user.Account;
      jwt.sign({ user }, jwtkey, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) }, (err, token) => {
        if (err) {
          resp.status(401).send({ Error: 'Something went wrong, please try to login.' })
        }
        resp.status(200).send({ user, auth: token, Error: false,Mail:mail })
      })

    })
    .catch(err=>resp.status(403).send({Error:"Failed to send Email for OTP verification"}))
  })
    .catch(err => {
      resp.status(403).send({ Error: "Email id is already exist, please login." })
    });

})
// ================================== Login====================
router.post('/login', async (req, resp) => {
  let Email = req.body.email;
  let Password = req.body.password;
  let user = await User.findOne({ email: Email }, { registration_type: 1, password: 1, name: 1, email: 1, avatar: 1 });
  if (user) {
    if (user.registration_type == 'Local') {
      const Hash_Pass = user.password;
      await bcrypt.compare(Password, Hash_Pass).then(valid => {
        if (valid) {
          jwt.sign({ user }, jwtkey, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) }, (err, token) => {
            if (err) {
              resp.status(401).send({ Error: 'Something went wrong.' })
            }
            user = user.toObject();
            delete user.password;
            delete user._id;
            resp.status(200).send({ user, auth: token, Error: false })
          })
        }
        else {
          resp.status(401).send({ Error: 'Password is wrong.' })
        }
      }).catch(err => resp.status(401).send({ Error: 'Server have some issue please try after some time.' }))
    }
    else {
      resp.status(401).send({ Error: "Please choose 'Continue with Google option'" })
    }
  }
  else {
    resp.status(200).send({ Error: "Email Id is not found.'" })

  }
})

module.exports = router