import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import { useState } from "react";
import UserContext from "../contexts/UserContext";
import ReactDOM from "react-dom";
import Home from "./Home";
import LogIn from "./LogIn";
import Plan from "./Plan";
import Register from "./Register";
import Subscriptions from "./Subscriptions";
export default function App() {
  const [token, setToken] = useState([]);
  return (
    <UserContext.Provider value={{ token, setToken }}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />}></Route>
          <Route path="/sign-up/" element={<Register />}></Route>
          <Route path="/subscriptions/" element={<Subscriptions />}></Route>
          <Route path="/subscriptions/:plano" element={<Plan />}></Route>
          <Route path="/home/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

ReactDOM.render(<App />, document.querySelector(".root"));
