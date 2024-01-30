import { AuthGuard } from "./AuthGuard";
import { Home } from "../view/pages/Home";
import { Login } from "../view/pages/Login";
import { Welcome } from "../view/pages/Welcome";
import { Register } from "../view/pages/Register";
import { Transactions } from "../view/pages/Transactions";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route path="/home" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
