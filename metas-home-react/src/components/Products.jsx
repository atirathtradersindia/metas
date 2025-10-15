import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();

  return (
    <section id="products" className="px-0 mx-0 w-full max-w-none"> {/* Remove padding/margins, ensure full width */}
      <h2 className="section-title text-center">Our Premium Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-0 mx-0 w-full"> {/* Full width grid */}
        <div className="card w-full max-w-none"> {/* Full width card */}
          <div className="product-img w-full">
            <img src="./images/Basmati.jpg" alt="Basmati Rice" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-red-600">Basmati Rice</h3>
          <p>Length: 8.10mm max • Aroma: Exceptional • Packing: 50 KG PP Bags</p>
        </div>
        <div className="card w-full max-w-none">
          <div className="product-img w-full">
            <img src="./images/Non-Basmati.jpg" alt="Non-Basmati Rice" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-blue-600">Non-Basmati Rice</h3>
          <p>Premium parboiled rice • Perfect elongation • Export quality assured</p>
        </div>
        <div className="card w-full max-w-none">
          <div className="product-img w-full">
            <img src="./images/Agro_Products.jpg" alt="Agro Products" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-green-600">Agro Products</h3>
          <p>Specially processed • Long shelf life • Ideal for international markets</p>
        </div>
        <div className="card w-full max-w-none">
          <div className="product-img w-full">
            <img src="./images/Organic_Products.jpg" alt="Organic Products" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-purple-600">Organic Products</h3>
          <p>100% Chemical-free • Nutrient-rich • Certified organic cultivation</p>
        </div>
      </div>

      {/* Centered button below grid */}
      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/products-all")}
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
        >
          View All Products
        </button>
      </div>
    </section>
  );
}