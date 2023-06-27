const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId;

const schemaCliente = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
    },
    cedula: {
        type: Number,
        required: [true, 'Este campo es obligatorio'],
        trim: true,
        min: 10,
        max: 10
    },
    nombre: {
        type: String,
        required: [true, 'Este campo es obligatorio'],
        trim: true,
        max: 30
    },
    direccion: {
        type: String,
        required: [true, 'Este campo es obligatorio'],
        trim: true,
        max: 50
    },
    telefono: {
        type: Number,
        required: [true, 'Este campo es obligatorio'],
        trim: true,
        min: 10,
        max: 10
    },
    email: {
        type: String,
        required: [true, 'Este campo es obligatorio'],
        trim: true,
        max: 50
    },
    nombreCodeudor: {
        type: String,
        required: [true, 'Este campo es obligatorio'],
        trim: true,
        max: 30
    },
    cedulaCodeudor: {
        type: Number,
        required: [true, 'Este campo es obligatorio'],
        trim: true,
        min: 10,
        max: 10
    },
    telefonoCodeudor: {
        type: Number,
        required: [true, 'Este campo es obligatorio'],
        trim: true,
        min: 10,
        max: 10
    },
    direccionCodeudor: {
        type: String,
        required: [true, 'Este campo es obligatorio'],
        trim: true,
        max: 50
    },
    grupo: {
        type: String,
        required: [true, 'Este campo es obligatorio'],
        trim: true,
        max: 30
    },
    estado: {
        type: String,
        required: [true, 'Este campo es obligatorio'],
        trim: true,
        max: 8
    }
})

const ModeloCliente = mongoose.model('Cliente', schemaCliente)

module.exports = ModeloCliente
