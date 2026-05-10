import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMenuAlt3, HiX, HiSearch } from 'react-icons/hi';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Cars', path: '/cars' },
  { label: 'Favorites', path: '/favorites' },
  { label: 'Contact', path: '/contact' },
];

function Navbar() {
  const [nav, setNav] = useState(false);
  const [search, setSearch] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleNav = () => setNav(!nav);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/cars?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
      setNav(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0f172a]/90 backdrop-blur-lg shadow-lg shadow-black/20' : 'bg-[#0f172a]'
      }`}
    >
      <div className="flex justify-between items-center px-5 py-3 max-w-[1400px] mx-auto">
        <Link to="/" className="text-white text-xl font-black italic tracking-tighter uppercase z-50 no-underline">
          <span className="text-orange-500">Auto</span>Drive
        </Link>

        <ul className="hidden md:flex ml-auto gap-10 mr-10 items-center">
          {navItems.map((item) => (
                <li key={item.label} className="relative group cursor-pointer flex items-center">
              <Link
                to={item.path}
                className={`text-xs font-semibold tracking-widest uppercase hover:text-orange-500 transition-colors duration-300 no-underline ${
                  pathname === item.path ? 'text-orange-500' : 'text-white'
                }`}
              >
                {item.label}
              </Link>
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 z-50">
          <form onSubmit={handleSearch} className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5 focus-within:border-orange-500/50 transition-colors">
            <input
              type="text"
              placeholder="Search cars..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-white text-sm outline-none border-none w-28 placeholder-gray-500"
            />
            <button type="submit" className="bg-transparent border-none cursor-pointer text-gray-400 hover:text-orange-500 transition-colors p-0">
              <HiSearch size={16} />
            </button>
          </form>

          <Link to="/favorites" className="text-white hover:text-orange-500 transition-colors no-underline">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </Link>

          <div onClick={handleNav} className="block md:hidden cursor-pointer text-white text-2xl">
            {nav ? <HiX /> : <HiMenuAlt3 />}
          </div>
        </div>

        <div
          className={
            nav
              ? 'fixed left-0 top-0 w-full h-screen bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center ease-in-out duration-500 z-40'
              : 'fixed left-[-100%] top-0 w-full h-screen ease-in-out duration-500'
          }
        >
          <ul className="text-center">
            {navItems.map((item) => (
              <li key={item.label} className="p-5">
                <Link
                  to={item.path}
                  onClick={() => setNav(false)}
                  className="text-3xl text-white uppercase font-black tracking-widest hover:text-orange-500 transition-colors no-underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <form onSubmit={handleSearch} className="mt-10 flex items-center bg-white/5 border border-white/10 rounded-full px-5 py-3 mx-4 w-72">
            <input
              type="text"
              placeholder="Search cars..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-white text-base outline-none border-none w-full placeholder-gray-500"
            />
            <button type="submit" className="bg-transparent border-none cursor-pointer text-gray-400 hover:text-orange-500 transition-colors p-0">
              <HiSearch size={20} />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
