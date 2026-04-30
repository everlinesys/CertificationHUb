import Hero from "../components/home/Hero"
import Categories from "../components/home/Categories"
import Featured from "../components/home/Featured"

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Hero />
      <Categories />
      <Featured />
    </div>
  )
}