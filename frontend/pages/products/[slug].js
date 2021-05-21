import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { getProducts, getProduct } from "../../utils/api";
import { getStrapiMedia } from "../../utils/medias";

const ProductPage = ({ product }) => {
  const toast = useToast();
  const router = useRouter();
  if (router.isFallback) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="m-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-8">
      <Head>
        <title>
          {product.title} | Сахарок 🛍👗 - купить женскую одежду онлайн в
          магазине бутике Ташкента
        </title>
      </Head>
      <div className="flex justify-center rounded-t-lg pt-2 pb-2">
        <Image
          src={getStrapiMedia(product.image.url)}
          alt={product.title}
          width="300px"
          height="300px"
          objectFit="cover"
        />
      </div>
      <div className="w-full p-5 flex flex-col justify-between">
        <div>
          <h4 className="mt-1 font-semibold text-lg leading-tight truncate text-gray-700">
            {product.title}
          </h4>
          <div className="mt-1 text-gray-600">{product.description}</div>
          <div className="mt-1 text-lg text-gray-700">
            Размер: {product.sizes}
          </div>
          <div className="mt-4 text-lg text-gray-700">
            Цена: {product.price} сум
          </div>
        </div>

        {product.status === "published" ? (
          <button
            className="snipcart-add-item mt-4 border border-gray-200 hover:shadow-lg text-gray-100 font-semibold py-2 px-4 rounded shadow bg-gradient-to-r from-red-600 to-red-600 hover:from-red-600 hover:to-blue-400"
            data-item-id={product.id}
            data-item-price={product.price}
            data-item-url={router.asPath}
            data-item-description={product.description}
            data-item-image={getStrapiMedia(
              product.image.formats.thumbnail.url
            )}
            data-item-name={product.title}
            v-bind="customFields"
            onClick={() => {
              toast({
                title: "Добавлено✨",
                status: "success",
                duration: 1500,
                position: "top",
                isClosable: true,
              });
            }}
          >
            Добавить в корзину
          </button>
        ) : (
          <div className="text-center mr-10 mb-1" v-else>
            <div
              className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
              role="alert"
            >
              <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                Coming soon...
              </span>
              <span className="font-semibold mr-2 text-left flex-auto">
                This article is not available yet.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;

export async function getStaticProps({ params }) {
  const product = await getProduct(params.slug);
  return { props: { product } };
}

export async function getStaticPaths() {
  const products = await getProducts();
  return {
    paths: products.map((_product) => {
      return {
        params: { slug: _product.slug },
      };
    }),
    fallback: true,
  };
}
