import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import PropertyDetails from "./pages/PropertyDetails/PropertyDetails";
import CreateAgent from "./componentes/CreateAgent/CreateAgent";
import LoginBeta from "./componentes/LoginBeta";
import { RegisterClient } from "./componentes/RegisterClient";
import Home from "./pages/Home/index";
import AgentDetail from "./componentes/AgentDetail/AgentDetail";
import CreatePropertyForm from "./componentes/CreatePropertyForm/CreatePropertyForm";
import FormAdmin from "./pages/FormAdmin";
import PageNotFound from "./pages/PageNotFound";
import ViewAdmin from "./pages/ViewAdmin";
import { ToastContainer } from "react-toastify";
import QuienesSomos from "./componentes/QuienesSomos";
import FormAgent from "./pages/FormAgent/FormAgent";
import { ClientInterface } from "./componentes/ClientInterface/ClientInterface";
import { Toaster } from "react-hot-toast";
import Generales from "./componentes/PreguntasFrecuentes/Generales";
import Contact from "./pages/Contact/Contact";
import ViewAgent from "./pages/ViewAgent";
import Reservas from './componentes/PreguntasFrecuentes/Reservas'
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { getTheme, changeTheme } from "../src/utils/theme";
import { Switch } from "@material-ui/core";
import Checkout from "./pages/Checkout/Checkout";

function App() {
  const [darkMode, setDarkMode] = useState(getTheme() === "dark");

  const theme = createTheme({
    palette: {
      type: getTheme(),
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <div className="switch_home">
          <h2>
            🔆
            <Switch
              checked={darkMode}
              onChange={() => {
                changeTheme();
                setDarkMode(!darkMode);
              }}
              color="primary"
            />
            🌙
          </h2>
        </div>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/property/:id" element={<PropertyDetails />} />
          <Route path="/register" element={<RegisterClient />} />
          <Route path="/viewClient" element={<ClientInterface />} />
          <Route path="/viewAdmin" element={<ViewAdmin />} />
          <Route path="/viewAgent" element={<ViewAgent />} />
          <Route path="/registerAdmin" element={<FormAdmin />} />
          <Route path="/registerAgent" element={<FormAgent />} />
          <Route path="/login" element={<LoginBeta />} />
          <Route path="/agents/:id" element={<AgentDetail />} />
          <Route path="/create-property" element={<CreatePropertyForm />} />
          <Route path="/quienes" element={<QuienesSomos />} />
          <Route path="/preguntasFrecuentes" element={<Generales />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/preguntasFrecuentes" element={<Generales/>} />
          <Route path='/reservas' element={<Reservas/>}/>

        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default App;
