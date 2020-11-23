const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");

router.post('/twit', async (req, res) => {
    // variables
    const { twitcont } = req.body;
    const datouser= req.session.Usuario;
    var numero = Math.random();
    const hoy = new Date();
    const errors = [];

    if (!twitcont) {
        errors.push({ text: "Debe escribir 1 al menos 1 caracter" });
        res.render('/profile');
    }
    else {

        const uri = "mongodb+srv://Anayte:12345@twitpin.sj7o8.gcp.mongodb.net/twitpin?retryWrites=true&w=majority";
        const client = new MongoClient(uri);

        try {
            // conectar al cliente 
            await client.connect();

            // acceder a la base 
            const database = client.db('twitpin');
            const collection = database.collection('twit');

            // Query para crear nuevo twit
            const query = {
                id_twit: numero,
                usuario: datouser.usuario,
                twit: twitcont,
                id_comentario: "",
                id_usuario_comentario: "",
                date: hoy
            };
            const validar = await collection.insertOne(query);

            // imprime lo encontrado
            if (validar != null) {
                res.redirect('profile');
            }
            else {
                console.log('Error al publicar');
            }
        }
        catch (err) {
            console.log('err');
            res.render('/signin');
        }
        finally {
            // imprime el resultado 
            //run().catch(console.dir);
            // cierra la coneccion 
            await client.close();
        }
    }

});

router.get('/profile', async (req, res) => {

    if (req.session.Usuario) {

        const uri = "mongodb+srv://Anayte:12345@twitpin.sj7o8.gcp.mongodb.net/twitpin?retryWrites=true&w=majority";
        const client = new MongoClient(uri);

        try {
            // conectar al cliente 
            await client.connect();

            // acceder a la base 
            const database = client.db('twitpin');
            const collection = database.collection('twit');

            // Query para crear nuevo twit

            const twits = await collection.find().sort( { fecha: -1 } ).toArray();

            // imprime lo encontrado
            if (twits != null) {

                //req.twits = twits;
                console.log(twits);
                client.close();
                res.render('users/profile', { twits });

            }
            else {
                console.log('Error al publicar');
            }
        }
        catch (err) {
            console.log(err);
            res.redirect('/signin');
        }
        finally {
            // imprime el resultado 
            //run().catch(console.dir);
            // cierra la coneccion 
            await client.close();
        }
    }
    else {
        res.redirect('/signin');
    }




});

router.post('/profile/search', async (req, res) => {

    if (req.session.Usuario) {
        const  {busqueda}  = req.body;
            
        if (!busqueda) {
           // errors.push({ text: "Debe escribir 1 al menos 1 caracter" });
            res.redirect('/profile');
        }
        else {

        const uri = "mongodb+srv://Anayte:12345@twitpin.sj7o8.gcp.mongodb.net/twitpin?retryWrites=true&w=majority";
        const client = new MongoClient(uri);

        try {
            // conectar al cliente 
            await client.connect();

            // acceder a la base 
            const database = client.db('twitpin');
            const collection = database.collection('twit');

            // Query para crear nuevo twit

            const twits = await collection.find({ usuario: { $regex: "^"+busqueda  } }).sort( { fecha: -1 } ).toArray();

            // imprime lo encontrado
            if (twits != null) {

                //req.twits = twits;
                console.log(twits);
                client.close();
                res.render('users/profilesearch', { twits });

            }
            else {
                console.log('Error al publicar');
            }
        }
        catch (err) {
            console.log(err);
            res.redirect('/signin');
        }
        finally {
            // imprime el resultado 
            //run().catch(console.dir);
            // cierra la coneccion 
            await client.close();
        }}
    }
    else {
        res.redirect('/signin');
    }


});

router.get('/profile/search', (req, res) => {
    res.render('users/profilesearch');
});

module.exports = router;