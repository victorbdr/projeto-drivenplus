import UserContext from "../contexts/UserContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Plan() {
  const { plano } = useParams();
  const [onePlan, setOnePlan] = useState([]);
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
      console.log(promise);
      setOnePlan(response.data);
    });
  });
  return (
    <>
      <Link to={"/subscriptions/home"}>
        <Plans
          }
        />
      </Link>
    </>
  );
}
function Plans({ image, price, perks }) {
  return (
    <List>
      {image}
      {price}
      {perks}
    </List>
  );
}
const List = styled.div`
  display: flex;
`;
