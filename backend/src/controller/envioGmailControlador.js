// controladores/controladorCorreo.js
import {enviarCorreo} from "../service/envioGmailServicio.js";

export const enviarCorreoControlador = async (req, res) => {
  const { destinatario, asunto, mensaje } = req.body;

  try {
    let info = await enviarCorreo(destinatario, asunto, mensaje);
    res.status(200).send(`Correo enviado: ${info.response}`);
  } catch (error) {
    res.status(500).send("Error al enviar el correo");
  }
};


