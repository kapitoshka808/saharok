import Link from "next/link";
import { getCategories } from "../utils/api";

const categories = await getCategories();

const CategoryButtons = () => {
  return (
    <div className="container flex flex-wrap gap-2 mt-8 justify-center">
      {categories.map((_category) => (
        <Link href={`/categories/${_category.slug}`} key={_category.id}>
          <a className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            {_category.name}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default CategoryButtons;
