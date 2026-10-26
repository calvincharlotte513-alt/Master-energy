import React, { useState } from 'react';
import { FUEL_PRODUCTS, WASH_SERVICES, LOUNGE_PACKAGES } from '../../data/hubData';
import { Fuel, Sparkles, Wine, Calculator, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export const InteractiveHubTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fuel' | 'wash' | 'lounge'>('fuel');

  // Fuel calculator state
  const [selectedProduct, setSelectedProduct] = useState<string>('pms');
  const [liters, setLiters] = useState<number>(50);
  const [budgetNaira, setBudgetNaira] = useState<number>(0);
  const [calcMode, setCalcMode] = useState<'volume' | 'budget'>('volume');

  // Car wash estimator state
  const [vehicleType, setVehicleType] = useState<'sedan' | 'suv'>('suv');
  const [selectedWashId, setSelectedWashId] = useState<string>('w2');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['interior-sanitize']);
  const [washBooked, setWashBooked] = useState<boolean>(false);
  const [washDate, setWashDate] = useState<string>('2026-10-26');
  const [washTime, setWashTime] = useState<string>('14:00');

  // Lounge reservation state
  const [selectedLoungePkg, setSelectedLoungePkg] = useState<string>('l1');
  const [guestCount, setGuestCount] = useState<number>(4);
  const [loungeBooked, setLoungeBooked] = useState<boolean>(false);

  // Fuel calculation
  const currentProduct = FUEL_PRODUCTS.find(p => p.id === selectedProduct) || FUEL_PRODUCTS[0];
  const totalFuelCost = calcMode === 'volume' 
    ? liters * currentProduct.pricePerUnit 
    : budgetNaira;
  const calculatedVolume = calcMode === 'volume' 
    ? liters 
    : Math.round((budgetNaira / currentProduct.pricePerUnit) * 10) / 10;

  // Car wash calculation
  const currentWash = WASH_SERVICES.find(w => w.id === selectedWashId) || WASH_SERVICES[0];
  const baseWashPrice = vehicleType === 'sedan' ? currentWash.priceSedan : currentWash.priceSuv;
  const addonsCost = selectedAddons.length * 2000;
  const totalWashPrice = baseWashPrice + addonsCost;

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <section id="calculator" className="py-20 lg:py-28 bg-[#060910] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-amber-400 mb-3 font-semibold">
            THE DIGITAL CONCIERGE &amp; PRICING TERMINAL
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Live Pricing &amp; Reservations
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 font-light">
            Instant volumetric fuel calculators, auto-detailing bay bookings, and VIP lounge concierge tables.
          </p>

          {/* Luxury Tab Selector */}
          <div className="mt-10 inline-flex p-1.5 bg-[#090d16] border border-white/10 rounded-2xl shadow-xl">
            <button
              type="button"
              onClick={() => setActiveTab('fuel')}
              className={`flex items-center gap-2.5 px-6 py-3 text-xs font-mono uppercase tracking-wider font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'fuel' 
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Fuel className="w-4 h-4" />
              <span>Energy Rates</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('wash')}
              className={`flex items-center gap-2.5 px-6 py-3 text-xs font-mono uppercase tracking-wider font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'wash' 
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Detailing Bay</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('lounge')}
              className={`flex items-center gap-2.5 px-6 py-3 text-xs font-mono uppercase tracking-wider font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'lounge' 
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Wine className="w-4 h-4" />
              <span>VIP Lounge</span>
            </button>
          </div>
        </div>

        {/* TAB 1: FUEL & GAS CALCULATOR */}
        {activeTab === 'fuel' && (
          <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#090d16] border border-white/10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-7 space-y-6">
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold mb-3">
                    01. Select Calibrated Fuel Product
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {FUEL_PRODUCTS.map((prod) => (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => setSelectedProduct(prod.id)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          selectedProduct === prod.id
                            ? 'bg-amber-400/10 border-amber-400 text-white shadow-lg shadow-amber-400/10'
                            : 'bg-black/40 border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                        }`}
                      >
                        <div className="font-bold text-sm font-display text-white">{prod.shortCode}</div>
                        <div className="text-xs font-mono text-amber-400 font-bold mt-1">
                          ₦{prod.pricePerUnit.toLocaleString()} / {prod.unit}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculation Mode */}
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-slate-400">Mode:</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCalcMode('volume')}
                      className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer ${
                        calcMode === 'volume'
                          ? 'bg-white/10 text-amber-400 border-amber-400 font-bold'
                          : 'bg-black/40 text-slate-400 border-white/5'
                      }`}
                    >
                      Volume ({currentProduct.unit})
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCalcMode('budget');
                        if (budgetNaira === 0) setBudgetNaira(50000);
                      }}
                      className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer ${
                        calcMode === 'budget'
                          ? 'bg-white/10 text-amber-400 border-amber-400 font-bold'
                          : 'bg-black/40 text-slate-400 border-white/5'
                      }`}
                    >
                      Naira Budget (₦)
                    </button>
                  </div>
                </div>

                {/* Range Slider */}
                {calcMode === 'volume' ? (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-400">Volumetric Amount:</span>
                      <span className="font-bold text-amber-400 text-lg">
                        {liters} {currentProduct.unit}s
                      </span>
                    </div>
                    <input
                      type="range"
                      min={currentProduct.id === 'lpg' ? 3 : 5}
                      max={currentProduct.id === 'lpg' ? 100 : 250}
                      step={currentProduct.id === 'lpg' ? 1 : 5}
                      value={liters}
                      onChange={(e) => setLiters(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-2">Budget Target (₦):</label>
                    <input
                      type="number"
                      step={1000}
                      min={1000}
                      value={budgetNaira}
                      onChange={(e) => setBudgetNaira(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-base focus:border-amber-400 outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Terminal Result Card */}
              <div className="md:col-span-5 p-7 rounded-2xl bg-black/60 border border-white/10 flex flex-col justify-between space-y-6">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                    ESTIMATED SETTLEMENT
                  </div>
                  <div className="mt-2 text-4xl font-extrabold text-white font-display tabular-nums tracking-tight">
                    ₦{totalFuelCost.toLocaleString()}
                  </div>
                  <div className="mt-2 font-mono text-xs font-bold text-amber-400">
                    ≈ {calculatedVolume} {currentProduct.unit}s Guaranteed Volume
                  </div>
                  <p className="mt-4 text-xs text-slate-400 leading-relaxed font-light">
                    {currentProduct.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Calibrated zero-loss positive-displacement meters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Electronic POS, Bank Transfer &amp; USSD Accepted</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => alert(`Forecourt ticket generated for ${calculatedVolume} ${currentProduct.unit}s of ${currentProduct.name} at ₦${totalFuelCost.toLocaleString()}. Head to Master Energy Naze Forecourt for priority dispensing!`)}
                  className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl transition-all cursor-pointer text-center shadow-lg shadow-amber-500/20"
                >
                  Generate Pump Priority Pass
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CAR WASH BOOKING */}
        {activeTab === 'wash' && (
          <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#090d16] border border-white/10 shadow-2xl">
            {washBooked ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display">Car Wash Bay Reserved!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto font-light">
                  Your reservation for <strong className="text-white">{currentWash.name}</strong> on <strong className="text-white">{washDate} at {washTime}</strong> is active. Drive into Bay 2 at Naze Hub upon arrival.
                </p>
                <div className="font-mono text-sm text-amber-400 font-bold">
                  Total Due at Bay: ₦{totalWashPrice.toLocaleString()}
                </div>
                <button
                  type="button"
                  onClick={() => setWashBooked(false)}
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer mt-4"
                >
                  Modify or Book Another Bay
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-7 space-y-6">
                  <div>
                    <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                      01. Vehicle Category
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setVehicleType('sedan')}
                        className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer font-medium text-xs ${
                          vehicleType === 'sedan'
                            ? 'bg-amber-400/10 border-amber-400 text-white font-bold'
                            : 'bg-black/40 border-white/5 text-slate-400'
                        }`}
                      >
                        Sedan / Saloon
                      </button>
                      <button
                        type="button"
                        onClick={() => setVehicleType('suv')}
                        className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer font-medium text-xs ${
                          vehicleType === 'suv'
                            ? 'bg-amber-400/10 border-amber-400 text-white font-bold'
                            : 'bg-black/40 border-white/5 text-slate-400'
                        }`}
                      >
                        SUV / Truck / Pickup
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                      02. Detailing Package
                    </label>
                    <div className="space-y-2.5">
                      {WASH_SERVICES.map((pkg) => {
                        const price = vehicleType === 'sedan' ? pkg.priceSedan : pkg.priceSuv;
                        const isSelected = selectedWashId === pkg.id;
                        return (
                          <div
                            key={pkg.id}
                            onClick={() => setSelectedWashId(pkg.id)}
                            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                              isSelected
                                ? 'bg-amber-400/10 border-amber-400 text-white'
                                : 'bg-black/40 border-white/5 text-slate-300 hover:border-white/10'
                            }`}
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-white font-display">{pkg.name}</span>
                                {pkg.isPopular && (
                                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-mono">
                                    Popular
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-400 mt-1 font-light">{pkg.description}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="font-mono font-bold text-sm text-amber-400">
                                ₦{price.toLocaleString()}
                              </div>
                              <div className="text-[11px] text-slate-500 font-mono">{pkg.durationMin} mins</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      03. Add-ons (+₦2,000 each)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'interior-sanitize', label: 'Interior Anti-Bacterial Fog' },
                        { id: 'engine-steam', label: 'Engine Bay Dry-Steam' },
                        { id: 'leather-nourish', label: 'Leather Seat Lanolin Balm' },
                        { id: 'hydro-glass', label: 'Windshield Hydrophobic Coat' }
                      ].map((addon) => {
                        const isChecked = selectedAddons.includes(addon.id);
                        return (
                          <button
                            key={addon.id}
                            type="button"
                            onClick={() => toggleAddon(addon.id)}
                            className={`p-2.5 text-xs rounded-xl border text-left transition-colors flex items-center gap-2 cursor-pointer ${
                              isChecked
                                ? 'bg-amber-400/10 border-amber-400 text-white font-medium'
                                : 'bg-black/40 border-white/5 text-slate-400'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                              isChecked ? 'bg-amber-400 border-amber-400 text-slate-950 font-bold' : 'border-slate-700'
                            }`}>
                              {isChecked && '✓'}
                            </div>
                            <span className="truncate">{addon.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 p-7 rounded-2xl bg-black/60 border border-white/10 space-y-5">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                    APPOINTMENT TIME
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-mono text-slate-400 block mb-1">Date</label>
                      <input
                        type="date"
                        value={washDate}
                        onChange={(e) => setWashDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-white/10 text-white outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-slate-400 block mb-1">Bay Slot</label>
                      <select
                        value={washTime}
                        onChange={(e) => setWashTime(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-white/10 text-white outline-none focus:border-amber-400"
                      >
                        <option value="08:00">08:00 AM (Early Priority)</option>
                        <option value="10:30">10:30 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="16:30">04:30 PM</option>
                        <option value="18:30">06:30 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-1.5 text-xs text-slate-300 font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Base Detail:</span>
                      <span>₦{baseWashPrice.toLocaleString()}</span>
                    </div>
                    {addonsCost > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Add-ons ({selectedAddons.length}):</span>
                        <span>₦{addonsCost.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                      <span>Total:</span>
                      <span className="text-amber-400">₦{totalWashPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setWashBooked(true)}
                    className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl transition-all cursor-pointer text-center shadow-lg shadow-amber-500/20"
                  >
                    Confirm Detailing Bay Slot
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: LOUNGE RESERVATION */}
        {activeTab === 'lounge' && (
          <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#090d16] border border-white/10 shadow-2xl">
            {loungeBooked ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display">VIP Booth Reserved at Masters Lounge</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto font-light">
                  Your VIP reservation has been received. Our concierge will contact you to curate your custom bottle selection and arrange valet arrival passes.
                </p>
                <button
                  type="button"
                  onClick={() => setLoungeBooked(false)}
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer mt-4"
                >
                  Make Another Reservation
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold mb-4">
                    Select Lounge Experience Tier
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {LOUNGE_PACKAGES.map((pkg) => {
                      const isSelected = selectedLoungePkg === pkg.id;
                      return (
                        <div
                          key={pkg.id}
                          onClick={() => setSelectedLoungePkg(pkg.id)}
                          className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-amber-400/10 border-amber-400 text-white'
                              : 'bg-black/40 border-white/5 text-slate-300 hover:border-white/10'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-mono font-bold text-amber-400 uppercase">{pkg.category}</div>
                            <h4 className="text-lg font-bold text-white font-display mt-1">{pkg.name}</h4>
                            <div className="text-xs text-slate-400 mt-1 font-mono">{pkg.capacity}</div>
                            <p className="text-xs text-slate-300 mt-3 leading-relaxed font-light">{pkg.description}</p>
                          </div>
                          <div className="mt-6 pt-4 border-t border-white/10">
                            <div className="text-[10px] font-mono uppercase text-slate-400">Minimum Spend</div>
                            <div className="text-base font-bold font-mono text-amber-400">
                              ₦{pkg.minSpend.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">Guests</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-black/60 border border-white/10 text-white outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">Date</label>
                    <input
                      type="date"
                      defaultValue="2026-10-30"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-black/60 border border-white/10 text-white outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">Arrival Time</label>
                    <select
                      defaultValue="21:00"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-black/60 border border-white/10 text-white outline-none focus:border-amber-400"
                    >
                      <option value="18:00">06:00 PM (Sunset)</option>
                      <option value="20:00">08:00 PM (Executive Dinner)</option>
                      <option value="21:00">09:00 PM (Prime Nightlife)</option>
                      <option value="23:00">11:00 PM (Late Night Vault)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setLoungeBooked(true)}
                  className="w-full py-4 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl transition-all cursor-pointer text-center shadow-lg shadow-amber-500/20"
                >
                  Request VIP Lounge Concierge Reservation
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
