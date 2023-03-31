import mongoose from "mongoose";

const veterinarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        trim: true,
        required: true
    },

    password:{
        type: String,
        trim: true,
        
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    telefono:{
        type: String,
        trim: true,
        default: null
    },
    
    web:{
        type: String,
        default: null
    },
    token:{
        type: String,
    },

    confirmado:{
        type: Boolean,
        default: null,
    },
})

const Veterinario = mongoose.model("Veterinario" , veterinarioSchema)

export default Veterinario