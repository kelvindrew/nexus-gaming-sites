import React, { useState } from 'react';
import { Star, MessageSquareQuote, CheckCircle2, Plus, X, Send } from 'lucide-react';

export default function ReviewsSection({ reviews, onAddReview }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    console: 'PlayStation 4 / PC',
    rating: 5,
    comment: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.comment) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      name: formData.name,
      console: formData.console,
      rating: parseInt(formData.rating, 10),
      comment: formData.comment,
      date: "Aujourd'hui"
    };

    if (onAddReview) {
      onAddReview(newRev);
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsModalOpen(false);
      setFormData({ name: '', console: 'PlayStation 4 / PC', rating: 5, comment: '' });
    }, 2000);
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 relative bg-[#06080d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow">
            <MessageSquareQuote className="w-3.5 h-3.5 text-amber-400" />
            <span>Retours d'Expérience & Témoignages</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
            Avis Clients Vérifiés
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mb-6 max-w-xl mx-auto">
            Découvrez les témoignages de nos gamers satisfaits par la qualité de nos interventions en atelier.
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full btn-secondary-glass font-bold text-xs sm:text-sm transition-all shadow-lg active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Donner votre avis</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="rounded-3xl glass-card-matte p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5">
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-3.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-300 text-xs sm:text-sm italic mb-5 leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3.5 border-t border-white/[0.08] flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-white">{rev.name}</h4>
                  <span className="text-[10px] sm:text-[11px] text-slate-400">{rev.console}</span>
                </div>
                <span className="text-[10px] text-slate-500">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#090d16] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full bg-white/[0.05]"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Merci pour votre avis !</h3>
                <p className="text-xs text-slate-400">Votre témoignage a été publié avec succès.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-heading font-bold text-lg text-white mb-4">Laisser un avis client</h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Votre Nom / Pseudo *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Eric K."
                    className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Matériel / Prestation *</label>
                  <input
                    type="text"
                    required
                    value={formData.console}
                    onChange={(e) => setFormData({ ...formData, console: e.target.value })}
                    placeholder="Ex: PS4 Pro (Pack 8 Jeux)"
                    className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Note de satisfaction</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= formData.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Votre commentaire *</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    placeholder="Partagez votre expérience sur la rapidité, la qualité des jeux et l'accueil..."
                    className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs outline-none focus:border-white/30"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl btn-ps-primary text-xs font-bold shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Publier mon avis</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
