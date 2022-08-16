import Input from "./shared/Input";
import Form from "./shared/Form";
import Button from "./shared/Button";
import axios from "axios";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    email: "",
    name: "",
    cpf: "",
    password: "",
  });
  function sendForm() {
    const body = {
      ...newUser,
    };
    const promise = axios.post(
      "https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up",
      body
    );
    promise.then((res) => {
      navigate("/");
      console.log("foi aqui");
      promise.catch((error) => console.log(error.response));
    });
    promise.catch((error) => console.log(error.response));
  }
  function handleForm(event) {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
    event.preventDefault();
  }
  return (
    <>
      <Form onSubmit={handleForm}>
        <Input
          name="name"
          type="text"
          placeholder="Nome"
          value={newUser.name}
          onChange={handleForm}
        />
        <Input
          name="cpf"
          type="text"
          placeholder="CPF"
          value={newUser.cpf}
          onChange={handleForm}
        />
        <Input
          name="email"
          type="text"
          placeholder="E-mail"
          value={newUser.email}
          onChange={handleForm}
        ></Input>
        <Input
          name="password"
          type="password"
          placeholder="Senha"
          value={newUser.password}
          onChange={handleForm}
        />
        <Button type="submit" onClick={sendForm}>
          Cadastrar
        </Button>
        <Link to="/">
          <p>Já possuí uma conta? Entre</p>
        </Link>
      </Form>
    </>
  );
}
