import { useSelector } from "react-redux";
import Title from "../pages/Title";
import { useEffect, useState } from "react";
import Productitem from "./Productitem";
import { products } from "../assets/assets";
import Bestseller from "./Bestseller";
import Blazer_categoryscat from "./Blazer_categoryscat";
import FoodSlider from "./FoodSlider";

const Latest_collections = () => {
  const [filterpro, setfilterpro] = useState([]);
  const [blazercat, setbazercat] = useState([]);
  const product = useSelector((state) => state.items);
  // const Blazer_categorys = useSelector((store) => store.Blazer_categorys[0]);
  useEffect(() => {
    setfilterpro(product.slice());
  }, []);
  // useEffect(() => {
  //   setbazercat(Blazer_categorys);
  // }, []);
  return (
    <>
      {/* <div className="my-10">
        <div className="text-center py-8 text-3xl">
          <Title text1={"OUR"} text2={"CATEGORIES"}></Title>
          <p className="w-3/4 m-auto sm:text-sm md:text-base text-xs text-gray-600">
            "Fashion is very important It is life-enhancing and, like every
            thing that gives pleasure,it is worth doing well".
          </p>
        </div>
      </div> */}
      <FoodSlider />
      <div className="flex flex-wrap justify-center gap-4">
        {/* {blazercat.map((data, index) => (
          <Blazer_categoryscat
            key={index}
            id={data._id}
            name={data.name}
            image={data.image}
            description={data.description}
            category={data.category}
            subcategory={data.subcategory}
          ></Blazer_categoryscat>
        ))} */}
      </div>
      {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-x-2">
        {product.map((data, index) => (
          <Productitem
            key={index}
            id={data._id}
            name={data.title}
            dis={data.description}
            image={data.image.url}
            price={data.price}
            rating={data.ratings}
          ></Productitem>
        ))}
      </div> */}
      {/* <Bestseller /> */}
    </>
  );
};
export default Latest_collections;

// <div className="my-10">
//   <div className="text-center  text-3xl">
//     {/* <Title text1={"LATEST"} text2={"COLLECTIONS"}></Title> */}
//     <p className="w-3/4 m-auto sm:text-sm md:text-base text-xs text-gray-600">
//       "Fashion is very important It is life-enhancing and, like every
//       thing that gives pleasure,it is worth doing well".
//     </p>
//   </div>
// </div>
