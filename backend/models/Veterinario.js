import mongoose from "mongoose";
import bcrypt from "bcrypt"
import generarId from "../helpers/generarId.js";

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
        default: generarId
    },

    confirmado:{
        type: Boolean,
        default: null,
    },
})
veterinarioSchema.pre('save' , async function (next) {
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

veterinarioSchema.methods.comprobarPassword = async function (passwordFormulario){
    return bcrypt.compare(passwordFormulario, this.password)
}

const Veterinario = mongoose.model("Veterinario" , veterinarioSchema)

export default Veterinario
