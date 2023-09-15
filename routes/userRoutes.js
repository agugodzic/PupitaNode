import { Router } from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const { sign } = jwt;
const userRouter = Router();
const user = User;

userRouter.post('/usuario/agregar', async (req, res) => {
  try {
    const userData = req.body;

    // Genera un hash de la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(userData.password, 10); // El valor 10 es el costo de hashing

    // Crea el usuario con la contraseña hasheada
    const newUser = await user.create({
      user: userData.user,
      password: hashedPassword,
      // Otros campos del usuario
    });

    res.json(newUser);
  } catch (err) {
    res.status(400).json({ error: "Error: " + err });
  }
});

userRouter.post('/login', async (req, res) => {
  const userCredentials = req.body;
  const foundUser = await user.findOne({
    where: {
      user: userCredentials.user,
    },
  });

  if (foundUser) {
    // Compara la contraseña proporcionada con la contraseña hasheada almacenada en la base de datos
    const passwordMatch = await bcrypt.compare(userCredentials.password, foundUser.password);

    if (passwordMatch) {
      try {
        sign({ user: userCredentials }, 'secretKey', (err, token) => {
          res.json({ accessToken: token });
        });
      } catch (err) {
        res.status(400).json({ error: "Error: " + err });
      }
    } else {
      res.status(401).json({ error: "Credenciales incorrectas." });
    }
  } else {
    res.status(401).json({ error: "Usuario no registrado." });
  }
});

export default userRouter;
