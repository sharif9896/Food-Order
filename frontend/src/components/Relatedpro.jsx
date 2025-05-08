import Title from "../pages/Title";
import Productitem from "./Productitem";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Relatedpro = ({ category, subcategory }) => {
  const products = useSelector((state) => state.items.item[0]);
  const [related, setrelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let procy = products.slice();
      procy = procy.filter((data) => category === data.category);
      procy = procy.filter((data) => subcategory === data.subcategory);
      setrelated(procy.slice(0, 5));
    }
  }, [products]);
  return (
    <>
      <div className="my-24">
        <div className="text-center text-3xl py-2">
          <Title text1={"RELATED"} text2={"PRODUCTS"} />
        </div>
        <div className="flex justify-center flex-wrap gap-4">
          {related.map((data, index) => (
            <Productitem
              key={index}
              id={data._id}
              name={data.name}
              price={data.price}
              image={data.image}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default Relatedpro;
