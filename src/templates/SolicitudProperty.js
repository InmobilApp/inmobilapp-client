import { sendEmail } from "../services/sendEmail";

const baseUrl = "http://localhost:3000";

function msg(client, property, { name, id }) {
  return `<!DOCTYPE html>
  <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Notificación InmobilApp</title>
      </head>
      <body>
          <header style="display: flex; justify-content: center; flex-wrap: wrap; flex-direction: column;">
              <div style="text-align: center;">
                  <img src="https://i.ibb.co/vP2TGtp/inmobilapp-logo-landing.png" alt="logo app">
              </div>
              <div style="width: 100vw; background-color: #000;">
                  <h1 style="color: #EBB768; padding: 2rem 0;text-align: center;">Un cliente está interesado en alquilar una propiedad 🎉🏡</h1>
              </div>
          </header>
              <main style="padding: 2rem 2rem;">
                  <p style="font-size: 1.5rem;">Hola ${name} 👋🏼,</p>
                  <p style="font-size: 1.5rem;">El cliente ${
                    client.name
                  } identificado con DNI: ${
    client.dni
  } está interesado en alquilar la propiedad: ${property.id}.
                  </p>
                  <p style="font-size: 1.5rem;">Para asignar la propiedad al cliente, por favor haz click en el boton de abajo ⬇</p>
                  <button style=" padding: 10px;
                  margin: 2rem 0;
                  border-radius: 0.5rem;
                  border: 1px solid #eca424;
                  cursor: pointer;
                  background-color: #ebb76859;"><a style="text-decoration: none; color: #474737;
                  font-family: Cambria, Cochin, Georgia, Times; font-size: 1.2rem; color: #000;" href=${`${baseUrl}/assignproperty/${client.id}/${property.id}/${id}`} target="_blank">Asignar propiedad</a></button>
              </main>
      </body>
  </html>`;
}

export function sendSolicitudProperty(client, property) {
  return sendEmail(
    property.agentID.name,
    "inmobilapppg@gmail.com",
    msg(client, property, property.agentID)
  );
}
