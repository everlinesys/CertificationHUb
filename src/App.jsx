import { Routes, Route } from "react-router-dom"
import MainLayout from "./components/layout/MainLayout"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Category from "./pages/Category"
import Exam from "./pages/Exam"
import ResultGate from "./pages/ResultGate"

export default function App() {
  return (
    <MainLayout >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/exam/:id" element={<Exam />} />
        <Route path="/result" element={<ResultGate />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </MainLayout>
  )
}