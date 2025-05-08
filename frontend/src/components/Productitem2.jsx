import { Link } from "react-router-dom";

const Productitem2 = ({ id, image, name, price, category, rating }) => {
  return (
    <>
      <Link
        className="text-gray-700 border  w-45 cursor-pointer  "
        to={`/Products2/${id}`}
      >
        <div className="overflow-hidden">
          <div className="card">
            <img
              src={image[0]}
              className="hover:scale-110 transition ease-in-out card-img-top w-full h-[250px]"
              alt="..."
            />
          </div>
        </div>
        <div className="card-body px-4 mb-2">
          {/* <span style={{ color: "green", fontSize: "13px" }}>&#11088;</span> */}
          {/* <span style={{ color: "#303030", fontSize: "13px" }}>
            {rating.stars} | {rating.count}
          </span> */}
          <h5 className="pt-3 pb-1 text-sm card-title">
            {name} || {category}
          </h5>
          <p className="text-sm font-medium card-text">₹{price}.00</p>
        </div>
      </Link>
    </>
  );
};
export default Productitem2;
