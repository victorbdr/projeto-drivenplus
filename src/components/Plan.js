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
  const [openModal, setOpenModal] = useState(false);
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
  const { onePlan, setOnePlan } = useContext(UserContext);
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

  function handleForm(event) {
    setNewPayer({ ...newPayer, [event.target.name]: event.target.value });
  }

  return (
    <>
      <Form>
        <List>
          <img src={onePlan.image} />
          <h1>{onePlan.name}</h1>
          <p>Benefícios:</p>
          <p>R${onePlan.price} cobrados mensalmente</p>
        </List>
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
        <Button
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            setOpenModal(true);
          }}
        >
          Assinar
        </Button>
        {openModal && <Modal closeModal={setOpenModal} />}
      </Form>
    </>
  );
  function Modal({ closeModal }) {
    return (
      <Background>
        <button onClick={() => closeModal(false)}>x</button>
        <ModalContainer>
          <p>
            Tem certeza que deseja assinar o plano {onePlan.name} (R$
            {onePlan.price})?
          </p>
          <Button
            onClick={() => {
              closeModal(false);
            }}
          >
            {" "}
            Não
          </Button>
          <Button onClick={sendCard}>Sim</Button>
        </ModalContainer>
      </Background>
    );
  }
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
      setOnePlan(res.data);
      navigate(
        "/home" /* {
        state: {
          onePlan: {
            id: onePlan.id,
            img: onePlan.image,
            perk: onePlan.perks,
          },
        },
      } */
      );
      console.log(res);
    });
  }
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
const Background = styled.div`
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalContainer = styled.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
  width: 248px;
  height: 210px;
  background-color: #ffffff;
  border-radius: 12px;
  p {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    text-align: center;

    color: #000000;
    .body {
      flex: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  }
`;
