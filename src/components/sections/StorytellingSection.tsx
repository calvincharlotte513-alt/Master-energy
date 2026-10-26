import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Zap, HeartHandshake, Compass, Award } from 'lucide-react';

export const StorytellingSection: React.FC = () => {
  const chapters = [
    {
      num: '01',
      title: 'Built for Highway Travelers & Owerri Residents',
      desc: 'Naze is the main gateway that links Owerri city center to Aba and Port Harcourt. For years, motorists suffered from bad filling stations with bad fuel and cheated pump meters. Master Energy was built to give drivers a clean, honest, and comfortable place to stop, buy correct fuel, and rest.',
      icon: Compass
    },
    {
      num: '02',
      title: '100% Calibrated Meters — No Cheating',
      desc: 'We know fuel is expensive, so every single drop matters. Our digital pump meters are calibrated every morning with government DPR cans. When the meter reads 10 liters, 10 liters enters your tank. No story.',
      icon: ShieldCheck
    },
    {
      num: '03',
      title: 'More Than Just Fuel — A Full Compound',
      desc: 'Why just buy fuel and rush off? While our wash boys are washing your car with snow foam, you can eat hot firewood jollof rice at Masters Kitchen, hold a business talk upstairs in Masters Lounge, or enjoy cold beer and hot suya at the open-air Garden.',
      icon: Zap
    },
    {
      num: '04',
      title: 'Giving Back & Employing Imo Youth',
      desc: 'We buy our fresh catfish, vegetables, and food ingredients directly from Imo farmers. We also employ and train over 70 local Imo youth in customer service, auto detailing, and food hospitality.',
      icon: HeartHandshake
    }
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-slate-50 dark:bg-[#080d1a] border-t border-slate-200 dark:border-slate-800 relative w-full max-w-full overflow-hidden font-opensans transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start overflow-hidden">
          {/* Left Column: Manifesto */}
          <div className="lg:col-span-5 space-y-5">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-blue-900 dark:text-blue-400 font-bold flex items-center gap-2">
              <Award className="w-4 h-4 text-red-600" />
              <span>THE MASTER ENERGY STORY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight font-display leading-[1.1]">
              Why We Built This Mega Station in Naze, Imo State.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Master Energy Ltd is not your regular roadside pump. It is a family and business stopover built with respect, honest meters, and true Nigerian hospitality.
            </p>

            {/* Promise Card */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="p-6 sm:p-7 rounded-3xl bg-[#091224] text-white border-2 border-blue-900/60 space-y-3 shadow-xl hover:border-blue-700 transition-all"
            >
              <div className="font-mono text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                <span>Our Everyday Promise to You</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-normal italic">
                &quot;No car drives out with cheated fuel; no guest leaves without a smile. Quality petrol, sweet food, cold drinks, clean car wash — all in one safe compound.&quot;
              </p>
              <div className="font-mono text-[11px] text-blue-200 pt-2 border-t border-white/10 font-medium">
                — Management, Master Energy Naze Hub
              </div>
            </motion.div>
          </div>

          {/* Right Column: 4 Chapters */}
          <div className="lg:col-span-7 space-y-4">
            {chapters.map((ch, idx) => {
              const slideX = idx % 2 === 0 ? 28 : -28;

              return (
                <motion.div
                  key={ch.num}
                  initial={{ opacity: 0, x: slideX }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.36, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  style={{ willChange: 'transform, opacity' }}
                  className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-950 dark:text-white shadow-md hover:border-blue-900/60 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-sm font-extrabold px-3 py-1 rounded-lg shrink-0 shadow-xs bg-blue-900 text-white">
                      {ch.num}
                    </span>
                    <div className="space-y-1.5 min-w-0">
                      <h3 className="text-lg font-bold font-display">
                        {ch.title}
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 font-normal">
                        {ch.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
