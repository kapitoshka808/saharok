import CategoryButtons from "./CategoryButtons";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children, categories }) => {
  return (
    <div className="flex justify-center bg-gray-200">
      <div className="max-w-screen-lg flex flex-col min-h-screen w-full">
        <Navbar />
        <CategoryButtons categories={categories} />
        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
      <div
        hidden
        id="snipcart"
        data-api-key="MWIyM2IxYzItYjg3OS00OWNmLTgyMTEtODU4NTU3MTg2NjRhNjM3NTY3NTM3MzY3OTgwNjMw"
        data-config-add-product-behavior="none"
        data-config-modal-style="side"
      ></div>
    </div>
  );
};

export default Layout;
