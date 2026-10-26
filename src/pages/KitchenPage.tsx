import React, { useState } from 'react';
import { KITCHEN_MENU } from '../data/hubData';
import { UtensilsCrossed, Plus, Check, Clock, Phone, ShoppingBag, Sparkles } from 'lucide-react';

export const KitchenPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [cart, setCart] = useState<{ id: string; name: string; price: number; qty: number }[]>([]);
  const [orderSent, setOrderSent] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [pickupNote, setPickupNote] = useState<string>('Dine-In at Naze Hall');

  const categories = ['All', 'Local Delicacies', 'Rice & Continental', 'Grills & Barbecue', 'Quick Bites'];

  const filteredDishes = selectedCategory === 'All'
    ? KITCHEN_MENU
    : KITCHEN_MENU.filter(d => d.category === selectedCategory);

  const addToCart = (dish: { id: string; name: string; price: number }) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === dish.id);
      if (exists) {
        return prev.map(i => i.id === dish.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { id: dish.id, name: dish.name, price: dish.price, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const cartTotal = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setOrderSent(true);
  };

  return (
    <div className="py-10 sm:py-16 bg-[#04060a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-white/10 pb-8 space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-orange-400 font-bold uppercase tracking-wider">
            <span>DIVISION II · MASTERS KITCHEN RESTAURANT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            Masters Kitchen
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
            Hot homemade Nigerian food, sweet party jollof rice, fresh point-and-kill catfish, and authentic Ofe Owerri served in a clean air-conditioned restaurant hall in Naze.
          </p>
        </div>

        {/* Hero Culinary Image Banner */}
        <div className="relative h-64 sm:h-96 rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
          <img
            src="/src/assets/images/masters_kitchen_1792957563859.jpg"
            alt="Masters Kitchen Nigerian Food"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04060a] via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-orange-400 font-bold uppercase">Fresh From The Pot</div>
              <div className="text-xl sm:text-2xl font-bold text-white font-display">Authentic Nigerian Gastronomy &amp; Grills</div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-black/70 px-3 py-1.5 rounded-lg border border-white/10">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Open 6:00 AM – 11:30 PM Daily</span>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-white font-bold shadow-md shadow-orange-500/20'
                  : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid & Cart Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Menu Items (8 Cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                className="p-5 rounded-2xl bg-[#090d16] border border-white/10 hover:border-orange-500/30 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-white text-base font-display">{dish.name}</span>
                    {dish.badge && (
                      <span className="text-[10px] font-mono text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded border border-orange-400/20 shrink-0">
                        {dish.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-2 font-light leading-relaxed">
                    {dish.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="font-mono text-base font-bold text-amber-400">
                    ₦{dish.price.toLocaleString()}
                  </div>
                  <button
                    type="button"
                    onClick={() => addToCart(dish)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Tray</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Order Cart Drawer (4 Cols) */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-[#090d16] border border-white/10 space-y-6 sticky top-28 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 font-display font-bold text-white text-base">
                <ShoppingBag className="w-4 h-4 text-orange-400" />
                <span>Your Food Tray</span>
              </div>
              <span className="font-mono text-xs text-amber-400 font-bold">
                {cart.reduce((a, b) => a + b.qty, 0)} Items
              </span>
            </div>

            {orderSent ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">Order Sent to Masters Kitchen!</h4>
                <p className="text-xs text-slate-300 font-light">
                  Thank you <strong className="text-white">{customerName || 'Customer'}</strong>. Your hot meal totaling <strong className="text-amber-400">₦{cartTotal.toLocaleString()}</strong> is being packaged fresh. Pickup ready in 15 minutes!
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setCart([]);
                    setOrderSent(false);
                  }}
                  className="text-xs text-emerald-400 font-bold underline mt-2 inline-block cursor-pointer"
                >
                  Start New Food Tray
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500 space-y-2">
                <UtensilsCrossed className="w-8 h-8 text-slate-600 mx-auto" />
                <p>Your food tray is empty.</p>
                <p className="text-[11px] text-slate-600">Click &quot;Add to Tray&quot; on any dish to order for dine-in or traveler takeaway.</p>
              </div>
            ) : (
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-xs p-2 rounded-xl bg-black/40 border border-white/5"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-semibold text-white truncate">{item.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {item.qty}x · ₦{(item.price * item.qty).toLocaleString()}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-rose-400 hover:text-rose-300 text-[11px] cursor-pointer shrink-0"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="flex justify-between text-sm font-bold text-white">
                    <span>Total Amount:</span>
                    <span className="font-mono text-amber-400">₦{cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-black/60 border border-white/10 text-white outline-none focus:border-amber-400"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number (e.g. 0803...) *"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-black/60 border border-white/10 text-white outline-none focus:border-amber-400"
                  />
                  <select
                    value={pickupNote}
                    onChange={(e) => setPickupNote(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-black/60 border border-white/10 text-white outline-none focus:border-amber-400"
                  >
                    <option value="Dine-In at Naze Hall">Dine-In at Restaurant Hall</option>
                    <option value="Traveler Highway Takeaway Box">Traveler Highway Takeaway Box</option>
                    <option value="Deliver to Car at Car Wash Bay">Deliver to Car at Car Wash Bay</option>
                    <option value="Deliver Upstairs to Masters Lounge">Deliver Upstairs to Masters Lounge</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  Send Order to Kitchen
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
