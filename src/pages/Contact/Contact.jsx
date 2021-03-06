import React, { useRef } from "react";
import "./contact.css";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/Navbar";
import { MdOutlineEmail } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import emailjs from "emailjs-com";
import swal from "sweetalert";
import { Button, Grid } from "@material-ui/core";

const Contact = () => {
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();

    await emailjs.sendForm(
      "service_inp44ta",
      "template_rl9bj2e",
      form.current,
      "hOlEUxo0waQC8iPxw"
    );
    e.target.reset();
    swal("Mensaje enviado", { icon: "success" });
  };

  return (
    <>
      <Navbar />
      <main className="contact_main_container">
        <h5 className="main__title">Contáctanos</h5>
        <Grid className="main__grid" container spacing={3}>
          <div className="contact__container">
            <div className="contact__options">
              <article className="contact__option">
                <MdOutlineEmail className="contact__option-icon__outlook" />
                <h4>Email</h4>
                <h5>inmobilApp@outlook.com</h5>
                <a href="mailto:inmobilApp@outlook.com" target="_blank">
                  Enviar un correo
                </a>
              </article>
              <article className="contact__option">
                <BsWhatsapp className="contact__option-icon__whatsapp" />
                <h4>WhatsApp</h4>
                <h5>Contactar un agente</h5>
                <a
                  href="https://api.whatsapp.com/send?phone=+573058904094"
                  target="_blank"
                >
                  Enviar un mensaje
                </a>
              </article>
            </div>

            <form ref={form} onSubmit={sendEmail} className="contact__form">
              <input type="text" name="name" placeholder="Nombre" required />
              <input type="email" name="email" placeholder="Email" required />
              <input
                type="number"
                name="number"
                placeholder="Teléfono"
                required
              />
              <textarea
                name="message"
                rows="7"
                placeholder="Mensaje..."
                required
              ></textarea>
              <Button type="submit">Enviar</Button>
            </form>
          </div>
        </Grid>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
