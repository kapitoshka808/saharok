import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/outline";

const Navbar = () => {
  return (
    <div className="flex justify-between ml-6 mr-6 mt-4">
      <Link href="/">
        <a>
          <img
            src="/logo.png"
            alt="home"
            className="logo"
            height="250"
            width="250"
          />
        </a>
      </Link>
      <button className="snipcart-checkout relative my-auto flex">
        <ShoppingCartIcon className="h-8 w-8 ml-2 sm:ml-0 sm:h-10 sm:w-10 text-gray-900" />
        <span className="snipcart-items-count absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"></span>
      </button>
    </div>
  );
};

export default Navbar;
