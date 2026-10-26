import React, { useState } from 'react';
import { DepartmentId } from '../../types/hub';
import { DEPARTMENTS, KITCHEN_MENU, LOUNGE_PACKAGES, WASH_SERVICES, GARDEN_FEATURES, FUEL_PRODUCTS } from '../../data/hubData';
import { X, Clock, Phone, CheckCircle2, ShieldCheck, Flame, Plus, Trash2, Check, ArrowRight } from 'lucide-react';

interface DepartmentDetailModalProps {
  deptId: DepartmentId | null;
  onClose: () => void;
  onSwitchDept: (deptId: DepartmentId) => void;
}

export const DepartmentDetailModal: React.FC<DepartmentDetailModalProps> = ({
  deptId,
  onClose,
  onSwitchDept
}) => {
  if (!deptId) return null;
  const dept = DEPARTMENTS[deptId] || DEPARTMENTS['oil-gas'];

  // Kitchen Cart State
  const [cartItems, setCartItems] = useState<{ id: string; name: string; price: number; qty: number }[]>([]);
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);

  // Garden Cabana State
  const [gardenReserved, setGardenReserved] = useState<boolean>(false);

  const addToCart = (dish: { id: string; name: string; price: number }) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === dish.id);
      if (existing) {
        return prev.map(i => i.id === dish.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { id: dish.id, name: dish.name, price: dish.price, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const cartTotal = cartItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#091224] border border-blue-900/60 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between gap-4 bg-black/60 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300">
              {dept.badge}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              {dept.hours}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-grow">
          {/* Hero Banner */}
          <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
            <img
              src={dept.image}
              onError={(e) => {
                const current = e.currentTarget.getAttribute('src');
                if (current?.startsWith('/images/')) {
                  e.currentTarget.src = current.replace('/images/', '/assets/images/');
                }
              }}
              alt={dept.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                {dept.name}
              </h2>
              <p className="text-sm font-medium text-amber-300 mt-1">{dept.subtitle}</p>
            </div>
          </div>

          {/* Department Description & Story */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7 space-y-4">
              <h3 className="text-lg font-bold text-white font-display">About This Division</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{dept.description}</p>
              <p className="text-sm text-slate-400 leading-relaxed italic border-l-2 border-blue-500/40 pl-3">
                “{dept.storytelling}”
              </p>

              <div className="pt-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Division Standards & Capabilities
                </div>
                <div className="space-y-2">
                  {dept.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Department Fast Contact & Key Metrics */}
            <div className="md:col-span-5 p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Direct Division Desk
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="font-mono text-white text-sm font-bold">{dept.phone}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800">
                {dept.keyStats.map((stat, sIdx) => (
                  <div key={sIdx}>
                    <div className="text-[11px] text-slate-400">{stat.label}</div>
                    <div className="text-sm font-bold text-white font-display">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 1. MASTERS KITCHEN MENU & ORDERING */}
          {deptId === 'kitchen' && (
            <div className="pt-6 border-t border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white font-display">Masters Kitchen Fresh Daily Menu</h3>
                  <p className="text-xs text-slate-400">Add dishes to your express traveler pickup order or dine-in</p>
                </div>
                {cartItems.length > 0 && (
                  <div className="text-xs text-amber-300 font-mono font-bold bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20">
                    {cartItems.reduce((a, b) => a + b.qty, 0)} Items · ₦{cartTotal.toLocaleString()}
                  </div>
                )}
              </div>

              {orderPlaced ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Traveler Meal Order Confirmed!</h4>
                  <p className="text-xs text-slate-300">
                    Your order totaling ₦{cartTotal.toLocaleString()} has been queued in Masters Kitchen. It will be freshly packed and ready at the pickup window in 15 minutes.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setCartItems([]);
                      setOrderPlaced(false);
                    }}
                    className="text-xs text-emerald-400 font-semibold underline mt-2 inline-block cursor-pointer"
                  >
                    Place Another Order
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {KITCHEN_MENU.map((dish) => (
                    <div
                      key={dish.id}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-sm text-white">{dish.name}</span>
                          {dish.badge && (
                            <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded border border-amber-500/20 shrink-0">
                              {dish.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{dish.description}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                        <span className="font-mono font-bold text-sm text-amber-300">
                          ₦{dish.price.toLocaleString()}
                        </span>
                        <button
                          type="button"
                          onClick={() => addToCart(dish)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors cursor-pointer shadow-sm shadow-red-600/20"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Order</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Order Checkout Bar */}
              {cartItems.length > 0 && !orderPlaced && (
                <div className="p-4 rounded-xl bg-slate-950 border border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-300">
                    <span className="font-bold text-white">{cartItems.length} dish types selected</span>
                    <span className="mx-2">·</span>
                    <span>Total: <strong className="font-mono text-amber-300 text-sm">₦{cartTotal.toLocaleString()}</strong></span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOrderPlaced(true)}
                    className="px-6 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors cursor-pointer shadow-md shadow-red-600/25"
                  >
                    Confirm Express Pickup Order
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 2. MASTERS BAR & GARDEN CABANA BOOKING */}
          {deptId === 'garden' && (
            <div className="pt-6 border-t border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-white font-display">Garden Experiences & Cabana Perks</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {GARDEN_FEATURES.map((gf) => (
                  <div key={gf.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs text-rose-400 font-semibold">
                      <span>{gf.title}</span>
                      <Flame className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{gf.description}</p>
                    <div className="text-[11px] text-slate-400 font-mono pt-2 border-t border-slate-800">
                      {gf.schedule}
                    </div>
                  </div>
                ))}
              </div>

              {gardenReserved ? (
                <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-rose-400 text-slate-950 flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Garden Cabana Table Reserved!</h4>
                  <p className="text-xs text-slate-300">
                    Your open-air terrace table has been reserved. Our grill master will have your spot ready with iced beers and barbecue skewers.
                  </p>
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="font-bold text-sm text-white">Reserve an Evening Pergola Cabana</div>
                    <div className="text-xs text-slate-400 mt-0.5">Complimentary reservation with fresh live Suya plate</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setGardenReserved(true)}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors cursor-pointer shadow-md shadow-red-600/25"
                  >
                    Reserve Garden Spot Now
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 3. OIL & GAS FORECOURT SPECIFICATIONS */}
          {deptId === 'oil-gas' && (
            <div className="pt-6 border-t border-slate-800 space-y-4">
              <h3 className="text-xl font-bold text-white font-display">Forecourt Specifications & Fuel Standards</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FUEL_PRODUCTS.map((fp) => (
                  <div key={fp.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white">{fp.name}</span>
                      <span className="font-mono font-bold text-amber-300 text-xs">
                        ₦{fp.pricePerUnit.toLocaleString()} / {fp.unit}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5">{fp.description}</p>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                      <span>{fp.dispensersCount} Dedicated Nozzles</span>
                      <span className="text-emerald-400">Available Now</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Switching Strip */}
        <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-slate-400 font-medium hidden sm:block">
            Quick Jump to Other Divisions:
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            {(['oil-gas', 'kitchen', 'lounge', 'carwash', 'garden'] as DepartmentId[]).map((id) => {
              if (id === deptId) return null;
              const d = DEPARTMENTS[id];
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onSwitchDept(id)}
                  className="px-3 py-1.5 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors whitespace-nowrap cursor-pointer border border-slate-700"
                >
                  {d.name.replace('Master Energy ', '').replace('Masters ', '')}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
