const { Passport } = require('passport');
const passport = require('passport');
const Users = require('../models/Users');

const LocalStrategy  = require('passport-local').Strategy;

const User = require ('../models/Users');
passport.use(new LocalStrategy ({
    usernameField: 'correo'
}, async (correo, password, done) => {
    const user = await Users.findOne({correo: correo});
    if(!user){
        return done(null, false, {message: 'No encontrado user'});
    } else{
        const match = await user.matchpass(password);
        if(match){
            return done(null, user);
        }else {
            return done(null, false, {message: 'Incorrecto password'});
        }        
    }
 }));

passport.serializeUser((user, done )=>{
   done (null, user.id);   
});

passport.deserializeUser((id, done )=> {
    User.findById(id, (err,user)=>{
        done (err, user);     
    });
});

