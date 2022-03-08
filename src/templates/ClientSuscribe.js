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
                   <p>Te dejamos un poco de informacion respecto a la propiedad que arrendaste 😁  </br> 
                   </br> </p>
                   <h5> Ciudad: ${property.location.city}</h5>
                   <h5>Detalles de tu propiedad: </br>Area: ${property.details.area} </br> Dormitorios: ${property.details.rooms} </br> Baños: ${property.details.rooms} </br></h5>
                   <br/>
                   <h4>¿Tienes algunas dudas?🤔 <br/> Visita nuestra seccion de preguntas frecuentes 😉</h4>
                   <h4>Podes hacerlo ingresando al siguiente link: <a href='https://inmobilapp.vercel.app/preguntasFrecuentes'> Click aqui</a> </h4>
                   
                  
                   <img src='https://i.ibb.co/vP2TGtp/inmobilapp-logo-landing.png' alt='logo-mail' width='40' height='40' /><h5>Saludos, equipo InmobilApp</h5>
                   </div>
                   ${property.images.map(imgUrl => {
                       return `<img src=${imgUrl} alt="Logo"/>`
                 })}
                   
               </div>
           </body>
       </html>
   `
}