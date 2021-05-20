import Head from "next/head";
import ProductsList from "../components/ProductsList";
import { getProducts } from "../utils/api";

const HomePage = ({ products }) => {
  return (
    <div>
      <Head>
        <title>
          Сахарок 🛍👗 - купить женскую одежду онлайн в магазине бутике Ташкента
        </title>
      </Head>
      <ProductsList products={products} />
    </div>
  );
};

export async function getStaticProps() {
  const products = await getProducts();
  return { props: { products } };
}

export default HomePage;
