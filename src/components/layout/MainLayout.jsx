import Header from "./Header"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-white">
      {/* <Header /> */}
  
      <Outlet />

      <Footer />
    </div>
  )
}