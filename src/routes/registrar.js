const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const serssion = require("express-session");


router.post('/registrarse', async (req, res) => 
{
    // variables
    const { nombre, apellido, correo, usuario, password } = req.body;

    var id = Math.random();
    const hoy = new Date();
    const errors = [];

        const uri ="mongodb+srv://Anayte:12345@twitpin.sj7o8.gcp.mongodb.net/twitpin?retryWrites=true&w=majority";
        const client = new MongoClient(uri);

        try
        {
            // conectar al cliente 
            await client.connect();

            // acceder a la base 
            const database = client.db('twitpin');
            const collection = database.collection('registro');

            // Query para crear nuevo twit
            const query = {
                id_usaurio: id,
                nombre: nombre,
                apellido: apellido,
                correo: correo,
                usuario : usuario,
                password: password,
                date: hoy};
            const validar = await collection.insertOne(query);

            // imprime lo encontrado
            if(validar != null)
            {
                res.redirect('/signin');
            }
            else
            {
                console.log('Error al publicar');
            }
        }
        catch (err)
        {
            console.log('err');
            res.redirect('/signin');
        }
        finally
        {
            // imprime el resultado 
            //run().catch(console.dir);
            // cierra la coneccion 
            await client.close();
        }
    

});

router.post('/login', async (req, res) => 
{
    // variables
    const { usuario, password} = req.body;

    var id = '1000';
    var numero = 1;
    const hoy = new Date();
    const errors = [];

        const uri ="mongodb+srv://Anayte:12345@twitpin.sj7o8.gcp.mongodb.net/twitpin?retryWrites=true&w=majority";
        const client = new MongoClient(uri);

        try
        {
            // conectar al cliente 
            await client.connect();

            // acceder a la base 
            const database = client.db('twitpin');
            const collection = database.collection('registro');

            // Query para crear nuevo twit
            
            const validar = await collection.findOne({usuario: usuario, password:password});

            // imprime lo encontrado
            if(validar != null)
            {   
                //validar.date= new Date(validar.date);
                req.session.Usuario= validar;
                client.close();
                res.redirect('/profile');
            }
            else
            {
                console.log('Error al publicar');
            }
        }
        catch (err)
        {
            console.log('err');
            res.redirect('/signin');
        }
        finally
        {
            // imprime el resultado 
            //run().catch(console.dir);
            // cierra la coneccion 
            await client.close();
        }
    

});



router.get('/signin', (req, res) => {
    res.render('users/signin');
});

router.get('/signup', (req, res) => {
    res.render('users/signup');
});

router.get('/logout', function(req, res, next) {
    req.session.destroy();
    res.render('users/signin');
});
module.exports = router;