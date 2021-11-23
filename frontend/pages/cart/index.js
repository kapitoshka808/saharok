import Link from "next/link"
import Image from "next/image"
import Head from "next/head"
import { useSelector, useDispatch } from "react-redux"
import { getStrapiMedia } from "../../utils/medias"
import { ShoppingBagIcon } from "@heroicons/react/outline"
import { increseAmount, decreseAmount } from "../../features/shop/productSlice"
import DeleteButton from "../../components/DeleteButton"

function Cart() {
  const addedItems = useSelector((state) => state.addedItems)
  const totalItemsInCart = useSelector((state) => state.totalItemsInCart)
  const total = useSelector((state) => state.total)
  const dispatch = useDispatch()

  return (
    <>
      <Head>
        <title>
          Корзина ({totalItemsInCart}) | Сахарок 🛍👗 - купить женскую одежду
          онлайн в магазине бутике Ташкента
        </title>
      </Head>
      {totalItemsInCart === 0 ? (
        <>
          <h1 className="text-center mt-8 text-xl font-medium text-gray-900">
            Ваша Корзина пуста.
          </h1>
          <Link href={"/"}>
            <a>
              <p className="text-lg text-center text-red-600">
                Отправляйтесь за покупками на главную страницу!
              </p>
            </a>
          </Link>
        </>
      ) : (
        <>
          <h1 className="text-center mt-8 text-xl font-medium text-gray-900">
            Содержимое корзины
          </h1>
          {addedItems.map((item) => {
            return (
              <div key={item.id} className="py-2 mx-2 md:mx-0">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                  <div className="relative bg-white shadow overflow-hidden rounded-lg">
                    <ul className="divide-y divide-gray-200">
                      <li>
                        <div className="flex items-center px-4 py-4 sm:px-6">
                          <div className="min-w-0 flex-1 flex items-start">
                            <div className="flex-shrink-0 self-start">
                              <Link href={`/products/${item.slug}`}>
                                <a>
                                  <Image
                                    src={getStrapiMedia(
                                      item.image.formats.thumbnail.url
                                    )}
                                    alt={item.title}
                                    width="100px"
                                    height="100px"
                                    objectFit="cover"
                                  />
                                </a>
                              </Link>
                            </div>
                            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                              <div>
                                <Link href={`/products/${item.slug}`}>
                                  <a>
                                    <p className="mr-4 md:mr-0 text-lg font-medium text-gray-900">
                                      {item.title}
                                    </p>
                                    <p className="flex items-center text-base text-gray-700">
                                      {item.description}
                                    </p>
                                    <p className="flex items-center text-base text-gray-700">
                                      Размер: {item.sizes}
                                    </p>
                                  </a>
                                </Link>
                              </div>

                              <DeleteButton itemId={item.id} />

                              <div className="flex flex-col">
                                <p className=" font-medium text-base text-gray-900">
                                  Цена за шт:{" "}
                                  {new Intl.NumberFormat("ru").format(
                                    item.price
                                  )}{" "}
                                  сум
                                </p>
                                <div className="w-32">
                                  <label
                                    htmlFor="quantity-of-products"
                                    className="w-full text-base text-gray-700"
                                  >
                                    Количество
                                  </label>
                                  <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                                    <button
                                      onClick={() => {
                                        dispatch(decreseAmount(item.id))
                                      }}
                                      className="bg-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none text-lg focus:outline-none"
                                    >
                                      −
                                    </button>
                                    <input
                                      type="number"
                                      className="text-center outline-none focus:outline-none pl-4 w-full bg-gray-300 font-semibold text-md md:text-basecursor-default text-gray-900"
                                      name="quantity-of-products"
                                      value={item.quantity}
                                      readOnly
                                    />
                                    <button
                                      onClick={() => {
                                        dispatch(increseAmount(item.id))
                                      }}
                                      className="bg-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer text-lg focus:outline-none"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
          <div className="max-w-7xl mx-2 md:mx-0 py-6 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Общая сумма: {new Intl.NumberFormat("ru").format(total)} сум
                  </h3>
                  <div className="mt-2 text-base text-gray-900">
                    <p>
                      Оставьте номер телефона и мы перезвоним Вам для получения
                      адреса доставки
                    </p>
                  </div>

                  <form
                    action="https://formsubmit.co/17e7e37b502197eaecd5e4a705581faf"
                    method="POST"
                    className="mt-5 sm:flex sm:items-end"
                  >
                    <div className="w-full sm:max-w-xs">
                      <label htmlFor="tel" className="text-gray-900">
                        Номер телефона
                      </label>
                      <input
                        type="tel"
                        name="Телефон"
                        id="tel"
                        className="p-1 h-10 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-lg  border border-gray-600 rounded-md"
                        placeholder="+998*********"
                        pattern="^\+?(?:998)?[012345789][012345789][0-9]{7}$"
                        required
                      />
                    </div>

                    {addedItems.map((item) => {
                      return (
                        <input
                          key={item.id}
                          className="hidden"
                          type="text"
                          name={`ID товара: ${item.id}`}
                          value={
                            `Фото: ${item.image.url} ***` +
                            `Название товара: ${item.title} ***` +
                            `Количество: ${item.quantity} ***` +
                            `Цена за шт: ${new Intl.NumberFormat("ru").format(
                              item.price
                            )}`
                          }
                          required
                          readOnly
                        />
                      )
                    })}
                    <input
                      className="hidden"
                      type="text"
                      name="Всего"
                      value={`${new Intl.NumberFormat("ru").format(total)}`}
                      required
                      readOnly
                    />

                    <input
                      type="hidden"
                      name="_next"
                      value="https://saharok.vercel.app/thanks"
                    />

                    <button
                      type="submit"
                      className="text-sm mt-4 h-10 w-full inline-flex items-center justify-center px-4 py-2 border border-gray-500 shadow-sm font-medium rounded-md text-white bg-gradient-to-r from-red-600 to-blue-400 hover:from-red-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 md:w-auto sm:text-base"
                    >
                      <ShoppingBagIcon className="h-6 w-6 mr-2 text-gray-100" />
                      Оформить заказ ( {totalItemsInCart} )
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Cart
