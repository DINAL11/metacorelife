import React, { useState, createContext, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load cart from Supabase when user logs in
  useEffect(() => {
    if (!user) {
      setCart([]);
      setLoading(false);
      return;
    }

    const loadCart = async () => {
      try {
        const { data, error } = await supabase
          .from('cart_items')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const transformedCart = (data || []).map(item => ({
          id: item.product_id,
          name: item.product_name,
          price: parseFloat(item.product_price),
          image: item.product_image,
          category: item.product_category,
          quantity: item.quantity
        }));

        setCart(transformedCart);
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [user]);

  const addToCart = async (product) => {
    if (!user) {
      alert('Please sign in to add items to cart');
      return;
    }

    try {
      const existingItem = cart.find(item => item.id === product.id);

      if (existingItem) {
        // Update quantity
        const newQuantity = existingItem.quantity + 1;
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: newQuantity })
          .eq('user_id', user.id)
          .eq('product_id', product.id);

        if (error) throw error;

        setCart(prev =>
          prev.map(item =>
            item.id === product.id ? { ...item, quantity: newQuantity } : item
          )
        );
      } else {
        // Insert new item
        const { error } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: product.id,
            product_name: product.name,
            product_price: product.price,
            product_image: product.image || '',
            product_category: product.category || '',
            quantity: 1
          });

        if (error) throw error;

        setCart(prev => [...prev, { ...product, quantity: 1 }]);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart');
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      setCart(prev => prev.filter(item => item.id !== productId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!user) return;

    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      setCart(prev =>
        prev.map(item => (item.id === productId ? { ...item, quantity } : item))
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const getTotal = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const getItemCount = () => cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotal,
        getItemCount,
        showCart,
        setShowCart,
        loading
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
