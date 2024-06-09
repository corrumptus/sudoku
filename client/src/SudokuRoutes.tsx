import { Routes, Route } from "react-router-dom";
import DevAPI from "./routes/DevAPI";
import EditUser from "./routes/EditUser";
import Home from "./routes/Home";
import Jogar from "./routes/Jogar";
import Login from "./routes/Login";
import Quemsomos from "./routes/Quemsomos";
import Ranking from "./routes/Ranking";
import Signup from "./routes/Signup";
import User from "./routes/User";

export default function SudokuRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jogar/:id" element={<Jogar />} />
      <Route path="/quemsomos" element={<Quemsomos />} />
      <Route path="/api" element={<DevAPI />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/user/:name" element={<User />} />
      <Route path="/user/edit" element={<EditUser />} />
      <Route path="/ranking/:id" element={<Ranking />} />
    </Routes>
  )
}