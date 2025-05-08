import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Title from "./Title";
import Productitem2 from "./Productitem2";

const Categories2 = () => {
  const [productdata, setproductdata] = useState([]);
  const product = useSelector((store) => store.item2.item[0]);
  const { category, subcategory } = useParams();
  const [image, setimage] = useState("");
  const [main, setmain] = useState([]);

  const fetchproduct = async () => {
    product.map((item) => {
      if (item.category === category && item.subcategory === subcategory) {
        setproductdata(item);
        setimage(item.image[0]);
        return null;
      }
    });
  };
  useEffect(() => {
    fetchproduct();
  }, [category, subcategory]);
  const maindata = product.filter(
    (data) =>
      productdata.category === data.category &&
      productdata.subcategory === data.subcategory
  );
  return (
    <>
      <br />

      <div className="text-left mx-20 py-2 text-3xl">
        <Title
          text1={productdata.category}
          text2={productdata.subcategory}
        ></Title>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {maindata.map((data, index) => (
          <Productitem2
            key={index}
            id={data._id}
            name={data.name}
            image={data.image}
            price={data.price}
            category={data.category}
            rating={data.rating}
          ></Productitem2>
        ))}
      </div>
    </>
  );
};
export default Categories2;
