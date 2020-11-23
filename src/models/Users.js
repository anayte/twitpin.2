const  mongoose =require('mongoose');
const {Schema}  = mongoose;
const bcrypt  = require('bcryptjs');

mongoose.connect('mongodb://localhost/test');

mongoose.model('registro',new Schema ({
    nombre: { type: String, required: true},
    apellido: {type: String, required: true},
    correo:{type: String, required: true},
    usuario : {type: String, required: true},
    password : {type: String, required: true},
    date: { type: Date, default: Date.now}
}))
/*
registroschema.method.encriptpass = async (password) =>{
    const salf = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salf);
    return hash;
};

registroschema.method.matchpass =  async function (password){
   return await bcrypt.compare(password, this.password);

} ;*/

module.exports = mongoose.model('registro');
