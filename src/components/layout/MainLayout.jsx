import Header from "./Header"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full" />
      </div>
      <Header />

      <Outlet />

      <Footer />
    </div>
  )
}