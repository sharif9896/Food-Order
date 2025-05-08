import { Link } from "react-router-dom";
import { useState } from "react";

const Blazer_categoryscat2 = ({
  id,
  name,
  image,
  description,
  category,
  subcategory,
}) => {
  const [truehover, settruehover] = useState(false);
  return (
    <>
      <Link
        className="relative text-gray-700 border rounded w-45 sm:w-65  cursor-pointer  "
        to={`/Categories2/${category}/${subcategory}`}
      >
        <div className="overflow-hidden">
          <div className={`card h-[300px]`}>
            <img
              src={image[0]}
              onMouseEnter={() => settruehover(true)}
              onMouseLeave={() => settruehover(false)}
              className="hover:scale-110 transition-all ease-in-out duration-300 card-img-top w-full h-[350px]"
              alt="..."
            />
          </div>
        </div>
        <div className="card-body px-4 mb-2">
          <h5 className="pt-3 pb-1 text-sm card-title">{description}</h5>
        </div>
        <Link
          onMouseEnter={() => settruehover(true)}
          className={`absolute top-30 left-15 w-36 opacity-90 py-2 px-2 cursor-pointer bg-white text-gray-600 text-center ${
            truehover ? "block" : "hidden"
          }`}
          to={`/Categories2/${category}/${subcategory}`}
        >
          {category} {subcategory}
        </Link>
      </Link>
    </>
  );
};
export default Blazer_categoryscat2;
