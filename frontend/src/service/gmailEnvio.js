import api from "./api.js";

export const enviarGmail = async (destinatario, asunto, mensaje) => {
  try {
    const envioGmail = await api.post('/enviar-correo', {
      destinatario,
      asunto,
      mensaje
    });
    return envioGmail.data;
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw error;
  }
};
