import Link from "next/link";
import Image from "next/image";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { getStrapiMedia } from "../utils/medias";

function handleClick(e) {
  e.preventDefault();
}

const ProductsList = ({ products }) => {
  const toast = useToast();
  const router = useRouter();
  if (router.isFallback) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="m-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-8 justify-items-center">
      {products.map((_product) => (
        <div
          key={_product.id}
          className="border rounded-lg bg-gray-100 hover:shadow-lg shadow-md w-11/12 md:w-full	"
        >
          <Link href={`/products/${_product.slug}`}>
            <a>
              <div className="flex justify-center rounded-t-lg bg-white pt-2 pb-2">
                <Image
                  className="ml-50"
                  src={getStrapiMedia(_product.image.url)}
                  alt={_product.title}
                  width="300px"
                  height="300px"
                  objectFit="cover"
                />
              </div>
              <div className="p-4 mt-auto rounded-lg">
                <h4 className="mt-1 font-semibold text-base leading-tight truncate text-gray-700">
                  {_product.title}
                </h4>
                <div className="mt-1 text-sm text-gray-700">
                  {_product.price} сум
                </div>

                {_product.status === "published" ? (
                  <button
                    onClick={(e) => {
                      handleClick(e);
                      toast({
                        title: "Добавлено✨",
                        status: "success",
                        duration: 1500,
                        position: "top",
                        isClosable: true,
                      });
                    }}
                    className="snipcart-add-item w-full mt-4  border border-gray-200 d hover:shadow-lg text-gray-100 font-semibold py-2 px-4 rounded shadow bg-gradient-to-r from-red-600 to-red-600 hover:from-red-600 hover:to-blue-400"
                    data-item-id={_product.id}
                    data-item-price={_product.price}
                    data-item-url={router.asPath}
                    data-item-description={_product.description}
                    data-item-image={getStrapiMedia(
                      _product.image.formats.thumbnail.url
                    )}
                    data-item-name={_product.title}
                    v-bind="customFields"
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
                        Скоро в наличии...
                      </span>
                      <span className="font-semibold mr-2 text-left flex-auto">
                        Пока не доступно...
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
