const  mongoose =require('mongoose');
const {Schema}  = mongoose;


const twitschema = new Schema ({
    id_twit:{type: String, required: true},
    id_usuario: {type: String, required: true},
    twit: {type: String, required: true},
    id_comentario: {type: String, required: true},
    id_comentario_usuario:{type: String, required: true},
    
    
    
});

module.exports = mongoose.model('twit', twitschema);