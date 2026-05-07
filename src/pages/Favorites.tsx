import { useContext, useState, useEffect } from 'react';
import { FavoriteContext } from '../context/FavoriteContext';
import { fetchCars } from '../services/api';
import type { Car } from '../types/car';
import CarCard from '../components/CarCard/CarCard';

function Favorites() {
  const { favorites } = useContext(FavoriteContext);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCars().then((data) => {
      setCars(data);
      setLoading(false);
    });
  }, []);

  const favoriteCars = cars.filter((c) => favorites.includes(c.id));

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center pt-20">
        <p className="text-white text-2xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] pt-20 pb-16 px-5">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Your Favorites</h1>
        <p className="text-gray-400 mb-10">
          {favoriteCars.length === 0
            ? 'No favorites yet. Start adding some cars!'
            : `${favoriteCars.length} car${favoriteCars.length > 1 ? 's' : ''} in your favorites`}
        </p>
        {favoriteCars.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
