import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FAQSection({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-16 sm:py-24 relative bg-[#06080d]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow">
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>Foire Aux Questions</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
            Questions Fréquentes
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Retrouvez les réponses aux interrogations les plus courantes sur nos prestations, nos délais et la sécurité de vos consoles.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={faq.id || idx}
                className={`rounded-2xl glass-luxury transition-all duration-300 ${
                  isOpen ? 'bg-white/[0.06] border-white/20' : 'hover:border-white/15'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm sm:text-base text-white transition-colors"
                >
                  <span className="leading-snug">{faq.question}</span>
                  <div className={`p-1.5 rounded-full bg-white/[0.05] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-white/20 text-white' : 'text-slate-400'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-0 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/[0.06] mt-1 animate-fadeIn">
                    <p className="pt-3.5">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
