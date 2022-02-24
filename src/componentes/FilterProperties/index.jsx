import {
  Box,
  Slider,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getAllProperties,
  setFilterProperties,
} from "../../redux/actions/actionsProperties";

export default function FilterProperties() {
  const dispatch = useDispatch();

  const initialState = {
    rentalPrice: [10, 5000000],
    state: "all",
    area: [10, 1000],
    rooms: [1, 20],
    city: "",
    address: "",
    neighborhood: "",
    typeProperty: "all",
  };

  const [input, setInput] = useState(initialState);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    dispatch(
      setFilterProperties({ ...input, [e.target.name]: e.target.value })
    );
  };

  const clearFilter = () => {
    dispatch(getAllProperties());
    setInput(initialState)
  };

  return (
    <Box component="form" autoComplete="off">
      <TextField
        label="Ciudad"
        variant="outlined"
        onChange={handleChange}
        name="city"
      />
      <TextField
        label="Direccion"
        variant="outlined"
        onChange={handleChange}
        name="address"
      />
      <TextField
        label="Barrio"
        variant="outlined"
        onChange={handleChange}
        name="neighborhood"
      />
      <Box sx={{ width: 300 }}>
        <Typography id="area">Area</Typography>
        <Slider
          aria-labelledby="area"
          name="area"
          value={input.area}
          onChange={handleChange}
          min={10}
          max={1000}
          valueLabelDisplay="auto"
          disableSwap
        />
        <Typography id="rooms">Cuartos</Typography>
        <Slider
          aria-labelledby="rooms"
          name="rooms"
          value={input.rooms}
          onChange={handleChange}
          min={1}
          max={20}
          valueLabelDisplay="auto"
          disableSwap
        />
        <Typography id="rentalPrice">Precio de renta</Typography>
        <Slider
          aria-labelledby="rentalPrice"
          name="rentalPrice"
          value={input.rentalPrice}
          onChange={handleChange}
          min={10}
          max={5000000}
          valueLabelDisplay="auto"
          disableSwap
        />
      </Box>
      <Typography id="state">Estado</Typography>
      <Select
        name="state"
        aria-labelledby="state"
        value={input.state}
        onChange={handleChange}
      >
        <MenuItem value="all">Todas</MenuItem>
        <MenuItem value="available">Disponibles</MenuItem>
        <MenuItem value="unavailable">No disponibles</MenuItem>
        <MenuItem value="reserved">Reservada</MenuItem>
      </Select>
      <Typography id="typeProperty">Tipo</Typography>
      <Select
        name="typeProperty"
        aria-labelledby="typeProperty"
        value={input.typeProperty}
        onChange={handleChange}
      >
        <MenuItem value="all">Todas</MenuItem>
        <MenuItem value="casa">Casa</MenuItem>
        <MenuItem value="local">Local</MenuItem>
        <MenuItem value="apartamento">Apartamento</MenuItem>
        <MenuItem value="finca">Finca</MenuItem>
      </Select>
      <Button variant="contained" onClick={clearFilter}>
        Limpiar Filtros
      </Button>
    </Box>
  );
}