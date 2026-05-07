import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CarCard from '../components/CarCard/CarCard';
import { fetchCars } from '../services/api';
import type { Car } from '../types/car';

type SortKey = 'default' | 'price-asc' | 'price-desc' | 'name';

function Cars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sort, setSort] = useState<SortKey>('default');
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');

  const query = searchParams.get('search')?.toLowerCase() || '';

  useEffect(() => {
    fetchCars()
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load cars. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(searchInput ? { search: searchInput } : {});
  };

  const filtered = query
    ? cars.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.brand.toLowerCase().includes(query)
      )
    : [...cars];

  if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (sort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));

  const Skeleton = () => (
    <div className="bg-[#1e293b] rounded-2xl overflow-hidden">
      <div className="h-52 bg-[#334155] pulse-skeleton" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-2/3 bg-[#334155] rounded pulse-skeleton" />
        <div className="h-4 w-full bg-[#334155] rounded pulse-skeleton" />
        <div className="h-4 w-4/5 bg-[#334155] rounded pulse-skeleton" />
        <div className="flex justify-between pt-4 border-t border-white/5">
          <div className="h-5 w-20 bg-[#334155] rounded pulse-skeleton" />
          <div className="h-10 w-28 bg-[#334155] rounded-xl pulse-skeleton" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] pt-20 pb-16 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="h-10 w-64 bg-[#334155] rounded mb-2 pulse-skeleton" />
          <div className="h-5 w-96 bg-[#334155] rounded mb-10 pulse-skeleton" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => <Skeleton key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center pt-20">
        <p className="text-red-400 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] pt-20 pb-16 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Our Collection</h1>
            <p className="text-gray-400">Explore our premium selection of luxury vehicles</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <form onSubmit={handleSearch} className="flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 w-full sm:w-56 focus-within:border-orange-500/50 transition-colors">
              <input
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="bg-transparent text-white text-sm outline-none border-none w-full placeholder-gray-500"
              />
              <button type="submit" className="bg-transparent border-none cursor-pointer text-gray-400 hover:text-orange-500 transition-colors p-0 ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>
              </button>
            </form>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="bg-white/5 border border-white/10 text-white text-sm rounded-full px-4 py-2 outline-none cursor-pointer focus:border-orange-500/50 transition-colors appearance-none"
              style={{ paddingRight: '2rem', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' fill=\'%239ca3af\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M8 11L3 6h10l-5 5z\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
            >
              <option value="default" className="bg-[#0f172a]">Default</option>
              <option value="price-asc" className="bg-[#0f172a]">Price: Low to High</option>
              <option value="price-desc" className="bg-[#0f172a]">Price: High to Low</option>
              <option value="name" className="bg-[#0f172a]">Name: A-Z</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 gap-4">
            <p className="text-gray-400 text-lg">No cars found matching "{query}"</p>
            <button
              onClick={() => { setSearchParams({}); setSearchInput(''); }}
              className="text-orange-500 bg-transparent border border-orange-500/30 px-5 py-2 rounded-full text-sm font-semibold cursor-pointer hover:bg-orange-500/10 transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((car) => (
              <div key={car.id} className="fade-in-up">
                <CarCard car={car} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cars;
