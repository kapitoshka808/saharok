import Head from "next/head"
import ProductsList from "../components/ProductsList"
import Link from "next/link"
import Image from "next/image"
import { useDispatch } from "react-redux"
import { getStrapiMedia } from "../utils/medias"
import { useSWRInfinite } from "swr"
import { addProduct } from "../features/shop/productSlice"

const fetcher = (url) => fetch(url).then((r) => r.json())

const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }/products?_start=${pageIndex + 4}&_limit=1&_sort=created_at:desc`
}

export async function getStaticProps() {
  const products = await fetcher(
    `${
      process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
    }/products?_start=0&_limit=4&_sort=created_at:desc`
  )

  return {
    props: { products },
  }
}

const HomePage = ({ products }) => {
  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher, {
    initialSize: 0,
    revalidateAll: true,
  })

  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 1)

  function handleClick(e) {
    e.preventDefault()
  }

  const dispatch = useDispatch()

  return (
    <div>
      <Head>
        <title>
          Сахарок 🛍👗 - купить женскую одежду онлайн в магазине бутике Ташкента
        </title>
      </Head>

      {!products ? (
        <p>Loading...</p>
      ) : error ? (
        <div>Error.</div>
      ) : (
        <div className="mx-auto grid max-w-lg md:max-w-3xl lg:max-w-none m-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-8 justify-items-center">
          <ProductsList products={products} />
          {data !== undefined
            ? data.map((mapedData) => {
                return mapedData.map((product) => (
                  <div
                    key={product.id}
                    className=" border rounded-lg bg-gray-100 hover:shadow-lg shadow-md w-11/12 md:w-full	"
                  >
                    <Link href={`/products/${product.slug}`}>
                      <a>
                        <div className="flex justify-center rounded-t-lg bg-white pt-2 pb-2">
                          <Image
                            src={getStrapiMedia(product.image.url)}
                            alt={product.title}
                            width={300}
                            height={300}
                            objectFit="cover"
                          />
                        </div>
                        <div className="p-4 mt-auto rounded-lg">
                          <h4 className="mt-1 font-semibold text-base leading-tight truncate text-gray-700">
                            {product.title}
                          </h4>
                          <div className="mt-1 text-sm text-gray-700">
                            {new Intl.NumberFormat("ru").format(product.price)}{" "}
                            сум
                          </div>

                          {product.status === "published" ? (
                            <button
                              onClick={(e) => {
                                handleClick(e)
                                dispatch(addProduct(product.id))
                              }}
                              className="w-full mt-4  border border-gray-200 d hover:shadow-lg text-gray-100 font-semibold py-2 px-4 rounded shadow bg-gradient-to-r from-red-600 to-red-600 hover:from-red-600 hover:to-blue-400"
                            >
                              Добавить в корзину
                            </button>
                          ) : (
                            <div className="text-center mr-10 mb-1">
                              <div
                                className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
                                role="alert"
                              >
                                <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                                  Скоро в наличии...
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </a>
                    </Link>
                  </div>
                ))
              })
            : null}
        </div>
      )}
      {!isReachingEnd ? (
        <div className="flex justify-center">
          <button
            onClick={() => setSize(size + 4)}
            className="mx-4 sm:mx-8 sm:w-60 my-2 border border-gray-200 d hover:shadow-lg text-gray-100 font-semibold py-2 px-4 rounded shadow bg-gradient-to-r from-red-600 to-red-600 hover:from-red-600 hover:to-blue-400"
          >
            Загрузить ещё...
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default HomePage
