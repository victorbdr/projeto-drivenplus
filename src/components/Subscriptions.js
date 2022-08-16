import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

import { useContext, useState, useEffect } from "react";
import UserContext from "../contexts/UserContext";
export default function Subscriptions() {
  const { token } = useContext(UserContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    const promise = axios.get(
      "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships",
      config
    );

    promise.then((response) => {
      console.log(promise);
      setPlans(response.data);
    });
  }, []);

  return (
    <>
      <h1>Escolha seu plano</h1>

      {plans.map((plan) => (
        <Link to={`/subscriptions/${plan.id}`} key={plan.id}>
          <Box
            key={plan.id}
            name={plan.name}
            price={plan.price}
            img={plan.image}
          />
        </Link>
      ))}
    </>
  );
}
function Box({ img, price }) {
  return (
    <Container>
      <img src={img} />
      <p>R${price}</p>
    </Container>
  );
}
const Container = styled.div`
  align-items: center;
  justify-content: space-around;
  background: #0e0e13;
  border: 3px solid #7e7e7e;
  border-radius: 12px;
  display: flex;
  width: 290px;
  height: 180px;
  img {
    width: 139.38px;
    height: 95.13px;
  }
  p {
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;

    color: #ffffff;
  }
`;
