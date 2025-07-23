import jwt from "jsonwebtoken";
import { exito, error } from "../services/responder.js";

const usuarios = [{ id: 1, email: "admin@example.com", password: "1234" }];

export const login = (req, res) => {
  const { email, password } = req.body;
  const usuario = usuarios.find(
    (u) => u.email === email && u.password === password
  );

  if (!usuario) {
    return error(res, null, "Credenciales inválidas", 401);
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  exito(res, {token}, 'Login exitoso');

};
