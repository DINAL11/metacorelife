import React, { useState } from 'react';
import { ShoppingCart, X, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartSidebar() {
  const { cart, removeFromCart, updateQuantity, getTotal, showCart, setShowCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Payment successful! 🎉\n\nIn production, this would process via Stripe.');
    setIsProcessing(false);
    setShowCart(false);
  };

  if (!showCart) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowCart(false)} />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-cyan-600" />
            <h2 className="text-2xl font-bold text-slate-800">Your Cart</h2>
          </div>
          <button onClick={() => setShowCart(false)} className="text-slate-400 hover:text-slate-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="bg-slate-50 rounded-2xl p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center text-3xl">{item.image}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 mb-1">{item.name}</h3>
                      <p className="text-sm text-slate-600 mb-2">${item.price}</p>
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center hover:bg-slate-50">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center hover:bg-slate-50">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-500">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-slate-800">Total</span>
              <span className="text-2xl font-bold text-cyan-600">${getTotal().toFixed(2)}</span>
            </div>
            <button onClick={handleCheckout} disabled={isProcessing} className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white rounded-2xl font-semibold shadow-lg transition-all disabled:opacity-50">
              {isProcessing ? 'Processing...' : 'Checkout with Stripe'}
            </button>
            <p className="text-xs text-slate-500 text-center mt-3">🔒 Secure payment powered by Stripe</p>
          </div>
        )}
      </div>
    </>
  );
}