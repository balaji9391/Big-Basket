import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "./store";
import "./home.css";

// ✅ Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Home() {
  const dispatch = useDispatch();

  // ✅ Fetch products from Redux store
  const vegItems = useSelector((state) => state.prod.veg);
  const nonVegItems = useSelector((state) => state.prod.nonveg);
  const chocolates = useSelector((state) => state.prod.chocolates);
  const milkItems = useSelector((state) => state.prod.drinks);

  
  const renderCarousel = (title, items) => (
    <section className="products">
      <h2>{title}</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        loop={true}
        /* breakpoints={{
          0: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
          1440: { slidesPerView: 6 },
        }} */
      >
        {items.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="product-card">
              <img src={product.imageurl} alt={product.Name} />
              <h3>{product.Name}</h3>

              <p className="price">₹{product.price}</p>
              <button
                className="add-btn"
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );

  return (
    <>
      {/* ✅ Hero Section */}
      <div className="body">
      <div className="hero-container">
  {/* Left: Video */}
  <div className="hero-video">
    <video autoPlay loop muted playsInline>
      <source src="/videos/bgHome.mp4" type="video/mp4" />
    </video>
  </div>
  

  {/* Right: Text + Button */}
  <div className="hero-content">
    <h1 className="animate">
      <h2>Welcome to  🛒</h2>
    
  <span>B</span>
  <span>i</span>
  <span>g</span>
  <span> </span>
  <span>B</span>
  <span>a</span>
  <span>s</span>
  <span>k</span>
  <span>e</span>
  <span>t</span>
</h1><br /><br />
    <p>We are passionate about bringing fresh vegetables, high-quality dairy, chocolates, and non-veg items directly to your doorstep.</p>
  </div>
</div>
</div><br /><br />


      {/* ✅ Product Carousels */}
      {renderCarousel("Vegetables", vegItems)}
      {renderCarousel("Non-Veg", nonVegItems)}
      {renderCarousel("Chocolates", chocolates)}
      {renderCarousel("Milk & Drinks", milkItems)}
    </>
  );
}

export default Home;
