import React, { useState } from 'react';
import { motion } from 'motion/react';
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
    <section id="calculator" className="py-16 lg:py-24 bg-slate-50 border-t border-slate-200 relative w-full max-w-full overflow-hidden font-opensans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-orange-600 mb-3 font-bold">
            THE DIGITAL CONCIERGE &amp; PRICING TERMINAL
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-display">
            Live Pricing &amp; Reservations
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-normal">
            Instant volumetric fuel calculators, auto-detailing bay bookings, and VIP lounge concierge tables.
          </p>

          {/* Luxury Tab Selector */}
          <div className="mt-10 inline-flex p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab('fuel')}
              className={`flex items-center gap-2.5 px-6 py-3 text-xs font-mono uppercase tracking-wider font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'fuel' 
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' 
                  : 'text-slate-600 hover:text-slate-950'
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
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' 
                  : 'text-slate-600 hover:text-slate-950'
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
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' 
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              <Wine className="w-4 h-4 text-current" />
              <span>VIP Lounge</span>
            </button>
          </div>
        </div>

        {/* TAB 1: FUEL & GAS CALCULATOR */}
        {activeTab === 'fuel' && (
          <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Selector: Sliding from Left */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="md:col-span-7 space-y-6"
              >
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-slate-500 font-bold mb-3">
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
                            ? 'bg-orange-500 text-white border-2 border-orange-600 shadow-md font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-bold text-sm font-display">{prod.shortCode}</div>
                        <div className={`text-xs font-mono font-bold mt-1 ${
                          selectedProduct === prod.id ? 'text-white' : 'text-orange-600'
                        }`}>
                          ₦{prod.pricePerUnit.toLocaleString()} / {prod.unit}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculation Mode */}
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-slate-500 font-bold">Mode:</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCalcMode('volume')}
                      className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer font-bold ${
                        calcMode === 'volume'
                          ? 'bg-orange-500 text-white border-orange-600 shadow-xs'
                          : 'bg-slate-100 text-slate-600 border-slate-200 hover:text-slate-950'
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
                          ? 'bg-orange-500 text-white border-orange-600 shadow-xs'
                          : 'bg-slate-100 text-slate-600 border-slate-200 hover:text-slate-950'
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
                      <span className="text-slate-600 font-medium">Volumetric Amount:</span>
                      <span className="font-extrabold text-orange-600 text-lg">
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
                      className="w-full accent-orange-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="text-xs font-mono text-slate-600 block mb-2 font-medium">Budget Target (₦):</label>
                    <input
                      type="number"
                      step={1000}
                      min={1000}
                      value={budgetNaira}
                      onChange={(e) => setBudgetNaira(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-950 font-mono text-base focus:border-orange-500 outline-none shadow-sm"
                    />
                  </div>
                )}
              </motion.div>

              {/* Terminal Result Card: Premium Black Box sliding in from Right */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="md:col-span-5 p-7 rounded-3xl bg-slate-950 text-white border-2 border-orange-500/40 shadow-2xl flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-orange-400 font-bold">
                    ESTIMATED SETTLEMENT
                  </div>
                  <div className="mt-2 text-4xl font-extrabold text-white font-display tabular-nums tracking-tight">
                    ₦{totalFuelCost.toLocaleString()}
                  </div>
                  <div className="mt-2 font-mono text-xs font-bold text-orange-400">
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
                    <Check className="w-4 h-4 text-orange-400 shrink-0" />
                    <span>POS, Bank Transfer &amp; USSD Accepted</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => alert(`Forecourt ticket generated for ${calculatedVolume} ${currentProduct.unit}s of ${currentProduct.name} at ₦${totalFuelCost.toLocaleString()}. Head to Master Energy Naze Forecourt for priority dispensing!`)}
                  className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-orange-500 hover:bg-orange-600 rounded-xl transition-all cursor-pointer text-center shadow-lg shadow-orange-500/20 hover:scale-102"
                >
                  Generate Pump Priority Pass
                </button>
              </motion.div>
            </div>
          </div>
        )}

        {/* TAB 2: CAR WASH BOOKING */}
        {activeTab === 'wash' && (
          <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
            {washBooked ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-950 font-display">Car Wash Bay Reserved!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto font-normal">
                  Your reservation for <strong className="text-slate-950">{currentWash.name}</strong> on <strong className="text-slate-950">{washDate} at {washTime}</strong> is active. Drive into Bay 2 at Naze Hub upon arrival.
                </p>
                <div className="font-mono text-sm text-orange-600 font-bold">
                  Total Due at Bay: ₦{totalWashPrice.toLocaleString()}
                </div>
                <button
                  type="button"
                  onClick={() => setWashBooked(false)}
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-orange-500 hover:bg-orange-600 rounded-xl transition-colors cursor-pointer mt-4 shadow-md"
                >
                  Modify or Book Another Bay
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Left Side: Vehicle & Detailing Options sliding from left */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="md:col-span-7 space-y-6"
                >
                  <div>
                    <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-600 block mb-3">
                      01. Vehicle Category
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setVehicleType('sedan')}
                        className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer font-bold text-xs ${
                          vehicleType === 'sedan'
                            ? 'bg-orange-500 text-white border-2 border-orange-600 shadow-md'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        Sedan / Saloon
                      </button>
                      <button
                        type="button"
                        onClick={() => setVehicleType('suv')}
                        className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer font-bold text-xs ${
                          vehicleType === 'suv'
                            ? 'bg-orange-500 text-white border-2 border-orange-600 shadow-md'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        SUV / Truck / Pickup
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-600 block mb-3">
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
                                ? 'bg-orange-500 text-white border-2 border-orange-600 shadow-md font-semibold'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className={`font-bold text-sm font-display ${isSelected ? 'text-white' : 'text-slate-900'}`}>{pkg.name}</span>
                                {pkg.isPopular && (
                                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                                    isSelected ? 'bg-slate-950 text-orange-400' : 'bg-orange-100 text-orange-800'
                                  }`}>
                                    Popular
                                  </span>
                                )}
                              </div>
                              <p className={`text-xs mt-1 ${isSelected ? 'text-orange-50 font-medium' : 'text-slate-500 font-normal'}`}>{pkg.description}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <div className={`font-mono font-bold text-sm ${isSelected ? 'text-white' : 'text-orange-600'}`}>
                                ₦{price.toLocaleString()}
                              </div>
                              <div className={`text-[11px] font-mono ${isSelected ? 'text-orange-100' : 'text-slate-400'}`}>{pkg.durationMin} mins</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
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
                                ? 'bg-orange-50 border-orange-400 text-slate-950 font-bold'
                                : 'bg-slate-50 border-slate-200 text-slate-600'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                              isChecked ? 'bg-orange-500 border-orange-500 text-white font-bold' : 'border-slate-300'
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

                {/* Right Side: Black Box Appointment & Summary sliding from right */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="md:col-span-5 p-7 rounded-3xl bg-slate-950 text-white border-2 border-orange-500/40 shadow-2xl space-y-5"
                >
                  <div className="font-mono text-[10px] uppercase tracking-widest text-orange-400 font-bold">
                    APPOINTMENT TIME &amp; BAY
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Date</label>
                      <input
                        type="date"
                        value={washDate}
                        onChange={(e) => setWashDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-white/20 text-white outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Bay Slot</label>
                      <select
                        value={washTime}
                        onChange={(e) => setWashTime(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-white/20 text-white outline-none focus:border-orange-500"
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
                      <span className="text-orange-400 font-extrabold font-mono">₦{totalWashPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setWashBooked(true)}
                    className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-orange-500 hover:bg-orange-600 rounded-xl transition-all cursor-pointer text-center shadow-lg shadow-orange-500/20 hover:scale-102"
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
          <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
            {loungeBooked ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-950 font-display">VIP Booth Reserved at Masters Lounge</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto font-normal">
                  Your VIP reservation has been received. Our concierge will contact you to curate your custom bottle selection and arrange valet arrival passes.
                </p>
                <button
                  type="button"
                  onClick={() => setLoungeBooked(false)}
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-orange-500 hover:bg-orange-600 rounded-xl transition-colors cursor-pointer mt-4 shadow-md"
                >
                  Make Another Reservation
                </button>
              </motion.div>
            ) : (
              <div className="space-y-8">
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-slate-500 font-bold mb-4">
                    Select Lounge Experience Tier
                  </div>
                  {/* Alternating Orange and Black boxes for Lounge Tiers with slide-in animation */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {LOUNGE_PACKAGES.map((pkg, pIdx) => {
                      const isSelected = selectedLoungePkg === pkg.id;
                      // Middle box is Black Box, outer boxes are Orange Boxes
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
                                ? 'bg-slate-950 text-white border-orange-500 shadow-2xl scale-102 ring-2 ring-orange-500'
                                : 'bg-slate-950 text-white border-orange-500/40 shadow-xl hover:border-orange-500'
                              : isSelected
                                ? 'bg-orange-500 text-white border-orange-600 shadow-2xl scale-102 ring-2 ring-white'
                                : 'bg-orange-500 text-white border-orange-600 shadow-lg hover:border-slate-950'
                          }`}
                        >
                          <div>
                            <div className={`text-xs font-mono font-bold uppercase ${
                              isBlackTier ? 'text-orange-400' : 'text-orange-100'
                            }`}>
                              {pkg.category}
                            </div>
                            <h4 className="text-lg font-bold font-display mt-1 text-white">
                              {pkg.name}
                            </h4>
                            <div className={`text-xs mt-1 font-mono ${
                              isBlackTier ? 'text-slate-300' : 'text-orange-100 font-semibold'
                            }`}>
                              {pkg.capacity}
                            </div>
                            <p className={`text-xs mt-3 leading-relaxed ${
                              isBlackTier ? 'text-slate-300 font-normal' : 'text-white/95 font-medium'
                            }`}>
                              {pkg.description}
                            </p>
                          </div>
                          <div className={`mt-6 pt-4 border-t ${
                            isBlackTier ? 'border-white/10' : 'border-white/20'
                          }`}>
                            <div className={`text-[10px] font-mono uppercase ${
                              isBlackTier ? 'text-slate-400' : 'text-orange-100 font-bold'
                            }`}>
                              Minimum Spend
                            </div>
                            <div className={`text-base font-bold font-mono ${
                              isBlackTier ? 'text-orange-400' : 'text-white'
                            }`}>
                              ₦{pkg.minSpend.toLocaleString()}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Reservation Form: Black Box sliding in from bottom */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 sm:p-8 rounded-3xl bg-slate-950 text-white border-2 border-orange-500/40 shadow-xl space-y-6"
                >
                  <div className="font-mono text-xs uppercase tracking-wider text-orange-400 font-bold">
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
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-900 border border-white/20 text-white outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Date</label>
                      <input
                        type="date"
                        defaultValue="2026-10-30"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-900 border border-white/20 text-white outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Arrival Time</label>
                      <select
                        defaultValue="21:00"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-900 border border-white/20 text-white outline-none focus:border-orange-500"
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
                    className="w-full py-4 text-xs font-bold uppercase tracking-wider text-white bg-orange-500 hover:bg-orange-600 rounded-xl transition-all cursor-pointer text-center shadow-lg shadow-orange-500/20 hover:scale-102"
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

