import { useLocation } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Button from "./shared/Button";
import { useParams } from "react-router-dom";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
export default function Home({ membership }) {
  const { setAndPersistToken } = useContext(UserContext);
  const { token } = useContext(UserContext);
  const { onePlan, setOnePlan } = useContext(UserContext);
  const navigate = useNavigate();
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
      console.log(response);
    });
    promise.catch((error) => console.log(error.response));
  }

  function changePlan(event) {
    event.preventDefault();
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
          <Link to="/subscriptions/">
            <Button onClick={cancelPlan}>Mudar Plano</Button>
          </Link>
          <Button orange onClick={cancelPlan}>
            Cancelar plano
          </Button>
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
          <Link to="/subscriptions/">
            <Button onClick={cancelPlan}>Mudar Plano</Button>
          </Link>
          <Button orange onClick={cancelPlan}>
            Cancelar plano
          </Button>
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
          <Link to="/subscriptions/">
            <Button onClick={cancelPlan}>Mudar Plano</Button>
          </Link>
          <Button orange onClick={cancelPlan}>
            Cancelar plano
          </Button>
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
