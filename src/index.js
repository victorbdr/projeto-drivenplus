import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./components/globalStyles";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import ReactDOM from "react-dom";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import Plan from "./components/Plan";
import Register from "./components/Register";
import Subscriptions from "./components/Subscriptions";
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
