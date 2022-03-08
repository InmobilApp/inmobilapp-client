import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import propertyServices from "../../services/property";

export default function Checkout() {
  const [property, setProperty] = useState({});
  const { id } = useParams();
  useEffect(() => {
    async function getProperty() {
      setProperty(await propertyServices.getPropertyDetail(id));
    }
  });

  const mercadopago = new window.MercadoPago(
    "TEST-0357acf5-bb8f-4697-a26b-332ccab4020b",
    {
      locale: "es-AR", // The most common are: 'pt-BR', 'es-AR' and 'en-US'
    }
  );

  function createCheckoutButton(preferenceId) {
    // Initialize the checkout
    mercadopago.checkout({
      preference: {
        id: preferenceId,
      },
      render: {
        container: "#button-checkout", // Class name where the payment button will be displayed
        label: "Pay", // Change the payment button text (optional)
      },
    });
  }

  function handleClick(e) {
    const orderData = {
      title: "Arriendo prueba",
      quantity: 1,
      price: 1500,
    };

    axios
      .post("/api/checkout", orderData)
      .then((data) => createCheckoutButton(data.data))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <button onClick={handleClick} id="checkout-btn">
        checkout
      </button>
      <div id="button-checkout"></div>
    </div>
  );
}
