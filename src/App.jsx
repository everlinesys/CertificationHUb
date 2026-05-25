import { Routes, Route } from "react-router-dom"

import MainLayout from "./components/layout/MainLayout"
import AdminLayout from "./components/layout/AdminLayout"

import AdminRoute from "./pages/admin/AdminRoute"
import ProtectedRoute from "./components/ProtectedRoute" // ✅ ADD THIS

import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Category from "./pages/Category"
import Categories from "./components/home/Categories"
import Exam from "./pages/Exam"
import ResultGate from "./pages/ResultGate"

import StudentDashboard from "./pages/student/StudentDashboard"

import Dashboard from "./pages/admin/AdminDashboard"
import CreateCertification from "./pages/admin/CreateCertification"
import AddQuestions from "./pages/admin/AddQuestions"
import AdminCategories from "./pages/admin/AdminCategories"
import UsersPage from "./pages/admin/UserPage"
import StudentLayout from "./pages/student/Studentlayout"
import MyCertificates from "./pages/student/MyCertificates"
import Explore from "./pages/student/Explore"
import CertificatePage from "./pages/Certificate"
import About from "./pages/About"
import ScrollToTop from "./components/layout/ScrollToTop"
import Terms from "./pages/Terms"
import Privacy from "./pages/Privacy"
import Support from "./pages/Support"
import ForgotPassword from "./pages/ForgotPassword"
import VerifyCertificate from "./pages/VerifyCertificate"

export default function App() {
  return (<>
    <ScrollToTop />
    <Routes>

      {/* 🌐 MAIN APP */}
      <Route element={<MainLayout />}>

        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:id" element={<Category />} />

        <Route path="/exam/:id" element={<Exam />} />
        <Route path="/result" element={<ResultGate />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/certificate/:id" element={<CertificatePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/support" element={<Support />} />
        <Route
          path="/verify"
          element={<VerifyCertificate />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        {/* 🔐 STUDENT ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="certificates" element={<MyCertificates />} />
          <Route path="explore" element={<Explore />} />
          <Route path="category/:id" element={<Category />} />

        </Route>

      </Route>

      {/* 🔐 ADMIN ROUTES */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="create" element={<CreateCertification />} />
        <Route path="questions" element={<AddQuestions />} />
        <Route path="questions/:id" element={<AddQuestions />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="categories" element={<AdminCategories />} />
      </Route>

    </Routes></>
  )
}