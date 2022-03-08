export  function msg(name, email, property){
    return `
    <!DOCTYPE html>
    <html style='margin:0; padding:0;'>
       <head>
          
       </head>
           <body>
               <div>
                   <h2>Hola ${name}!</h2>
                   <div>
                   <h3>Estamos muy contentos de poder informarte que has arrendado tu propiedad con exito! 🤩 Gracias por ser parte de nuestra comunidad. Accediendo a tu cuenta podras mantenerte al tanto de los pagos de tu inmueble</h3>
                   <p>Te dejamos un poco de informacion respecto a la propiedad que arrendaste 😁 </br> {property.details} </br> {property.location.city}</p>
                   <br/>
                   <h4>¿Tienes algunas dudas?🤔 <br/> Visita nuestra seccion de preguntas frecuentes 😉</h4>
                   <h4>Podes hacerlo ingresando al siguiente link: <a href='https://inmobilapp.vercel.app/preguntasFrecuentes'> Click aqui</a> </h4>
                   
                   <h5>Saludos, equipo InmobilApp</h5>
                   <img src='https://i.ibb.co/vP2TGtp/inmobilapp-logo-landing.png' alt='logo-mail' width='100' height='100' />
                   </div>
                   ${property.images.map(imgUrl => {
                       return `<img src=${imgUrl} alt="Logo"/>`
                 })}
                   
               </div>
           </body>
       </html>
   `
}