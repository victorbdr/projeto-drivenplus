import UserContext from "../contexts/UserContext";
import axios from "axios";
import Form from "./shared/Form";
import Input from "./shared/Input";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from "./shared/Button";
export default function Plan() {
  const navigate = useNavigate();
  const { plano } = useParams();
  const [newPayer, setNewPayer] = useState({
    membershipId: `${plano}`,
    cardName: "",
    cardNumber: "",
    securityNumber: "",
    expirationDate: "",
  });
  console.log(newPayer);
  const [onePlan, setOnePlan] = useState({});
  const { token } = useContext(UserContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${plano}`,
      config
    );
    promise.then((response) => {
      setOnePlan(response.data);
    });
  }, []);
  function sendCard(event) {
    event.preventDefault();
    console.log("clicado");
    const info = { ...newPayer };
    const send = axios.post(
      "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions",
      info,
      config
    );
    send.then((res) => {
      navigate("/home", {
        state: {
          onePlan: {
            id: onePlan.id,
            image: onePlan.image,
            perk: onePlan.perks,
          },
        },
      });
      console.log(res);
    });
    /* fetch(send).then((response) => {
      console.log(response);
      return response;
    }); */
  }
  function handleForm(event) {
    setNewPayer({ ...newPayer, [event.target.name]: event.target.value });
  }

  return (
    <>
      <List>
        <img src={onePlan.image} />
        <h1>{onePlan.name}</h1>
        <p>Benefícios:</p>
        <p>R${onePlan.price} cobrados mensalmente</p>
      </List>
      <Form>
        <Input
          name="cardName"
          type="text"
          placeholder="Nome impresso no cartão"
          value={newPayer.cardName}
          onChange={handleForm}
        />
        <Input
          name="cardNumber"
          type="text"
          placeholder="Digitos do cartão"
          value={newPayer.cardNumber}
          onChange={handleForm}
        />
        <Input
          name="securityNumber"
          type="text"
          placeholder="Código de segurança"
          value={newPayer.securityNumber}
          onChange={handleForm}
        />
        <Input
          name="expirationDate"
          type="text"
          placeholder="Validade"
          value={newPayer.expirationDate}
          onChange={handleForm}
        />
        <Button type="submit" onClick={sendCard}>
          Assinar
        </Button>
      </Form>
    </>
  );
}
const List = styled.div`
  display: flex;
  flex-direction: column;
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;

    color: #ffffff;
  }
`;
