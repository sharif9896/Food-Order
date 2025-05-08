import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Productitem from "./Productitem";
import Categories_slider from "./Categories_slider";
import Title from "../pages/Title";

const Categories = () => {
  const [productdata, setproductdata] = useState([]);
  const product = useSelector((store) => store.items.item[0]);
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
      <div className="flex flex-wrap justify-center gap-4">
        {maindata.map((data, index) => (
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
export default Categories;
