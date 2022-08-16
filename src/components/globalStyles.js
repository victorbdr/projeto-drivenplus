import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    justify-content: center;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    background: black;
    }
    h1{
color: #fff;
    }
`;

export default GlobalStyle;
