import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FUEL_PRODUCTS, WASH_SERVICES, LOUNGE_PACKAGES } from '../../data/hubData';
import { Fuel, Sparkles, Wine, Check, ShieldCheck } from 'lucide-react';

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
    <section id="calculator" className="py-16 lg:py-24 bg-slate-50 dark:bg-[#080d1a] border-t border-slate-200 dark:border-slate-800 relative w-full max-w-full overflow-hidden font-opensans transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-blue-900 dark:text-blue-400 mb-3 font-bold">
            THE DIGITAL CONCIERGE &amp; PRICING TERMINAL
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight font-display">
            Live Pricing &amp; Reservations
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal">
            Instant volumetric fuel calculators, auto-detailing bay bookings, and VIP lounge concierge tables.
          </p>

          {/* Luxury Tab Selector */}
          <div className="mt-10 inline-flex p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab('fuel')}
              className={`flex items-center gap-2.5 px-6 py-3 text-xs font-mono uppercase tracking-wider font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'fuel' 
                  ? 'bg-blue-900 dark:bg-blue-600 text-white shadow-md shadow-blue-900/20' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <Fuel className="w-4 h-4 text-current" />
              <span>Energy Rates</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('wash')}
              className={`flex items-center gap-2.5 px-6 py-3 text-xs font-mono uppercase tracking-wider font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'wash' 
                  ? 'bg-blue-900 dark:bg-blue-600 text-white shadow-md shadow-blue-900/20' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-current" />
              <span>Detailing Bay</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('lounge')}
              className={`flex items-center gap-2.5 px-6 py-3 text-xs font-mono uppercase tracking-wider font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'lounge' 
                  ? 'bg-blue-900 dark:bg-blue-600 text-white shadow-md shadow-blue-900/20' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <Wine className="w-4 h-4 text-current" />
              <span>VIP Lounge</span>
            </button>
          </div>
        </div>

        {/* TAB 1: FUEL & GAS CALCULATOR */}
        {activeTab === 'fuel' && (
          <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-colors">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Selector */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="md:col-span-7 space-y-6"
              >
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-3">
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
                            ? 'bg-blue-900 dark:bg-blue-600 text-white border-2 border-blue-950 dark:border-blue-500 shadow-md font-bold'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="font-bold text-sm font-display">{prod.shortCode}</div>
                        <div className={`text-xs font-mono font-bold mt-1 ${
                          selectedProduct === prod.id ? 'text-amber-300' : 'text-blue-900 dark:text-blue-400'
                        }`}>
                          ₦{prod.pricePerUnit.toLocaleString()} / {prod.unit}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculation Mode */}
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-slate-500 dark:text-slate-400 font-bold">Mode:</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCalcMode('volume')}
                      className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer font-bold ${
                        calcMode === 'volume'
                          ? 'bg-blue-900 dark:bg-blue-600 text-white border-blue-950 dark:border-blue-500 shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:text-slate-950'
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
                      className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer font-bold ${
                        calcMode === 'budget'
                          ? 'bg-blue-900 dark:bg-blue-600 text-white border-blue-950 dark:border-blue-500 shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:text-slate-950'
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
                      <span className="text-slate-600 dark:text-slate-400 font-medium">Volumetric Amount:</span>
                      <span className="font-extrabold text-blue-900 dark:text-blue-400 text-lg">
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
                      className="w-full accent-red-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block mb-2 font-medium">Budget Target (₦):</label>
                    <input
                      type="number"
                      step={1000}
                      min={1000}
                      value={budgetNaira}
                      onChange={(e) => setBudgetNaira(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-950 dark:text-white font-mono text-base focus:border-blue-900 dark:focus:border-blue-400 outline-none shadow-sm"
                    />
                  </div>
                )}
              </motion.div>

              {/* Terminal Result Card */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="md:col-span-5 p-7 rounded-3xl bg-[#091224] text-white border-2 border-blue-900/60 shadow-2xl flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-amber-300 font-bold">
                    ESTIMATED SETTLEMENT
                  </div>
                  <div className="mt-2 text-4xl font-extrabold text-white font-display tabular-nums tracking-tight">
                    ₦{totalFuelCost.toLocaleString()}
                  </div>
                  <div className="mt-2 font-mono text-xs font-bold text-amber-300">
                    ≈ {calculatedVolume} {currentProduct.unit}s Guaranteed Volume
                  </div>
                  <p className="mt-4 text-xs text-slate-300 leading-relaxed font-normal">
                    {currentProduct.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-slate-200 font-medium">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Calibrated zero-loss meters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-red-400 shrink-0" />
                    <span>POS, Bank Transfer &amp; USSD Accepted</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => alert(`Forecourt ticket generated for ${calculatedVolume} ${currentProduct.unit}s of ${currentProduct.name} at ₦${totalFuelCost.toLocaleString()}. Head to Master Energy Naze Forecourt for priority dispensing!`)}
                  className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all cursor-pointer text-center shadow-lg shadow-red-600/25 hover:scale-102"
                >
                  Generate Pump Priority Pass
                </button>
              </motion.div>
            </div>
          </div>
        )}

        {/* TAB 2: CAR WASH BOOKING */}
        {activeTab === 'wash' && (
          <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-colors">
            {washBooked ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-950 dark:text-white font-display">Car Wash Bay Reserved!</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto font-normal">
                  Your reservation for <strong className="text-slate-950 dark:text-white">{currentWash.name}</strong> on <strong className="text-slate-950 dark:text-white">{washDate} at {washTime}</strong> is active. Drive into Bay 2 at Naze Hub upon arrival.
                </p>
                <div className="font-mono text-sm text-red-600 dark:text-red-400 font-bold">
                  Total Due at Bay: ₦{totalWashPrice.toLocaleString()}
                </div>
                <button
                  type="button"
                  onClick={() => setWashBooked(false)}
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors cursor-pointer mt-4 shadow-md shadow-red-600/20"
                >
                  Modify or Book Another Bay
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Left Side: Options */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="md:col-span-7 space-y-6"
                >
                  <div>
                    <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-3">
                      01. Vehicle Category
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setVehicleType('sedan')}
                        className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer font-bold text-xs ${
                          vehicleType === 'sedan'
                            ? 'bg-blue-900 dark:bg-blue-600 text-white border-2 border-blue-950 dark:border-blue-500 shadow-md'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-300'
                        }`}
                      >
                        Sedan / Saloon
                      </button>
                      <button
                        type="button"
                        onClick={() => setVehicleType('suv')}
                        className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer font-bold text-xs ${
                          vehicleType === 'suv'
                            ? 'bg-blue-900 dark:bg-blue-600 text-white border-2 border-blue-950 dark:border-blue-500 shadow-md'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-300'
                        }`}
                      >
                        SUV / Truck / Pickup
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-3">
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
                                ? 'bg-blue-900 dark:bg-blue-600 text-white border-2 border-blue-950 dark:border-blue-500 shadow-md font-semibold'
                                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className={`font-bold text-sm font-display ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{pkg.name}</span>
                                {pkg.isPopular && (
                                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                                    isSelected ? 'bg-amber-400 text-slate-950' : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200'
                                  }`}>
                                    Popular
                                  </span>
                                )}
                              </div>
                              <p className={`text-xs mt-1 ${isSelected ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400 font-normal'}`}>{pkg.description}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <div className={`font-mono font-bold text-sm ${isSelected ? 'text-amber-300' : 'text-blue-900 dark:text-blue-400'}`}>
                                ₦{price.toLocaleString()}
                              </div>
                              <div className={`text-[11px] font-mono ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>{pkg.durationMin} mins</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-2">
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
                                ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-400 text-blue-950 dark:text-blue-200 font-bold'
                                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                              isChecked ? 'bg-blue-900 text-white font-bold' : 'border-slate-300 dark:border-slate-600'
                            }`}>
                              {isChecked && '✓'}
                            </div>
                            <span className="truncate">{addon.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>

                {/* Right Side: Appointment & Summary */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="md:col-span-5 p-7 rounded-3xl bg-[#091224] text-white border-2 border-blue-900/60 shadow-2xl space-y-5"
                >
                  <div className="font-mono text-[10px] uppercase tracking-widest text-amber-300 font-bold">
                    APPOINTMENT TIME &amp; BAY
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Date</label>
                      <input
                        type="date"
                        value={washDate}
                        onChange={(e) => setWashDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-white/20 text-white outline-none focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Bay Slot</label>
                      <select
                        value={washTime}
                        onChange={(e) => setWashTime(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-white/20 text-white outline-none focus:border-blue-400"
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
                      <span className="text-amber-300 font-extrabold font-mono">₦{totalWashPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setWashBooked(true)}
                    className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all cursor-pointer text-center shadow-lg shadow-red-600/20 hover:scale-102"
                  >
                    Confirm Detailing Bay Slot
                  </button>
                </motion.div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: LOUNGE RESERVATION */}
        {activeTab === 'lounge' && (
          <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-colors">
            {loungeBooked ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-950 dark:text-white font-display">VIP Booth Reserved at Masters Lounge</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto font-normal">
                  Your VIP reservation has been received. Our concierge will contact you to curate your custom bottle selection and arrange valet arrival passes.
                </p>
                <button
                  type="button"
                  onClick={() => setLoungeBooked(false)}
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-blue-900 hover:bg-blue-800 rounded-xl transition-colors cursor-pointer mt-4 shadow-md shadow-blue-900/20"
                >
                  Make Another Reservation
                </button>
              </motion.div>
            ) : (
              <div className="space-y-8">
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-4">
                    Select Lounge Experience Tier
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {LOUNGE_PACKAGES.map((pkg, pIdx) => {
                      const isSelected = selectedLoungePkg === pkg.id;
                      const isBlackTier = pIdx === 1;
                      const slideX = pIdx === 0 ? -40 : pIdx === 2 ? 40 : 0;
                      const slideY = pIdx === 1 ? 30 : 0;

                      return (
                        <motion.div
                          key={pkg.id}
                          initial={{ opacity: 0, x: slideX, y: slideY }}
                          animate={{ opacity: 1, x: 0, y: 0 }}
                          transition={{ duration: 0.5, delay: pIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                          onClick={() => setSelectedLoungePkg(pkg.id)}
                          className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                            isBlackTier
                              ? isSelected
                                ? 'bg-[#091224] text-white border-blue-500 shadow-2xl scale-102 ring-2 ring-blue-500'
                                : 'bg-[#091224] text-white border-blue-900/40 shadow-xl hover:border-blue-600'
                              : isSelected
                                ? 'bg-blue-900 text-white border-blue-950 shadow-2xl scale-102 ring-2 ring-amber-400'
                                : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700 shadow-md hover:border-blue-900'
                          }`}
                        >
                          <div>
                            <div className={`text-xs font-mono font-bold uppercase ${
                              isBlackTier ? 'text-amber-300' : isSelected ? 'text-amber-200' : 'text-blue-900 dark:text-blue-400'
                            }`}>
                              {pkg.category}
                            </div>
                            <h4 className="text-lg font-bold font-display mt-1">
                              {pkg.name}
                            </h4>
                            <div className={`text-xs mt-1 font-mono ${
                              isBlackTier || isSelected ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'
                            }`}>
                              {pkg.capacity}
                            </div>
                            <p className={`text-xs mt-3 leading-relaxed ${
                              isBlackTier || isSelected ? 'text-slate-300 font-normal' : 'text-slate-600 dark:text-slate-300'
                            }`}>
                              {pkg.description}
                            </p>
                          </div>
                          <div className={`mt-6 pt-4 border-t ${
                            isBlackTier || isSelected ? 'border-white/10' : 'border-slate-200 dark:border-slate-700'
                          }`}>
                            <div className={`text-[10px] font-mono uppercase ${
                              isBlackTier || isSelected ? 'text-slate-400' : 'text-slate-500'
                            }`}>
                              Minimum Spend
                            </div>
                            <div className={`text-base font-bold font-mono ${
                              isBlackTier ? 'text-amber-300' : isSelected ? 'text-white' : 'text-blue-900 dark:text-blue-400'
                            }`}>
                              ₦{pkg.minSpend.toLocaleString()}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Reservation Form */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 sm:p-8 rounded-3xl bg-[#091224] text-white border-2 border-blue-900/60 shadow-xl space-y-6"
                >
                  <div className="font-mono text-xs uppercase tracking-wider text-amber-300 font-bold">
                    RESERVATION DETAILS
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Guests</label>
                      <input
                        type="number"
                        min={1}
                        max={20}
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-900 border border-white/20 text-white outline-none focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Date</label>
                      <input
                        type="date"
                        defaultValue="2026-10-30"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-900 border border-white/20 text-white outline-none focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Arrival Time</label>
                      <select
                        defaultValue="21:00"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-900 border border-white/20 text-white outline-none focus:border-blue-400"
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
                    className="w-full py-4 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all cursor-pointer text-center shadow-lg shadow-red-600/25 hover:scale-102"
                  >
                    Request VIP Lounge Concierge Reservation
                  </button>
                </motion.div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
