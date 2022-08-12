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
  });

  return (
    <>
      <h1>Escolha seu plano</h1>

      {plans.map((plan) => (
        <Link to={`/subscriptions/${plan.id}`} key={plan.id}>
          <Box
            key={plan.id}
            name={plan.name}
            price={plan.price}
            img={plan.img}
          />
        </Link>
      ))}
    </>
  );
}
function Box({ image }) {
  return (
    <Container>
      <img className="poster" src={image} alt="plan" />
    </Container>
  );
}
const Container = styled.div`
  width: 290px;
  height: 180px;
`;
