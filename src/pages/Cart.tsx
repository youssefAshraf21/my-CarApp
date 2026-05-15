import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { HiTrash } from 'react-icons/hi';

function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useContext(CartContext);

  return (
    <div className="min-h-screen bg-[#0f172a] pt-20 pb-16 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Shopping Cart</h1>
            <p className="text-gray-400">
              {items.length === 0
                ? 'Your cart is empty.'
                : `${items.reduce((s, i) => s + i.quantity, 0)} item${items.reduce((s, i) => s + i.quantity, 0) > 1 ? 's' : ''} in your cart`}
            </p>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer hover:bg-red-500/20 transition-colors"
            >
              Clear Cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-6">Your cart is empty.</p>
            <Link
              to="/cars"
              className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold no-underline hover:bg-orange-600 transition-colors inline-block"
            >
              Browse Cars
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.car.id}
                className="bg-[#1e293b] rounded-2xl p-4 flex items-center gap-5 border border-white/5"
              >
                <Link to={`/cars/${item.car.id}`} className="shrink-0">
                  <img
                    src={item.car.image}
                    alt={item.car.name}
                    className="w-24 h-20 object-cover rounded-xl"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/cars/${item.car.id}`}
                    className="text-white font-bold text-lg no-underline hover:text-orange-500 transition-colors"
                  >
                    {item.car.name}
                  </Link>
                  <p className="text-gray-400 text-sm">{item.car.brand}</p>
                  <p className="text-orange-500 font-bold mt-1">
                    ${(item.car.price * item.quantity).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-white/5 rounded-lg border border-white/10">
                    <button
                      onClick={() => updateQuantity(item.car.id, item.quantity - 1)}
                      className="px-3 py-1.5 text-white border-none cursor-pointer bg-transparent hover:text-orange-500 transition-colors text-lg font-bold"
                    >
                      -
                    </button>
                    <span className="text-white font-semibold px-3 min-w-[2ch] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.car.id, item.quantity + 1)}
                      className="px-3 py-1.5 text-white border-none cursor-pointer bg-transparent hover:text-orange-500 transition-colors text-lg font-bold"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.car.id)}
                    className="text-red-400 hover:text-red-300 bg-transparent border-none cursor-pointer p-2 transition-colors"
                  >
                    <HiTrash size={18} />
                  </button>
                </div>
              </div>
            ))}

            <div className="bg-[#1e293b] rounded-2xl p-6 mt-6 border border-white/5">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400 text-lg">Total</span>
                <span className="text-white text-3xl font-bold">${totalPrice.toLocaleString()}</span>
              </div>
              <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold text-base border-none cursor-pointer hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg shadow-orange-500/20">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
