import Footer from "./Footer"
import Navbar from "./Navbar"

const Layout = ({ children }) => {
  return (
    <div className="flex justify-center bg-gray-200">
      <div className="max-w-screen-xl flex flex-col min-h-screen w-full">
        <Navbar />
        <div className="mx-4 sm:mx-8 flex-grow">{children}</div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
