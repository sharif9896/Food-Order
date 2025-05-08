import { useState, useEffect, useRef } from "react";

const FoodSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef(null);
  const categories = [
    {
      id: 1,
      image: "/public/bb.jpg",
      title: "Pizza",
      subtitle: "Delicious Italian Classics",
    },
    {
      id: 2,
      image: "bu.png",
      title: "Burgers",
      subtitle: "Juicy & Flavorful",
    },
    {
      id: 3,
      image: "sus.jpg",
      title: "Sushi",
      subtitle: "Fresh Japanese Cuisine",
    },
    {
      id: 4,
      image: "nnj.jpg",
      title: "Pasta",
      subtitle: "Authentic Italian Taste",
    },
    {
      id: 5,
      image: "sa.jpg",
      title: "Salads",
      subtitle: "Healthy & Fresh",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === categories.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearTimeout(timeoutRef.current);
  }, [activeIndex, categories.length]);

  // Reset timer on manual slide change
  const handleThumbnailClick = (index) => {
    clearTimeout(timeoutRef.current);
    setActiveIndex(index);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Proven Best Foods Seller</h2>

      {/* Main featured image */}
      <div style={styles.featuredContainer}>
        <img
          src={categories[activeIndex].image}
          alt={categories[activeIndex].title}
          style={styles.featuredImage}
        />
        <div style={styles.textOverlay}>
          <h3 style={styles.title}>{categories[activeIndex].title}</h3>
          <p style={styles.subtitle}>{categories[activeIndex].subtitle}</p>
        </div>
      </div>

      {/* Thumbnail slider */}
      <div style={styles.thumbnailContainer}>
        {categories.map((category, index) => (
          <button
            key={category.id}
            onClick={() => handleThumbnailClick(index)}
            style={{
              ...styles.thumbnail,
              border: activeIndex === index ? "3px solid #ff6b6b" : "none",
            }}
          >
            <img
              src={category.image}
              alt={category.title}
              style={styles.thumbnailImage}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
  heading: {
    textAlign: "center",
    color: "orangered",
    fontSize: "2rem",
    marginBottom: "30px",
  },
  featuredContainer: {
    position: "relative",
    borderRadius: "15px",
    overflow: "hidden",
    marginBottom: "20px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  featuredImage: {
    width: "100%",
    height: "500px",
    objectFit: "cover",
  },
  textOverlay: {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    padding: "30px",
    background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
  },
  title: {
    color: "#fff",
    fontSize: "2.5rem",
    margin: "0 0 10px 0",
  },
  subtitle: {
    color: "#eee",
    fontSize: "1.2rem",
    margin: "0",
  },
  thumbnailContainer: {
    display: "flex",
    gap: "15px",
    overflowX: "auto",
    paddingBottom: "10px",
  },
  thumbnail: {
    minWidth: "150px",
    height: "100px",
    borderRadius: "10px",
    overflow: "hidden",
    cursor: "pointer",
    padding: "0",
    border: "none",
    background: "none",
    transition: "transform 0.2s",
    ":hover": {
      transform: "scale(1.05)",
    },
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

export default FoodSlider;
