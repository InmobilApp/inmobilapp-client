import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import adminService from "../../services/admin";
import { validateFormAdmin, isDone } from "../../utils/errorsFormAdmin";
import styled from "./FormAdmin.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function FormAdmin() {
  document.title = "InmobillApp | registrar admin";
  const initInput = {
    name: "",
    dni: "",
    address: "",
    phone: "",
    age: "",
    password: "",
  };

  const navigate = useNavigate();
  const [input, setInput] = useState(initInput);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({
    name: "*",
    dni: "*",
    password: "*",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError(
      validateFormAdmin(
        { ...input, [e.target.name]: e.target.value },
        error,
        e.target.name
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isDone(error)) {
      if (confirm("Seguro desea crear este admin?")) {
        adminService.postAdmin(input).then((res) => {
          setInput(initInput);
          navigate(`/login`);
        });
      }
    } else {
      alert("Completa correctamente los espacios!");
    }
  };

  return (
    <Box component="form" autoComplete="off" className={styled.container}>
      <TextField
        label={
          error.name && error.name === "*"
            ? "Nombre"
            : error.name
            ? error.name
            : "Nombre"
        }
        value={input.name}
        name="name"
        onChange={handleChange}
        color={error.name ? "warning" : "success"}
      />
      <TextField
        label={
          error.dni && error.dni === "*" ? "DNI" : error.dni ? error.dni : "DNI"
        }
        value={input.dni}
        name="dni"
        onChange={handleChange}
        color={error.dni ? "warning" : "success"}
      />
      <FormControl>
        <InputLabel
          color={error.password ? "warning" : "success"}
          htmlFor="password"
        >
          {error.password && error.password === "*"
            ? "Contraseña"
            : error.password
            ? error.password
            : "Contraseña"}
        </InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? "text" : "password"}
          value={input.password}
          name="password"
          onChange={handleChange}
          label={
            error.password && error.password === "*"
              ? "Contraseña"
              : error.password
              ? error.password
              : "Contraseña"
          }
          color={error.password ? "warning" : "success"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
}
