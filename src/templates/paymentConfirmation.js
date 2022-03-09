import { sendEmail } from "../services/sendEmail";

const baseUrl = "http://localhost:3000";

function msg(client, payment) {
  return `
  <!DOCTYPE html>
  <html style='margin:0; padding:0;'>
     <head>
        
     </head>
         <body>
             <div>
                 <h2>Hola ${client.name}!</h2>
                 <div>
                 <h3>Este mensaje es para confirmar que tu pago por valor de USD ${payment.value} ha sido confirmado</h3>
                 <h3>Referiencia de pago: ${payment.reference} 😁</h3>
                 <br/>
                <h5>Por favo no dudes en contctarte si se presenta alguna inconsistencia en el valor. Con gusto te ayudaremos a solucionarlo. 😉</h5>
                 <h5>Podes hacerlo ingresando al siguiente link: <a href='https://inmobilapp.vercel.app/preguntasFrecuentes'> Click aqui</a> </h5>
                 <br/>
                 <div>
                 <h5>Saludos, equipo InmobilApp</h5>
                 </div>
                 </div>
             </div>
         </body>
     </html>
     `;
}

export function sendPaymentConfirmation(client, payment) {
  return sendEmail(
    property.agentID.id,
    "garcianaranjodairo@gmail.com",
    msg(client, property)
  );
}
