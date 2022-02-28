import React, { useState, useEffect } from "react";
import { BotonUp } from "./botones/BotonUp";
import { BotonUpF} from "./botones/BotonUpF";
import { BotonClose} from "./botones/BotonClose";
import { BotonCloseF} from "./botones/BotonCloseF";
import { CardMinmueble } from "./cardMInmueble/CardMinmueble";
import { CardNoHayInmueble } from "./cardNoHayInmueble/CardNoHayInmueble";
import { CardsMisFavoritos } from "./cardMisFavoritos/CardsMisFavoritos";
import { CardNoHayFavoritos } from './cardNoHayFavoritos/CardNoHayFavoritos'
import { NavbarClient } from '../navbars/NavbarClient'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import './ClientInterface.css'
import { AiFillStar } from "react-icons/ai";

export const ClientInterface = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [actualToken, setActualToken] = useState("");
  const clientID = user ? user.id : null;
  const [openI, setOpenI] = useState(false)
  const [openF, setOpenF] = useState(false)

  useEffect(async () => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    const user = JSON.parse(loggedUserJSON);
    if (user) {
      setUser(user);
      setActualToken(user.token);

      const notify = () =>
        toast.success(`Bienvenid@ ${user.name}!`, {
          icon: "👋"
        });
      notify(user.name);
    }
    console.log(user);
    return (
      <div className="div">
        <h1 >You must be login to see this interface</h1>
        <button onClick={() => navigate("/login")}>Click to login</button>
      </div>
    );
  }, []);

  if (!actualToken) {
    return (
      <>
        <h1>You must be login to see this interface</h1>
        <button onClick={() => navigate("/login")}>Click to login</button>
      </>
    );
  }

  const openMenu = () => {
    setOpenI(true)
  }
  const closeMenu = () => {
    setOpenI(false)
  }
  const openMenuF=()=>{
    setOpenF(true)
  }
  const closeMenuF=()=>{
    setOpenF(false)
  }
  const handleLogout = () => {
    setUser(null)
    setActualToken('')
    window.localStorage.removeItem("loggedUser");
  };
  return (
    <>
      <NavbarClient handleLogout={handleLogout} />
      <div className="container">
        <h2>Mi inmueble</h2>
        {
          user.propertyID ?
            <>
              <div className="container_pagos">
                {
                  openI ? <BotonClose closeMenu={closeMenu} /> : <BotonUp openMenu={openMenu} />
                }
                <span>Nombre del propietario: {user.name}</span>
                <span>Dia de pago: {user.payDay} del mes presente</span>
              </div>
              {
                openI && <CardMinmueble />
              }

            </>
            :
            <CardNoHayInmueble />
        }

        <h2>Mis favoritos</h2>
        
        {
          user.favoriteProperties.length>0 ?<CardsMisFavoritos/>: <CardNoHayFavoritos/>
        }
      </div>
    </>
  );
};

