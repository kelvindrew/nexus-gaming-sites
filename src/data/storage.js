import { 
  INITIAL_CONSOLES, 
  INITIAL_SERVICES, 
  INITIAL_GAMES, 
  INITIAL_PACKS, 
  INITIAL_FAQS, 
  INITIAL_REVIEWS, 
  INITIAL_CONFIG,
  INITIAL_HERO_SLIDES,
  INITIAL_FLASH_DEALS
} from './initialData.js';

const STORAGE_KEYS = {
  GAMES: 'nexus_games_v23',
  SERVICES: 'nexus_services_v23',
  CONSOLES: 'nexus_consoles_v23',
  PACKS: 'nexus_packs_v23',
  CONFIG: 'nexus_config_v23',
  FAVORITES: 'nexus_favorites_v23',
  RECENTLY_VIEWED: 'nexus_recently_viewed_v23',
  MESSAGES: 'nexus_admin_messages_v23',
  HERO_SLIDES: 'nexus_hero_slides_v23',
  FAQS: 'nexus_faqs_v23',
  REVIEWS: 'nexus_reviews_v23',
  FLASH_DEALS: 'nexus_flash_deals_v23',
  CART: 'nexus_cart_v23'
};

// Clear legacy caches if present
try {
  localStorage.removeItem('nexus_config_v18');
  localStorage.removeItem('nexus_config_v19');
  localStorage.removeItem('nexus_config_v20');
  localStorage.removeItem('nexus_games_v18');
  localStorage.removeItem('nexus_games_v19');
  localStorage.removeItem('nexus_games_v20');
} catch (e) {
  console.log('Cache cleanup:', e);
}

export const getStoredGames = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.GAMES);
  return saved ? JSON.parse(saved) : INITIAL_GAMES;
};

export const saveGames = (games) => {
  localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(games));
};

export const getStoredServices = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
  return saved ? JSON.parse(saved) : INITIAL_SERVICES;
};

export const saveServices = (services) => {
  localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
};

export const getStoredConsoles = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.CONSOLES);
  return saved ? JSON.parse(saved) : INITIAL_CONSOLES;
};

export const saveConsoles = (consoles) => {
  localStorage.setItem(STORAGE_KEYS.CONSOLES, JSON.stringify(consoles));
};

export const getStoredPacks = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.PACKS);
  return saved ? JSON.parse(saved) : INITIAL_PACKS;
};

export const savePacks = (packs) => {
  localStorage.setItem(STORAGE_KEYS.PACKS, JSON.stringify(packs));
};

export const getStoredConfig = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
  return saved ? JSON.parse(saved) : INITIAL_CONFIG;
};

export const saveConfig = (config) => {
  localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
};

export const getFavorites = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
  return saved ? JSON.parse(saved) : [];
};

export const toggleFavoriteStorage = (gameId) => {
  const current = getFavorites();
  const index = current.indexOf(gameId);
  let updated;
  if (index > -1) {
    updated = current.filter(id => id !== gameId);
  } else {
    updated = [...current, gameId];
  }
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
  return updated;
};

export const getRecentlyViewed = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED);
  return saved ? JSON.parse(saved) : [];
};

export const addRecentlyViewedStorage = (gameId) => {
  const current = getRecentlyViewed();
  const filtered = current.filter(id => id !== gameId);
  const updated = [gameId, ...filtered].slice(0, 10);
  localStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(updated));
  return updated;
};

export const getStoredMessages = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
  return saved ? JSON.parse(saved) : [];
};

export const addStoredMessage = (msg) => {
  const current = getStoredMessages();
  const updated = [{ ...msg, id: `msg-${Date.now()}`, date: new Date().toISOString() }, ...current];
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
  return updated;
};

export const getStoredHeroSlides = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.HERO_SLIDES);
  return saved ? JSON.parse(saved) : INITIAL_HERO_SLIDES;
};

export const saveHeroSlides = (slides) => {
  localStorage.setItem(STORAGE_KEYS.HERO_SLIDES, JSON.stringify(slides));
};

export const getStoredFaqs = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.FAQS);
  return saved ? JSON.parse(saved) : INITIAL_FAQS;
};

export const saveFaqs = (faqs) => {
  localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
};

export const getStoredReviews = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
  return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
};

export const saveReviews = (reviews) => {
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
};

export const getStoredFlashDeals = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.FLASH_DEALS);
  return saved ? JSON.parse(saved) : INITIAL_FLASH_DEALS;
};

export const saveFlashDeals = (deals) => {
  localStorage.setItem(STORAGE_KEYS.FLASH_DEALS, JSON.stringify(deals));
};

export const getStoredCart = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.CART);
  return saved ? JSON.parse(saved) : [];
};

export const saveCart = (cart) => {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
};
