import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Car } from '../../types/car';
import { FavoriteContext } from '../../context/FavoriteContext';
import { CartContext } from '../../context/CartContext';
interface CarCardProps {
  car: Car;
}

function CarCard({ car }: CarCardProps) {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useContext(FavoriteContext);
  const { addToCart, items } = useContext(CartContext);
  const fav = isFavorite(car.id);
  const inCart = items.some((i) => i.car.id === car.id);

  return (
    <div className="group bg-[#1e293b] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2">
      <div className="relative overflow-hidden h-52">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#1e293b] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <button
          onClick={(e) => { e.stopPropagation(); toggleFavorite(car.id); }}
          className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full backdrop-blur-sm border-none cursor-pointer transition-all duration-300 ${
            fav ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-black/30 text-white hover:bg-orange-500/80'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={fav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); addToCart(car); }}
          className={`absolute bottom-3 right-3 w-9 h-9 flex items-center justify-center rounded-full backdrop-blur-sm border-none cursor-pointer transition-all duration-300 ${
            inCart
              ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
              : 'bg-black/30 text-white hover:bg-orange-500/80'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill={inCart ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
        </button>
        <div className="absolute top-3 left-3 bg-orange-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
          {car.brand}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-white text-xl font-bold mb-1">{car.name}</h3>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 min-h-10">{car.description}</p>
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
          <div>
            <span className="text-gray-500 text-xs uppercase tracking-wider">Price</span>
            <p className="text-white font-bold text-lg">${car.price.toLocaleString()}</p>
          </div>
          <button
            onClick={() => navigate(`/cars/${car.id}`)}
            className="bg-orange-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm border-none cursor-pointer hover:bg-orange-600 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
