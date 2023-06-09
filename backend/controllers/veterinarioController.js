import Veterinario from "../models/Veterinario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

const registrar = async (req, res) => {
  const { email } = req.body;

  //Prevenir usuarios duplicados

  const existeUsuario = await Veterinario.findOne({ email });

  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ ms: error.message });
  }

  try {
    //Guardar nuevo veterinario
    const veterinario = new Veterinario(req.body);
    const veterinarioGuardado = await veterinario.save();
    res.status(201).json({ msg: "Registrando usuario", veterinarioGuardado });
  } catch (error) {
    // console.log(error);
    throw new Error('Hubo un error', error);
  }
};

const perfil = (req, res) => {
  res.json({ msg: "Mostrando perfil" });
};

const confirmar = async (req, res) => {
  const { token } = req.params;

  const usuarioConfirmar = await Veterinario.findOne({ token });

  if (!usuarioConfirmar) {
    const error = new Error("Token no válido");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();
    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req,res) =>{
    const{email, password} = req.body
    
    //Comprobar si el usuario existe
    const usuario = await Veterinario.findOne({email})

    if (!usuario) {
        // console.log('si existe..');
        // res.json({msg: 'Autenticando'})
       
        return res.status(404).json({ msg: error.message });
      }

    //Comprobar si el usuario no esta confirmado
    if(!usuario.confirmado){
        const error = new Error("Tu Cuenta no ha sido confrimada")
        return res.status(403).json({msg: error.message})
    }
    //Revisar el password
    if(await usuario.comprobarPassword(password)){
     
    
    //Autenticar
        res.json({token: generarJWT(usuario.id)})
    }else{
        const error = new Error("El Password es incorrecto")
        return res.status(403).json({msg: error.message})
    }
   
}

 
export { registrar, perfil, confirmar, autenticar };
