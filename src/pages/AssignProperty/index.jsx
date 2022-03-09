import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agentService from "../../services/agent";
import { getUserForLocalStorage } from "../../utils/user";
import swal from "sweetalert";
import { notifyWelcome } from "../../utils/notifications";
import NavBarAgent from "../../componentes/NavBarAgent";
import Footer from "../../componentes/Footer";
import Loading from "../../componentes/Loading";
import Modal from "./Modal/Modal";
import { useNavigate } from "react-router-dom";
import { msg } from "../../templates/ClientSuscribe";
import axios from "axios";

import styled from "./AssingProperty.module.css";

export default function AssignProperty() {
  const { clientID, propertyID, agentID } = useParams();
  const [agentDetail, setAgentDetail] = useState(null);
  const [send, setSend] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUserForLocalStorage();
    if (user === null || user.role !== "AGENT" || user.id != agentID) {
      swal("No tienes permisos");
      return navigate("/");
    }
    agentService.getAgentDetailsPropertiesID(user.id).then((data) => {
      setAgentDetail({ ...data, token: user.token });
      notifyWelcome(`Bienvenid@ ${user.name}!`);
    });
  }, []);

  const seAlquiloPropiedad = (name, email, property) => {
    axios.post("/api/sendemail", {
      email,
      name,
      template: msg(name, property),
    });
    setTimeout(() => {
      setSend(true);
    }, 1000);
  };

  const asignarPropiedad = () =>
    agentService
      .assignProperty(clientID, propertyID, agentDetail.token)
      .then((data) => {
        seAlquiloPropiedad(data.name, data.email, data.propertyID);
      })
      .catch((err) => {
        console.log(err);
        swal("Ha ocurrido un error :(");
      });

  const eliminarPropiedad = () =>
    agentService
      .delClientProperty(clientID, true, agentDetail.token)
      .then(() => swal("Se eliminó la propiedad del cliente"))
      .catch((err) => {
        swal("Ha ocurrido un error :(");
      });

  if (!agentDetail) {
    return <Loading />;
  }

  return (
    <div>
      <NavBarAgent user={agentDetail} />
      <p>
        {clientID}, {propertyID}
      </p>
      <button className={styled.button} onClick={asignarPropiedad}>
        Asignar propiedad al cliente
      </button>
      {send && <Modal send={setSend} />}
      <button className={styled.button} onClick={eliminarPropiedad}>
        Eliminar propiedad del cliente
      </button>
      {/* <Footer /> */}
    </div>
  );
}
