import FoodCards from "../components/FoodCards";
import FoodOrder from "../components/FoodOrder";
import Latest_collections from "../components/Latest_collections";
import Slide_container from "../components/Slide_container";

const Home = () => {
  return (
    <>
      <Slide_container />
      <FoodOrder />
      {/* <FoodCards /> */}
      <Latest_collections />
    </>
  );
};
export default Home;
