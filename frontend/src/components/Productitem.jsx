import { Link } from "react-router-dom";
import { IoIosStar } from "react-icons/io";

const Productitem = ({ id, image, name, price, category, rating, dis }) => {
  return (
    <>
      <a
        className="text-gray-700 border rounded-[15px] w-auto cursor-pointer  "
        href={`/Products/${id}`}
      >
        <div className="overflow-hidden rounded-[15px]">
          <div className="card rounded-[15px] shadow relative">
            {/* <div className="absolute top-50 py-1 px-1 bg-gradient-to-r from-950 to-blue-600 rounded text-white left-0 ">
              50% OFF
            </div> */}
            <img
              src={image[0]}
              className="hover:scale-110 transition ease-in-out card-img-top w-full h-[250px]"
              alt="..."
            />
          </div>
        </div>
        <div className="card-body px-4">
          <p className="text-sm font-medium card-text py-1">{name}</p>
          <p className="text-sm font-medium card-text">{dis}</p>
        </div>
        <div className="card-body px-4 mb-2 flex justify-between">
          <p className="text-sm font-medium card-text py-1">₹{price}.00</p>
          {/* <span
            style={{ color: "green", fontSize: "13px" }}
            className="bg-green-700 py-1 px-1"
          >

          </span> */}
          <span
            style={{ color: "#fff", fontSize: "13px" }}
            className="bg-green-700 py-1 px-1 rounded"
          >
            <div className="flex gap-1">
              <span className="py-1">
                <IoIosStar />
              </span>{" "}
              {rating}
            </div>
          </span>
        </div>
      </a>
    </>
  );
};
export default Productitem;
