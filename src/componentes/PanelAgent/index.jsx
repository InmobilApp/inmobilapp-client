import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import CardPropertyAgent from "../CardPropertyAgent";
import axios from "axios";
import { msg } from "../../templates/ClientSuscribe";

import classes from "./PanelAgent.module.css";

export default function PanelAgent({ agent }) {
  const navigate = useNavigate();

  const seAlquiloPropiedad = (name, email, property) => {
    console.log(property);
    axios.post("/api/sendemail", {
      email,
      name,
      template: msg(name, email, property),
    });
  };

  const [input, setInput] = useState({
    name: "Dairo",
    email: "garcianaranjodairo@gmail.com",
    agentID: 123,
  });

  return (
    <div className={classes.container}>
      <div className={classes.appBar}>
        <IconButton onClick={() => navigate("/create-property")}>
          <BsFillPlusSquareFill />
        </IconButton>
        <button
          onClick={() =>
            seAlquiloPropiedad(
              "Carla",
              "carlafaes18hotmail.com",
              agent.properties[0]
            )
          }
        >
          enviar
        </button>
      </div>
      <div className={classes.content}>
        {agent.properties.map((property) => {
          return <CardPropertyAgent key={property.id} {...property} />;
        })}
      </div>
    </div>
  );
}
