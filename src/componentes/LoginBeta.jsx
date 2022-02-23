import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import LoginForm from "./LoginForm";
import Footer from "./Footer";
import ClientInterface_DEMO from "./ClientInterface_DEMO";
import { useDispatch, useSelector } from "react-redux";
import { getClientInfoWithToken } from "../redux/actions/actionClient";

const LoginBeta = () => {
  const [dni, setDNI] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const clientWithToken = useSelector((state) => state.clientWithToken);

  useEffect(() => {
    alert(`Cambio algo`);
  }, [clientWithToken]);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (dni && password) {
      dispatch(getClientInfoWithToken({ dni, password }));
      setDNI("");
      setPassword("");
    }
  };

  return (
    <>
      <Navbar />
      {clientWithToken ? (
        <ClientInterface_DEMO user={clientWithToken} />
      ) : (
        <LoginForm
          dni={dni}
          setDNI={setDNI}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
      <Footer />
    </>
  );
};

export default LoginBeta;