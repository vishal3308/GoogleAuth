const passport = require('passport');
const Googlekey = require('./keys');
const User = require('../Userschema');
// ============Google Authentication===================

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: Googlekey.GOOGLE_CLIENT_ID,
    clientSecret: Googlekey.GOOGLE_CLIENT_SECRET,
    callbackURL: Googlekey.Callback
},
    async (accessToken, refreshToken, profile, done) => {
        let data = {
            name: profile.displayName,
            password: null,
            email: profile.emails[0].value,
            registration_type: 'Google',
            google_id: profile.id,
            avatar:profile.photos[0].value
        }
        const user=await User.findOne({email:data.email})
        if(user){
            console.log('Already Exist ',user)
            done(null, user);
        }
        else{
            const user=await User.create(data);
            console.log("Database crete. ")
            done(null, user);
        }
         
    }
));
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    // User.findById(id, function (err, user) {
    // });
    done(null, user);
});