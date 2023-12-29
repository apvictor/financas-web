import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Welcome } from "../view/pages/Welcome";
import { Login } from "../view/pages/Login";
import { Register } from "../view/pages/Register";
import { Home } from "../view/pages/Home";
import { AuthGuard } from "./AuthGuard";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
