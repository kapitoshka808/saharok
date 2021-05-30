import Head from "next/head";
import ProductsList from "../../components/ProductsList";
import { getCategories, getCategory } from "../../utils/api";

const CategoryPage = ({ category }) => {
  return (
    <div>
      <Head>
        <title>
          {category.name} | Сахарок 🛍👗 - купить женскую одежду онлайн в
          магазине бутике Ташкента
        </title>
      </Head>
      <ProductsList products={category.products} />
    </div>
  );
};

export default CategoryPage;

export async function getStaticProps({ params }) {
  const category = await getCategory(params.slug);
  return { props: { category } };
}

export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map((_category) => {
      return {
        params: { slug: _category.slug },
      };
    }),
    fallback: true,
  };
}
