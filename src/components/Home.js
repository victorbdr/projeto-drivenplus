import { useLocation } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Button from "./shared/Button";
import { useParams } from "react-router-dom";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
export default function Home({ membership }) {
  const { onePlan, setOnePlan } = useContext(UserContext);
  console.log(onePlan);
  const { plano } = useParams();
  const [newPayer, setNewPayer] = useState({
    membershipId: `${plano}`,
    cardName: "",
    cardNumber: "",
    securityNumber: "",
    expirationDate: "",
  });
  const navigate = useNavigate();
  const { token } = useContext(UserContext);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function cancelPlan() {
    console.log("vem");
    const promise = axios.delete(
      "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions",
      config
    );
    promise.then((response) => {
      console.log(response);
      navigate("/subscriptions");
    });
  }
  function changePlan() {
    const info = { ...newPayer };
    const send = axios.post(
      "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions",
      config,
      info
    );
    send.then((res) => {
      console.log(res);
      navigate("/subscriptions");
    });
  }
  if (onePlan.membership.id === 1) {
    return (
      <>
        <img src={onePlan.membership.image} />
        <h1>Olá, {onePlan.name} </h1>
        <Perks>
          <a href={onePlan.membership.perks[0].link}>
            <Button>{onePlan.membership.perks[0].title}</Button>
          </a>
          <a href={onePlan.membership.perks[1].link}>
            <Button>{onePlan.membership.perks[1].title}</Button>
          </a>
        </Perks>
        <Cancel>
          <Button onClick={changePlan}>Mudar Plano</Button>
          <Button onClick={cancelPlan}>Cancelar plano</Button>
        </Cancel>
      </>
    );
  } else if (onePlan.membership.id === 2) {
    return (
      <>
        <img src={onePlan.membership.image} />
        <h1>Olá, {onePlan.name} </h1>
        <Perks>
          <a href={onePlan.membership.perks[0].link}>
            <Button>{onePlan.membership.perks[0].title}</Button>
          </a>
          <a href={onePlan.membership.perks[1].link}>
            <Button>{onePlan.membership.perks[1].title}</Button>
          </a>
          <a href={onePlan.membership.perks[2].link}>
            <Button>{onePlan.membership.perks[2].title}</Button>
          </a>
        </Perks>
        <Cancel>
          <Button onClick={changePlan}>Mudar Plano</Button>
          <Button onClick={cancelPlan}>Cancelar plano</Button>
        </Cancel>
      </>
    );
  } else if (onePlan.membership.id === 3) {
    return (
      <>
        <img src={onePlan.membership.image} />
        <h1>Olá, {onePlan.name} </h1>
        <Perks>
          <a href={onePlan.membership.perks[0].link}>
            <Button>{onePlan.membership.perks[0].title}</Button>
          </a>
          <a href={onePlan.membership.perks[1].link}>
            <Button>{onePlan.membership.perks[1].title}</Button>
          </a>
          <a href={onePlan.membership.perks[2].link}>
            <Button>{onePlan.membership.perks[2].title}</Button>
          </a>
          <a href={onePlan.membership.perks[3].link}>
            <Button>{onePlan.membership.perks[3].title}</Button>
          </a>
        </Perks>
        <Cancel>
          <Button onClick={changePlan}>Mudar Plano</Button>
          <Button onClick={cancelPlan}>Cancelar plano</Button>
        </Cancel>
      </>
    );
  }
}

const Perks = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
`;
const Cancel = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 12px;
  gap: 8px;
`;
