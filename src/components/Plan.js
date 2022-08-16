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
  const { plano } = useParams();

  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const { onePlan, setOnePlan, newPayer, setNewPayer, planId, setPlanId } =
    useContext(UserContext);
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
      setPlanId(response.data.id);
      console.log(planId);
    }, []);
    promise.catch((error) => console.log(error.response));
  });

  function handleForm(event) {
    setNewPayer({ ...newPayer, [event.target.name]: event.target.value });
  }

  return (
    <>
      <Link to="/subscriptions">
        <BackButton>
          <img src="../img/Vector.png" />
        </BackButton>
      </Link>
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
        <Out onClick={() => closeModal(false)}>x</Out>
        <ModalContainer>
          <p>
            Tem certeza que deseja assinar o plano {onePlan.name} (R$
            {onePlan.price})?
          </p>
          <ModalButtons>
            <Button
              small={true}
              grey
              onClick={() => {
                closeModal(false);
              }}
            >
              {" "}
              Não
            </Button>
            <Button small={true} onClick={sendCard}>
              Sim
            </Button>
          </ModalButtons>
        </ModalContainer>
      </Background>
    );
  }
  function sendCard(event) {
    event.preventDefault();
    console.log(newPayer);
    const send = axios.post(
      "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions",
      newPayer,
      config
    );

    send.then((res) => {
      setOnePlan(res.data);
      navigate("/home");
      console.log(res);
    });
    send.catch((error) => console.log(error.response));
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
const Out = styled.div`
  display: flex;
  position: fixed;
  top: 25px;
  right: 20px;
  width: 28px;
  height: 24px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;
const BackButton = styled.div`
  display: flex;
  width: 25px;
  height: 25px;
  position: fixed;
  left: 22px;
  top: 24px;
`;
const ModalButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
