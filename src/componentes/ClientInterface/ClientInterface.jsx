import React, { useState, useEffect } from "react";
import { BotonUp } from "./botones/BotonUp";
import { BotonUpF } from "./botones/BotonUpF";
import { BotonClose } from "./botones/BotonClose";
import { BotonCloseF } from "./botones/BotonCloseF";
import { CardMinmueble } from "./cardMInmueble/CardMinmueble";
import { CardNoHayInmueble } from "./cardNoHayInmueble/CardNoHayInmueble";
import { CardsMisFavoritos } from "./cardMisFavoritos/CardsMisFavoritos";
import { CardNoHayFavoritos } from "./cardNoHayFavoritos/CardNoHayFavoritos";
import { NavbarClient } from "../NavbarClient/NavbarClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./ClientInterface.css";
import { AiFillStar } from "react-icons/ai";

export const ClientInterface = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [actualToken, setActualToken] = useState("");
  const clientID = user ? user.id : null;
  const [openI, setOpenI] = useState(false);
  const [openF, setOpenF] = useState(false);

  useEffect(async () => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    const user = JSON.parse(loggedUserJSON);
    if (user) {
      setUser(user);
      setActualToken(user.token);

      const notify = () =>
        toast.success(`Bienvenid@ ${user.name}!`, {
          icon: "👋",
        });
      notify(user.name);
    }
    return (
      <div className="title_login">
        <h1>Debe iniciar sesión para ver esta interfaz</h1>
        <button onClick={() => navigate("/login")} className="btn">
          Click to login
        </button>
      </div>
    );
  }, []);

  if (!actualToken) {
    return (
      <>
        <div className="title_login">
          <h1>Debe iniciar sesión para ver esta interfaz</h1>
          <button onClick={() => navigate("/")} className="btn">
            Aceptar
          </button>
        </div>
      </>
    );
  }

  const openMenu = () => {
    setOpenI(true);
  };
  const closeMenu = () => {
    setOpenI(false);
  };
  const openMenuF = () => {
    setOpenF(true);
  };
  const closeMenuF = () => {
    setOpenF(false);
  };
  const handleLogout = () => {
    setUser(null);
    setActualToken("");
    window.localStorage.removeItem("loggedUser");
  };
  return (
    <>
      <NavbarClient handleLogout={handleLogout} user={user} />
      <div className="container">
        <h2>Mi inmueble</h2>
        {user.propertyID ? (
          <>
            <div className="container_pagos">
              {openI ? (
                <BotonClose closeMenu={closeMenu} />
              ) : (
                <BotonUp openMenu={openMenu} />
              )}
              <span>Nombre del propietario: {user.name}</span>
            </div>
            {openI && <CardMinmueble />}
          </>
        ) : (
          <CardNoHayInmueble />
        )}

        <h2>Mis favoritos</h2>
        {user.favoriteProperties.length > 0 ? (
          <>
            <div className="container_pagos">
              {openF ? (
                <BotonCloseF closeMenuF={closeMenuF} />
              ) : (
                <BotonUpF openMenuF={openMenuF} />
              )}
              <span> Ver mis favoritos</span>
            </div>
            {openF && <CardsMisFavoritos />}
          </>
        ) : (
          <CardNoHayFavoritos />
        )}
      </div>
    </>
  );
};
