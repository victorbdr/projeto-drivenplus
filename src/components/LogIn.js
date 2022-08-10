import Button from "./shared/Button";
import Input from "./shared/Input";
import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Form from "./shared/Form";
import axios from "axios";
export default function LogIn() {
  const navigate = useNavigate();
  const { token, setToken } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  function handleForm(event) {
    event.preventDefault();
  }
  function sendForm() {
    const body = { email, password };
    const promise = axios.post(
      "https://mock-api.driven.com.br/api/v4/driven-plus/auth/login",
      body
    );
    promise.then((res) => {
      setToken(res.data.token);
      navigate("/home");
    });
  }
  return (
    <>
      <Form onSubmit={handleForm}>
        <img src="./img/logodriven.png" />
        <Input
          type="text"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={sendForm}>
          <p>Entrar</p>
        </Button>
        <Link to="/sign-up">
          <p>Não possuí uma conta? Cadastre-se</p>
        </Link>
      </Form>
    </>
  );
}
