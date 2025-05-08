import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <>
      <div>
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mx-10 my-10 mt-40 text-sm">
          <div>
            <img src={assets.logo} className="w-32 mb-5" alt="" />
            <p className="w-full md:w-2/3 text-gray-600">
              We are passionate about delivering an exceptional shopping
              experience. Our team is dedicated to providing top-notch customer
              service, ensuring your satisfaction at every step. From selecting
              the perfect product to delivering it to your doorstep, we go the
              extra mile to make your experience seamless and enjoyable.
            </p>
          </div>
          <div>
            <p className="text-xl font-medium mb-5">Company</p>
            <ul className="flex flex-col gap-1 text-gray-600">
              <li>Home</li>
              <li>Collections</li>
              <li>About US</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-1 text-gray-600">
              <li>+918838612520</li>
              <li>contact@westernleathersyou.com</li>
            </ul>
          </div>
        </div>
        <div>
          <hr className="border-gray-300"/>
          <p className="text-center py-5 text-sm">
            Copyright 2025@ westernleathers.com - All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};
export default Footer;
