"use client";
import { useState } from 'react';
import { Grid, TextField, Typography, Button } from '@mui/material'
import { useRouter } from 'next/navigation';
import axios from 'axios';

const validarUsuario = async (email, password) => {
  const { data } = await axios.get(`http://localhost:3000/api/session/${email}/${password}`).catch(console.log);
  return data
}

export default function Home() {
  const router = useRouter()
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handelIniciar = async () => {
    if (form.email.trim().length === 0) {
      setError("Debe ingresar el correo electronico.");
      return;
    } else if (form.password.trim().length === 0) {
      setError("Debe ingresar la contraeña");
      return;
    } else if (form.password.length < 6) {
      setError("La contraseña debe ser minimo de 6 caracteres");
      return;
    } else {
      const data = await validarUsuario(form.email, form.password);
      console.log(data);
      if (data.estado) {
        setError("");
        localStorage.setItem("token", data.token);
        router.push('/home')
      } else {
        setError("Datos de usuario invalidos")
      }
    }
  }

  const handleInput = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Grid component="main" container direction="row" height="100%" justifyContent="center">
      <Grid item container direction="column" xs={8} mt={8}>
        {
          error.length > 0 && (
            <Grid item xs={1} display="flex" mb={3} sx={{
              border: "#000",
              borderRadius: 5,
              backgroundColor: "#8c0000",
            }}>
              <Typography
                textAlign="center"
                alignSelf="center"
                sx={{ fontSize: 30, fontWeight: 700, color: 'white', width: '100%' }}>{error}</Typography>
            </Grid>
          )
        }
        <Grid item container direction="row" xs={7} display="flex" sx={{
          border: " #000",
          borderRadius: 5,
          height: 400,
          boxShadow: "5px 5px 40px",
        }}>
          <Grid item xs={12} mt={2}>
            <Typography textAlign="center" sx={{ fontSize: 50, fontWeight: 700 }}>Login</Typography>
          </Grid>
          <Grid item xs={12} justifyContent="center" display="flex">
            <TextField
              label="Correo"
              variant="outlined"
              type="email"
              name="email"
              onChange={handleInput}
              value={form.email}
              sx={{ width: '90%' }} />
          </Grid>
          <Grid item xs={12} justifyContent="center" display="flex">
            <TextField
              label="Contraseña"
              variant="outlined"
              type="password"
              name="password"
              onChange={handleInput}
              value={form.password}
              sx={{ width: '90%' }} />
          </Grid>
          <Grid item xs={12} justifyContent="center" display="flex" height={30}>
            <Button variant='contained' sx={{ width: '90%' }} onClick={handelIniciar}>Iniciar</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}