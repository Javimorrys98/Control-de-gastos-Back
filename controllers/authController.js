import User from "../models/User.js";
// import { sendEmailVerification, sendEmailPasswordReset, sendEmailGuestRegister } from '../emails/authEmailService.js';
import { generateJWT, uniqueId } from "../utils/index.js";

const register = async (req, res) => {
  //Valida todos los campos
  if (Object.values(req.body).includes("")) {
    const error = new Error("Por favor, llena todos los campos.");

    return res.status(400).json({
      msg: error.message,
    });
  }

  const { email, password } = req.body;

  //Evitar registros con email duplicados
  const userExists = await User.findOne({ email });
  if (userExists) {
    const error = new Error("Email ya registrado.");

    return res.status(400).json({
      msg: error.message,
    });
  }

  //Validar contraseña
  const MIN_PASSWORD_LENGTH = 8;
  if (password.trim().length < MIN_PASSWORD_LENGTH) {
    const error = new Error(
      `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`
    );

    return res.status(400).json({
      msg: error.message,
    });
  }

  try {
    const user = new User(req.body);
    user.verified = true;
    const result = await user.save();

    const { name, email, token } = result;
    // sendEmailVerification({ name, email, token });

    res.json({
      msg: "Usuario creado correctamente.",
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  //Revisar que el susuario exista
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("Las credenciales no son correctas.");

    return res.status(401).json({
      msg: error.message,
    });
  }

  //Revisar si el usuario está verificado
  if (!user.verified) {
    const error = new Error(
      "Por favor, verifica tu cuenta antes de iniciar sesión."
    );

    return res.status(401).json({
      msg: error.message,
    });
  }

  //Comprobar la contraseña
  if (await user.checkPassword(password)) {
    const token = generateJWT(user._id);
    res.json({
      token,
    });
  } else {
    const error = new Error("Las credenciales no son correctas.");

    return res.status(401).json({
      msg: error.message,
    });
  }
};

const user = async (req, res) => {
  const { user } = req;
  res.json(user);
};

export { register, login, user };
