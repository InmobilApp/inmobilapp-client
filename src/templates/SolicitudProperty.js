import sendEmail from "../services/sendEmail";

function msg(client, property) {
  return ``;
}

export function sendSolicitudProperty(client, property) {
  sendEmail.sendEmail(
    "nameAgent",
    "emailAgent",
    msg(client, property)
  );
}
