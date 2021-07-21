import Link from "next/link"
import { useSelector } from "react-redux"

const CategoryButtons = () => {
  const categories = useSelector((state) => state.categories)

  return (
    <div className="container flex flex-wrap gap-2 mt-8 justify-center">
      {categories.map((category) => (
        <Link href={`/categories/${category.slug}`} key={category.id}>
          <a className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            {category.name}
          </a>
        </Link>
      ))}
    </div>
  )
}

export default CategoryButtons
