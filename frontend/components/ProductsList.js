import Link from "next/link"
import Image from "next/image"
import { useDispatch } from "react-redux"
import { addProduct } from "../features/shop/productSlice"
import { getStrapiMedia } from "../utils/medias"

function handleClick(e) {
  e.preventDefault()
}

const ProductsList = ({ products }) => {
  const dispatch = useDispatch()

  return (
    <>
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg bg-gray-100 hover:shadow-lg shadow-md w-11/12 md:w-full	"
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
                  {new Intl.NumberFormat("ru").format(product.price)} сум
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
      ))}
    </>
  )
}

export default ProductsList
