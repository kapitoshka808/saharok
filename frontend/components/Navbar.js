import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";

const Navbar = () => {
  const totalItemsInCart = useSelector((state) => state.totalItemsInCart);

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
      <Link href="/cart">
        <a className="ml-auto mr-4 my-auto">
          <button className="relative m-auto flex focus:outline-none">
            <ShoppingCartIcon className="h-10 w-10 ml-2 sm:ml-0  text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grey-500" />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {totalItemsInCart}
            </span>
          </button>
        </a>
      </Link>
    </div>
  );
};

export default Navbar;
