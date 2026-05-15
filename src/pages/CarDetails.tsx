import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCarById } from '../services/api';
import type { Car } from '../types/car';
import { CartContext } from '../context/CartContext';

function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart, items } = useContext(CartContext);
  const inCart = car ? items.some((i) => i.car.id === car.id) : false;

  useEffect(() => {
    if (id) {
      fetchCarById(Number(id))
        .then((data) => {
          setCar(data || null);
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to load car details.');
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center pt-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-white text-lg">Loading car details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center pt-20 flex-col gap-4">
        <p className="text-red-400 text-xl">{error}</p>
        <button
          onClick={() => navigate('/cars')}
          className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold border-none cursor-pointer hover:bg-orange-600 transition-colors"
        >
          Back to Cars
        </button>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center pt-20 flex-col gap-4">
        <p className="text-white text-2xl">Car not found</p>
        <button
          onClick={() => navigate('/cars')}
          className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold border-none cursor-pointer hover:bg-orange-600 transition-colors"
        >
          Back to Cars
        </button>
      </div>
    );
  }

  const specs = [
    { label: 'Brand', value: car.brand },
    { label: 'Year', value: car.year },
    { label: 'Price', value: `$${car.price.toLocaleString()}` },
    { label: 'Model', value: car.name },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] pt-20 pb-16 px-5">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/cars')}
          className="text-gray-400 hover:text-orange-500 mb-8 bg-transparent border-none cursor-pointer text-sm font-semibold flex items-center gap-2 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/></svg>
          Back to Cars
        </button>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-3/5">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="bg-orange-500 text-white text-sm font-bold px-4 py-1.5 rounded-full">
                  {car.brand}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:w-2/5">
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">{car.name}</h1>
            <p className="text-orange-500 text-lg font-semibold mb-6">{car.brand}</p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">{car.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {specs.map((spec) => (
                <div key={spec.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{spec.label}</p>
                  <p className="text-white font-bold text-lg">{spec.value}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/contact')}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold text-base border-none cursor-pointer hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg shadow-orange-500/20"
            >
              Inquire About This Car
            </button>

            <button
              onClick={() => car && addToCart(car)}
              disabled={inCart}
              className={`w-full py-4 rounded-xl font-bold text-base border-none cursor-pointer transition-all duration-300 shadow-lg ${
                inCart
                  ? 'bg-green-600 text-white shadow-green-500/20 cursor-default'
                  : 'bg-white/10 text-white hover:bg-white/20 shadow-white/5'
              }`}
            >
              {inCart ? 'Added to Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetails;
