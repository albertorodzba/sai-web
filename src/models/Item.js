const {Schema, model, Query} = require('mongoose');


const ItemSchema = new Schema({

    descripcion:{
        type:String,
        required:true
    },
    marca:{
        type:String,
        required:true
    },
    serie:{
        type:String,
        required:true
    },
    ubicacion:{
        type:String,
        required:true
    },
    resguarda:
    {
        type:String,
    },
    categoria:{
        type:String,
        required:true
    },
    imageURL:{
        type:String
    },
    public_id:{
        type:String
    },
    date:
    {
        type: Date,

    }


},{
    timestamps:true
})


ItemSchema.index( {descripcion:"text", marca:"text", serie:"text", ubicacion:"text", resguarda:"text"} );
module.exports = model('Item', ItemSchema);