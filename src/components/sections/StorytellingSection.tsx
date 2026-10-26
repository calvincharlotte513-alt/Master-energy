import React from 'react';
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
    <section className="py-14 sm:py-20 lg:py-24 bg-[#04060a] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Manifesto */}
          <div className="lg:col-span-5 space-y-5">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>THE MASTER ENERGY STORY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display leading-[1.1]">
              Why We Built This Mega Station in Naze, Imo State.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Master Energy Ltd is not your regular roadside pump. It is a family and business stopover built with respect, honest meters, and true Nigerian hospitality.
            </p>

            <div className="p-6 sm:p-7 rounded-3xl bg-[#090d16] border border-white/10 space-y-3 shadow-xl">
              <div className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider">
                Our Everyday Promise to You
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-normal">
                &quot;No car drives out with cheated fuel; no guest leaves without a smile. Quality petrol, sweet food, cold drinks, clean car wash — all in one safe compound.&quot;
              </p>
              <div className="font-mono text-[11px] text-slate-400 pt-2 border-t border-white/10">
                — Management, Master Energy Naze Hub
              </div>
            </div>
          </div>

          {/* Right Column: 4 Chapters */}
          <div className="lg:col-span-7 space-y-4">
            {chapters.map((ch) => {
              return (
                <div
                  key={ch.num}
                  className="p-6 sm:p-7 rounded-3xl bg-[#090d16] border border-white/10 hover:border-amber-400/30 transition-all shadow-xl"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-sm font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-lg border border-amber-400/20 shrink-0">
                      {ch.num}
                    </span>
                    <div className="space-y-1.5 min-w-0">
                      <h3 className="text-lg font-bold text-white font-display">
                        {ch.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                        {ch.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
