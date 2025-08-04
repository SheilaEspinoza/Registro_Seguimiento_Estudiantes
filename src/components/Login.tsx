import DarkVeil from "../Backgrounds/DarkVeil/DarkVeil";
import "./Login.css";
import { useState } from "react";

interface LoginProps {
  setUser: (user: string) => void;
}

export function Login({ setUser }: LoginProps) {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nombre.trim() === "" || password.trim() === "") {
      setError("Todos los campos son obligatorios");
      return;
    }

    //Credenciales user : adminIngenieria contra: 1234
    if (nombre === "adminIngenieria" && password === "1234") {
      setError("");
      setUser(nombre); 
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
  <div className="login-wrapper">
    <DarkVeil />
    <section className="login-box">
      <h1>Iniciar Sesión</h1>
      <form className="login" onSubmit={handleSubmit}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Usuario"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button type="submit">Iniciar sesión</button>
      </form>
      {error && <p className="error">{error}</p>}
    </section>
  </div>
);
}
