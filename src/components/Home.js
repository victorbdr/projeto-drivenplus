import { useLocation } from "react-router-dom";
import Button from "./shared/Button";
import { useParams } from "react-router-dom";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
export default function Home() {
  const { plano } = useParams();
  const location = useLocation();
  console.log(location);
  const {
    onePlan: { image, perk, id },
  } = location.state;
  if (id === 1) {
    return (
      <>
        <img src={image} />
        <h1>Olá, fulano</h1>
        <Perks>
          <a href={perk[0].link}>
            <Button>{perk[0].title}</Button>
          </a>
          <a href={perk[1].link}>
            <Button>{perk[1].title}</Button>
          </a>
        </Perks>
        <Cancel>
          <Button>Mudar Plano</Button>
          <Button>Cancelar plano</Button>
        </Cancel>
      </>
    );
  } else if (id === 2) {
    return (
      <>
        <img src={image} />
        <h1>Olá, fulano</h1>
        <Perks>
          <a href={perk[0].link}>
            <Button>{perk[0].title}</Button>
          </a>
          <a href={perk[1].link}>
            <Button>{perk[1].title}</Button>
          </a>
          <a href={perk[2].link}>
            <Button>{perk[2].title}</Button>
          </a>
        </Perks>
        <Cancel>
          <Button>Mudar Plano</Button>
          <Button>Cancelar plano</Button>
        </Cancel>
      </>
    );
  } else if (id === 3) {
    return (
      <>
        <img src={image} />
        <h1>Olá, fulano</h1>
        <Perks>
          <a href={perk[0].link}>
            <Button>{perk[0].title}</Button>
          </a>
          <a href={perk[1].link}>
            <Button>{perk[1].title}</Button>
          </a>
          <a href={perk[2].link}>
            <Button>{perk[2].title}</Button>
          </a>
          <a href={perk[3].link}>
            <Button>{perk[3].title}</Button>
          </a>
        </Perks>
        <Cancel>
          <Button>Mudar Plano</Button>
          <Button>Cancelar plano</Button>
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
