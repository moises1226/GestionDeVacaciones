// servicios/servicioCorreo.js
import nodemailer from "nodemailer";

export const enviarCorreo = async (destinatario, asunto, mensaje) => {
  const miCorreo = "moises.aguilar1.et7@gmail.com"; // Coloca tu correo de Gmail
  const miContraseña = "gzwv vxsa zfyw mybl"; // Coloca tu código de aplicación de Gmail

  let transportador = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: miCorreo,
      pass: miContraseña,
    },
  });

  let opcionesCorreo = {
    from: miCorreo,
    to: destinatario,
    subject: asunto,
    text: mensaje,
  };

  try {
    let info = await transportador.sendMail(opcionesCorreo);
    console.log("Correo enviado: " + info.response);
    return info;
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw error;
  }
};

