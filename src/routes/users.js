const express = require('express');
const { serializeUser } = require('passport');
const Users = require('../models/Users');
const router = express.Router();
const passport = require('passport');


const Twit = require('../models/Publicar');


router.get('/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/users/signin',
    failureFlash: true

}));
router.post('/twitear', async (req, res) => {
    const datosuser = req.user;

    const  twitcont  = req.body;
    const id = 111111;

    const newtwit = new Twit({id, id, twitcont, id, id});

    console.log(newtwit);
    await newtwit.save();
    res.redirect('/profile');

});

router.get('/signup', (req, res) => {
    res.render('users/signup');
});

router.get('/profile2222', async (req, res) => {

    const publicaciones = await Twit.find();
    console.log(publicaciones);
     res.render('users/profile' , {publicaciones});
});

router.post('/users/regis', async (req, res) => {
    // res.render('users/signup');
    // console.log(req.body);
    const { nombre, apellido, correo, usuario, password } = req.body;


    const newuser = new Users({ nombre, apellido, correo, usuario, password });
    // const emailusado = await  Users.findOne({correo: correo});
    // if (emailusado){
    //    res.send('usuario ya usado');
    //} else{
    console.log(newuser);
    //newuser.password = await newuser.encriptpass(password);
    await newuser.save();
    res.redirect('/users/signin');
    //}



    //console.log(newuser);
    //res.send('ok listo');

});


router.post('/users/login', async (req, res) => {
    // res.render('users/signup');
    // console.log(req.body);
    const { id, nombre, apellido, usuario, date } = req.body;
    //const {id, nombre, apellido, usuario, date} = req.body;


    const newuser = new Users({ nombre, apellido, correo, usuario, password });
    // const emailusado = await  Users.findOne({correo: correo});
    // if (emailusado){
    //    res.send('usuario ya usado');
    //} else{
    console.log(newuser);
    //newuser.password = await newuser.encriptpass(password);
    await newuser.save();
    res.redirect('/users/signin');
    //}



    //console.log(newuser);
    //res.send('ok listo');

});





module.exports = router;