import { useSelector } from "react-redux";
import Title from "../pages/Title";
import { useEffect, useState } from "react";
import Productitem from "./Productitem";
import { products } from "../assets/assets";

const Bestseller = () => {
  const [filterpro, setfilterpro] = useState([]);
  const product = useSelector((state) => state.items);
  useEffect(() => {
    const finalproduct = product.filter((data) => data.bestseller);
    setfilterpro(finalproduct.slice(0, 6));
  }, []);
  return (
    <>
      <div className="my-10">
        <div className="text-center py-8 text-3xl">
          <Title text1={"PROVEN BEST"} text2={"SELLER"}></Title>
          <p className="w-3/4 m-auto sm:text-sm md:text-base text-xs text-gray-600">
            "Fashion is very important It is life-enhancing and, like every
            thing that gives pleasure,it is worth doing well".
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {filterpro.map((data, index) => (
          <Productitem
            key={index}
            id={data._id}
            name={data.name}
            image={data.image}
            price={data.price}
            category={data.category}
            rating={data.rating}
          ></Productitem>
        ))}
      </div>
    </>
  );
};
export default Bestseller;
