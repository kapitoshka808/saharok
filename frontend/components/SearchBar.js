import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { SearchIcon } from "@heroicons/react/outline"
import { useSelector } from "react-redux"
import { getStrapiMedia } from "../utils/medias"

const SearchBar = () => {
  const storeProducts = useSelector((state) => state.items)

  let products = storeProducts.map((product) => {
    return [
      product.id,
      product.title,
      product.description,
      product.image.formats.thumbnail.url,
      product.slug,
    ]
  })

  const [searchTerm, setSearchTerm] = useState("")
  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  let results = searchTerm
    ? products.filter((product) =>
        product[1].toLowerCase().includes(searchTerm.toLocaleLowerCase())
      )
    : []

  // Clear search field, when page changed
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      setSearchTerm("")
    }

    router.events.on("routeChangeStart", handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange)
    }
  }, [router])

  return (
    <div className="relative self-center w-32 md:w-96 ml-auto">
      <label htmlFor="search" className="sr-only">
        Поиск
      </label>
      <div className="relative text-gray-400 focus-within:text-gray-600">
        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
          <SearchIcon className="h-6 w-6 text-gray-700 focus:outline-none" />
        </div>
        <input
          value={searchTerm}
          onChange={handleChange}
          id="search"
          className="block w-full bg-white py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white focus:border-white sm:text-sm"
          placeholder="Поиск"
          type="text"
          name="search"
        />
      </div>

      {results.length !== 0 && searchTerm !== " " ? (
        <div className="absolute shadow bg-white -right-14 md:right-0 top-10 z-40 w-72 sm:w-80 md:w-96 rounded max-h-96 overflow-y-scroll overflow-x-hidden">
          <div className="flex flex-col w-72 sm:w-80 md:w-96">
            {results.map((item) => (
              <Link key={item[0]} href={`/products/${item[4]}`} passHref>
                <div className="cursor-pointer w-72 sm:w-80 md:w-96 border-gray-100 rounded-t border-b hover:bg-teal-100">
                  <div className="flex w-72 sm:w-80 md:w-96 items-center border-transparent border-l-2 hover:border-teal-100">
                    <div className="flex flex-col items-center">
                      <div className="flex bg-orange-500 justify-center items-center w-32 h-32">
                        <Image
                          src={getStrapiMedia(item[3])}
                          alt={item[1]}
                          width={100}
                          height={100}
                          objectFit="cover"
                        />
                      </div>
                    </div>
                    <div className="items-center truncate flex">
                      <div className="mx-2 mt-1 truncate">
                        {item[1]}
                        <div className="text-xs truncate normal-case font-normal text-gray-500">
                          {item[2]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : searchTerm ? (
        <div className="absolute shadow bg-white right-0 top-10 z-40 w-32 md:w-96 rounded overflow-y-auto ">
          <div className="flex flex-col w-full">
            <div className="w-full border-gray-100 rounded-t border-b hover:bg-teal-100">
              <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 hover:border-teal-100">
                <div className="mx-2 mt-1 text-center">Не найдено</div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default SearchBar
