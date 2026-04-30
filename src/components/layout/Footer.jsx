export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 border-t border-zinc-800 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm flex flex-col md:flex-row justify-between gap-4">

        <p>© {new Date().getFullYear()} CertifyPro. All rights reserved.</p>

        <div className="flex gap-4">
          <span className="hover:text-white cursor-pointer">Privacy</span>
          <span className="hover:text-white cursor-pointer">Terms</span>
          <span className="hover:text-white cursor-pointer">Support</span>
        </div>

      </div>
    </footer>
  )
}